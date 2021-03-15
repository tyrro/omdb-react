# OMDB React
rajibds.github.io/omdb-react

This project makes use of the OMDB API's(http://www.omdbapi.com/) in the backend, and consumes the API with a React frontend with Authentication, Search, Favorite movies lists and more!

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
  pipenv --python 3.9
  pipenv shell
  cp .env.example .env
  # now create a database in your machine and edit the .env file to include it
  # DATABASE_URL = "postgresql://user:postgres@127.0.0.1:5432/db_name"                       // edit this line
  ```

- Foreman installation

  ```bash
  gem install foreman
  ```

- Server Start

  ```bash
  foreman s
  ```
