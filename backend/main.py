import databases, sqlalchemy, uuid
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from database import SessionLocal, engine
import models
import omdb_api_consumer as oac

models.Base.metadata.create_all(bind=engine)

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "8f4e2bbec617c5288ce18aba5fcbba81fade2d707f20a2364ee0578a8d7c9359"
ALGORITHM = "HS256"

class Token(BaseModel):
    access_token: str
    token_type  : str
    name        : str


class TokenData(BaseModel):
    email: Optional[str] = None


class User(BaseModel):
    name      : str
    email     : str
    created_at: str

class UserInDB(User):
    hashed_password: str

class UserFavoriteMovie(BaseModel):
    item_id: str

class UserEntry(BaseModel):
    name    : Optional[str] = Field(..., example='test_name')
    email   : str = Field(..., example='test@test.com')
    password: str = Field(..., example='1234')


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI(title = 'OMDB Movie Search')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def authenticate_user(db, username: str, password: str):
    user = get_user_by_email(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=1440)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

def create_user(db: Session, user: None):
    db_user = models.User(
        id              = str(uuid.uuid1()),
        name            = user.name,
        email           = user.email,
        hashed_password = pwd_context.encrypt(user.password),
        created_at      = str(datetime.now())
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_favorite_item(item_id: None, owner: None):
    attributes = oac.search_by_imdb_id(item_id, sanitize = True)
    db_favorite_item = models.FavoriteMovie(
        id=str(uuid.uuid1()),
        imdb_id=item_id,
        attributes=attributes,
        owner_id=owner.id
    )
    db = SessionLocal()
    db.add(db_favorite_item)
    db.commit()
    db.refresh(db_favorite_item)
    db.close()
    return db_favorite_item

@app.post("/users")
async def register_user(user: UserEntry, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email = user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    created_user = create_user(db = db, user = user)
    return {
        'name': created_user.name,
        'email': created_user.email
    }

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "token_type": "bearer", "name": user.name}


@app.get("/users/current_user", response_model=User)
async def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user.__dict__

@app.get("/movies/all")
async def generate_index_items(s: str, y: Optional[str] = '', current_user: User = Depends(get_current_user)):
    query  = '&s=' + s + '&y=' + y
    result = oac.sanitized_response(query, current_user)
    return { 'Search': result }

@app.get("/movies/search")
async def search_single_movie(i: str, current_user: User = Depends(get_current_user)):
    result = oac.search_by_imdb_id(i, sanitize = False)
    return result

@app.post("/user/favorite_movies")
async def add_favorite_item(favorite_movies: UserFavoriteMovie, current_user: User = Depends(get_current_user)):
    fav_item = create_favorite_item(item_id = favorite_movies.item_id, owner = current_user)
    return { 'fav_item_id': fav_item.imdb_id }

@app.get("/user/favorite_movies")
async def all_favorite_items(current_user: User = Depends(get_current_user)):
    fav_movies = current_user.favorite_movies.copy()
    for i in range(len(fav_movies)):
        fav_movies[i] = fav_movies[i].attributes

    return { 'Search': fav_movies }
