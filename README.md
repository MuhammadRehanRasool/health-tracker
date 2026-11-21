# Health Tracker

A full-stack fitness tracker. Users organise exercises into muscle groups, build workouts from them, plan the week on a calendar, time their sessions with a stopwatch and keep a BMI history. It has a Django REST Framework API with JWT auth and a React single-page client.

## Features

- **Accounts**: register and log in with JWT access and refresh tokens. The client refreshes tokens automatically.
- **Muscle groups**: create, rename and delete your own muscle groups (for example shoulders, legs or arms).
- **Exercises**: manage exercises and optionally link each one to a muscle group.
- **Workouts**: put a named workout together from a list of exercises, optionally tagged with a muscle group, and edit it later.
- **Schedule**: assign a workout to a day. Each day can only be booked once. The month view uses FullCalendar.
- **Stopwatch**: start, pause and reset a timer, save the session length and see past sessions in minutes.
- **BMI**: enter height (cm) and weight (kg). The server works out the BMI and a status (Underweight, Healthy, Overweight or Obesity) and keeps a history.
- Names must be unique per user for muscle groups, exercises and workouts.

## Tech stack

- **Backend**: Python, Django 4, Django REST Framework, Simple JWT, django-cors-headers, MySQL
- **Frontend**: React 18 (Create React App), React Router 6, Axios, FullCalendar 5, Bootstrap 5 (CDN), React Icons

## API overview

Every route starts with `/api/`. Apart from registration and token routes, each request needs an `Authorization: JWT <access_token>` header.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `users` | Register a user |
| POST | `token/obtain` | Log in. Returns access and refresh tokens plus the user profile |
| POST | `token/refresh` | Refresh the access token |
| GET, POST | `muscle_group` | List all muscle groups or create one |
| GET / PUT, DELETE | `muscle_group/<id>` | GET lists a user's groups (`<id>` = user id). PUT and DELETE act on a group |
| GET, POST | `exercise` | List or create exercises |
| GET / PUT, DELETE | `exercise/<id>` | Same pattern as muscle groups |
| GET, POST | `workout` | List or create workouts |
| GET / PUT, DELETE | `workout/<id>` | Same pattern as muscle groups |
| GET, POST | `schedule` | List or create schedule entries |
| GET / PUT, DELETE | `schedule/<id>` | Same pattern as muscle groups |
| GET, POST | `stopwatch` | List or save stopwatch sessions |
| GET | `stopwatch/<user_id>` | A user's sessions |
| GET, POST | `bmi` | List BMI records or add one (BMI and status are calculated by the server) |
| GET | `bmi/<user_id>` | A user's BMI history |

## Project structure

```
api/            Django app: models, serializers, views, urls, migrations
project/        Django project settings and root URLs
manage.py
requirements.txt
client/         React app
  src/views/    Pages (Login, Register, Home, MuscleGroup, Exercise, Workout,
                Schedule, ViewSchedule, StopWatch, BMI)
  src/components/  Layout, Navbar, Card, UserData
  src/axiosApi.js  Axios instance with JWT refresh handling
  src/CONSTANT.js  API/client URLs and shared helpers
```

## Setup

### Backend

You need Python 3.10+ and a running MySQL server.

```bash
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Set the environment variables listed in `.env.example` (export them in your shell, since `.env` is not loaded automatically):

| Variable | Purpose |
| --- | --- |
| `DJANGO_SECRET_KEY` | Django secret key (required) |
| `DJANGO_DEBUG` | `True` to turn on debug mode (default `False`) |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated hosts (default `localhost,127.0.0.1`) |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins (default `http://localhost:3000`) |
| `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` | MySQL connection |

```bash
python manage.py migrate
python manage.py runserver        # http://127.0.0.1:8000
```

### Frontend

```bash
cd client
cp .env.example .env              # optional, the defaults point at localhost
npm install
npm start                         # http://localhost:3000
```

| Variable | Purpose |
| --- | --- |
| `REACT_APP_API_URL` | Base URL of the API (default `http://127.0.0.1:8000/api/`) |
| `REACT_APP_CLIENT_URL` | Public URL of the client (default `http://localhost:3000/`) |

## Scripts

| Command | Description |
| --- | --- |
| `python manage.py runserver` | Start the API dev server |
| `python manage.py migrate` | Apply database migrations |
| `npm start` (in `client/`) | Start the React dev server |
| `npm run build` (in `client/`) | Build the client for production into `client/build` |
| `npm test` (in `client/`) | Run the CRA test runner |
