# 🤠 Far West Social Network

A social network inspired by the American Wild West.

User can:
- create an account, login;
- create, read, comment Posts;
- send, accept, reject follow requests from other users;
- update profile info and password


## Features

- 👤 User authentication (JWT + Refresh Token)
- 📱 Responsive design
- 💬 Comments
- ⭐ Likes
- 🤝 Follow requests
- 📜 Wanted-style interface
- 📝 Rich text editor (Quill)


## Technologies

### Frontend

- React
- React Router
- CSS Modules
- Quill
- Fetch API

### Backend

- Node.js
- Express
- Validations with express-validator
- Prisma
- JWT Authentication
- Refresh Token (HttpOnly Cookies)

### Database

- PostgreSQL


## Installation

### Clone the repository

### Install frontend

```bash
cd Front-end
npm install
npm run dev
```

### Install backend

```bash
cd Back-end
npm install
npm run start
```

---

## Environment Variables

Backend:

```env
DATABASE_URL=
JWT_SECRET_ACCESS=
JWT_EXPIRESIN_ACCESS=1h
JWT_SECRET_REFRESH=
JWT_EXPIRESIN_REFRESH=1d
EMAIL_GUEST=
PASSWORD_GUEST="
```
*****Make sure that guest account is present in the database

Frontend:

```env
VITE_API_URL=
```
## Improvements

- Let the user to select another profile image
