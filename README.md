# OMDB React

This project uses the OMDB API in the backend, and consumes the API with a React frontend with Authorization,
Search, Favorite lists and more!

**Backend**

- Clone the repository
  ```bash
  git@github.com:rajibds/omdb-react.git
  ```
- Homebrew:
  ```bash
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```
- python3:

  ```bash
  brew install python@3.9
  ```

- PostgreSQL

  ```bash
  brew install postgresql

  # To have launchd start postgresql at login:
  brew services start postgresql
  ```

- nvm

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

  # install node(>10.13.0)
  nvm install 12
  nvm use 12
  ```

- Dependency installation

  ```bash
  cd backend
  pip3 install pipenv
  pip3 install -r requirements.txt
  pipenv shell
  # now edit the database.py:5 to include your DB user name and create a new database named `omdb_rest_api` in your machine
  # edited database.py:5 will be:
  # SQLALCHEMY_DATABASE_URL = "postgresql://MacUser:postgres@127.0.0.1:5432/omdb_rest_api" // edit this line
  ```

- Server Start

  ```bash
  uvicorn main:app --reload
  ```

  ****Frontend****

  ```bash
    cd frontend
    yarn
    yarn start
  ```
