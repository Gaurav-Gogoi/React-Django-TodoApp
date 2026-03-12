# 📝 Notes App (Django + React)

A full-stack Notes application built with **Django REST Framework** for the backend and **React (Vite)** for the frontend.
Users can register, login with JWT authentication, and create or delete personal notes.

---

## 🚀 Features

* User Registration
* JWT Authentication (Login / Logout)
* Create Notes
* View Notes
* Delete Notes
* Protected Routes
* REST API using Django REST Framework
* Axios API integration in React

---

## 🛠 Tech Stack

### Backend

* Python
* Django
* Django REST Framework
* SimpleJWT (authentication)
* SQLite

### Frontend

* React
* Vite
* Axios
* React Router

---

## 📂 Project Structure

```
project/
│
├── backend/
│   ├── api/
│   ├── backend/
│   ├── manage.py
│   └── db.sqlite3
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup (Django)

1. Navigate to backend folder

```
cd backend
```

2. Create virtual environment

```
python -m venv env
```

3. Activate environment

Windows

```
env\Scripts\activate
```

Mac/Linux

```
source env/bin/activate
```

4. Install dependencies

```
pip install -r requirements.txt
```

5. Run migrations

```
python manage.py migrate
```

6. Start Django server

```
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## ⚙️ Frontend Setup (React)

1. Navigate to frontend folder

```
cd frontend
```

2. Install dependencies

```
npm install
```

3. Start development server

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔑 Authentication Flow

1. User registers
2. User logs in
3. Backend returns **access + refresh tokens**
4. Access token is stored in **localStorage**
5. Axios automatically attaches token to API requests

---

## 📡 API Endpoints

### Authentication

```
POST /api/token/
POST /api/token/refresh/
```

### Users

```
POST /api/user/register/
```

### Notes

```
GET /api/notes/
POST /api/notes/
DELETE /api/notes/<id>/
```

---

## 🔒 Protected Routes

The frontend uses a **ProtectedRoute component** to restrict access to authenticated users.

If a user is not logged in they are redirected to `/login`.

---

## 📸 Future Improvements

* Edit notes
* Search notes
* Better UI styling
* Pagination


---


