# Assignment Workflow Portal – Frontend

Frontend for the Assignment Workflow Portal built using React.js + Vite.

This application provides role-based dashboards for Teachers and Students, where teachers manage assignments and students submit answers.

# Setup Instructions

Follow these steps to run the frontend locally.

---

# 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/assignment-portal-frontend.git
cd assignment-portal-frontend
```

---

# 2. Initialize Git (If starting from scratch)

If you are creating the project manually instead of cloning:

```bash
git init
git add .
git commit -m "Initial commit"
```

---

# 3. Install Dependencies

```bash
npm install
```

---

# 4. Install React Router and Axios

```bash
npm install react-router-dom axios
```

---

# 5. Install TailwindCSS

Install TailwindCSS and required dependencies.

```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize Tailwind configuration.

```bash
npx tailwindcss init -p
```

---

# 6. Configure Tailwind

Update **tailwind.config.js**

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {},
},
plugins: [],
```

---

# 7. Add Tailwind to CSS

Inside **src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# 8. Start the Development Server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```


# Backend Requirement

The frontend connects to the backend server running at:

```
http://localhost:5001
```

Make sure the **backend server is running before starting the frontend**.

---

# Project Structure

```
frontend
│
├── node_modules
├── public
│
├── src
│   │
│   ├── components
│   │
│   ├── context
│   │   └── AuthContext.jsx
│   │
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── TeacherDashboard.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── Submissions.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```


# Tech Stack

The frontend is built using:

* **React.js**
* **Vite**
* **TailwindCSS**
* **Axios**
* **React Router DOM**

---

# Features

## Authentication

* Single login page for **Teachers and Students**
* **JWT based authentication**
* **Role-based redirection**

After login:

```
Teacher → Teacher Dashboard
Student → Student Dashboard
```

---

# Teacher Dashboard

Teachers can manage the **entire assignment lifecycle**.

### Features

* Create assignments
* Edit draft assignments
* Delete draft assignments
* Publish assignments
* Mark assignments as completed
* View student submissions
* Filter assignments by status
* View total submissions per assignment

### Assignment Workflow

```
Draft → Published → Completed
```

### Rules

**Draft assignments**

* Can be edited
* Can be deleted

**Published assignments**

* Visible to students
* Students can submit answers

**Completed assignments**

* Locked from further edits
* No new submissions allowed

---

# Student Dashboard

Students can interact with assignments created by teachers.

### Features

* View available assignments
* Submit answers
* View submitted assignments
* View submission history
* Submission history sorted by **submission date**

### Submission Rules

* Students **cannot submit multiple times**
* Students **cannot submit after due date**
* **Submit button disappears after submission**
* Students can view **their submission details**

---

# Dependencies

Main dependencies used:

```
react
react-dom
react-router-dom
axios
tailwindcss
vite
```

---

# API Integration

The frontend communicates with backend **REST APIs** for:

* Authentication
* Assignment Management
* Submission Handling

### Example API Endpoints

```
POST /api/auth/login
GET /api/assignments
POST /api/assignments
PUT /api/assignments/:id/publish
PUT /api/assignments/:id/complete
POST /api/submissions
GET /api/submissions/my
```

---

# Author

**Anurag Tomar**
