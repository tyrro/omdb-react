from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id              = Column(String, primary_key=True, index=True)
    name            = Column(String)
    email           = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at      = Column(String)

    favorite_movies = relationship("FavoriteMovie", back_populates="owner")

class FavoriteMovie(Base):
    __tablename__ = "favorite_movies"

    id = Column(String, primary_key=True, index=True)
    imdb_id = Column(String)
    attributes = Column(JSON)
    owner_id = Column(String, ForeignKey("users.id"))

    owner = relationship("User", back_populates="favorite_movies")
