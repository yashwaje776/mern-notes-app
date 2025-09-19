# MERN Notes App 📝

A modern **Notes Application** built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring **role-based authentication**, **user and admin dashboards**, and **CRUD operations** for notes.  

---

## Features

- **User Authentication**
  - Register / Login
  - Role-based access (User/Admin)
- **Dashboard**
  - Users can add, edit, delete, and view their notes
- **Admin Panel**
  - Admins can view all users
  - Admins can manage all notes
- **Responsive UI**
  - Works seamlessly on desktop, tablet, and mobile
- **Modern Design**
  - TailwindCSS-based UI with clean, intuitive layouts

---

## Tech Stack

- **Frontend:** React, React Router, TailwindCSS, React Icons  
- **Backend:** Node.js, Express.js, JWT Authentication  
- **Database:** MongoDB  
- **API Calls:** Axios  

---

## Live Demo

- **Frontend:** [https://mern-notes-app-frontend-j6xi.onrender.com/](https://mern-notes-app-frontend-j6xi.onrender.com/)  
- **Backend API:** [https://mern-notes-app-backend1.onrender.com](https://mern-notes-app-backend1.onrender.com)  

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yashwaje776/mern-notes-app.git
cd mern-notes-app

Backend Setup

cd backend
npm install
Create a .env file with the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Start the backend server:

npm start


Frontend Setup

cd ../frontend
npm install


Create a .env file with the following variable:

VITE_API_URL=http://localhost:5000


Start the frontend development server:

npm run dev
