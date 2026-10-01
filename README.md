# StudyFlow Planner
### Student Study Planning & Task Management System
Silver Oak University — BCA (Honours) — Full Stack Development-I (3040233448)

A full stack MERN application (MongoDB, Express, React, Node.js) that helps students manage
subjects, plan study sessions, track tasks, and monitor overall study progress.

---

## 1. Project Structure

```
StudyFlow-Planner/
│
├── client/                     React + Vite frontend
│   ├── src/
│   │   ├── components/         Reusable UI components
│   │   ├── pages/               Route-level pages
│   │   ├── context/             Global state (AppContext)
│   │   ├── utils/                Axios API instance
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── server/                     Express + MongoDB backend
│   ├── config/db.js             MongoDB connection
│   ├── models/                  Mongoose schemas (Subject, Task, StudyPlan)
│   ├── controllers/             Route logic / CRUD operations
│   ├── routes/                  Express routers
│   ├── middleware/              404 + error handler
│   ├── server.js                Entry point
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## 2. Technology Stack

- **Frontend:** React.js, Vite, React Router DOM, Axios, plain CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose

---

## 3. Database Setup (MongoDB Atlas — recommended)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a **free Shared (M0) cluster**.
3. Under **Database Access**, create a database user with a username and password.
4. Under **Network Access**, add IP address `0.0.0.0/0` (allow access from anywhere) — fine for
   a student/local project.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Add a database name before the `?`, e.g. `.../studyflow?retryWrites=true...`

**Alternative — Local MongoDB:** install MongoDB Community Server, run `mongod`, and use
`MONGODB_URI=mongodb://127.0.0.1:27017/studyflow`.

### .env file (backend)

Create a file named `.env` inside the **`server/`** folder:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/studyflow?retryWrites=true&w=majority
PORT=5000
```

⚠️ Never commit your real `.env` file or share your password. `.gitignore` already excludes it.

### .env file (frontend, optional)

Create a file named `.env` inside the **`client/`** folder:

```
VITE_API_URL=http://localhost:5000/api
```

(This is optional — the app defaults to `http://localhost:5000/api` if not set.)

---

## 4. Exact Running Steps

### Step 1: Open the project folder
Extract/open the `StudyFlow-Planner` folder in VS Code (or any editor).

### Step 2: Open TWO terminals
One terminal will run the **backend**, another will run the **frontend**.

### Step 3 (Terminal 1 — Backend): Install dependencies
```
cd StudyFlow-Planner/server
npm install
```

### Step 4: Configure .env
Create `server/.env` as shown in Section 3 above.

### Step 5 (Terminal 1): Start the backend
```
npm run dev
```
You should see:
```
MongoDB connected successfully
StudyFlow Planner server running on port 5000
```

### Step 6 (Terminal 2 — Frontend): Install dependencies
```
cd StudyFlow-Planner/client
npm install
```

### Step 7 (Terminal 2): Start the frontend
```
npm run dev
```

### Step 8: Open the app
Open your browser at:
```
http://localhost:5173
```

The React app (port 5173) talks to the Express API (port 5000), which talks to MongoDB Atlas.

---

## 5. Troubleshooting

| Problem | Solution |
|---|---|
| `npm install` errors | Delete `node_modules` and `package-lock.json`, run `npm install` again. Ensure Node.js v18+ is installed (`node -v`). |
| **Port already in use** | Backend: change `PORT` in `server/.env`. Frontend: Vite will prompt to use another port automatically, or stop the process using port 5173. |
| **MongoDB connection error** | Check your `MONGODB_URI` is correct, your Atlas password has no special characters that need URL-encoding, and Network Access allows your IP (`0.0.0.0/0`). |
| **CORS error** in browser console | Confirm the backend is running and `cors()` middleware is enabled in `server.js` (it is, by default). Also confirm `VITE_API_URL` matches the backend's actual port. |
| **Module not found** | Run `npm install` again inside the correct folder (`client` or `server`) — dependencies are separate for each. |
| **Blank React page** | Open browser DevTools console for errors. Confirm `npm run dev` is running inside `client/`, not `server/`. |
| **API not responding** | Confirm backend terminal shows "server running on port 5000" with no crash. Visit `http://localhost:5000` directly — it should show a JSON message. |

---

## 6. REST API Endpoints

| Resource | Method | Endpoint | Description |
|---|---|---|---|
| Dashboard | GET | `/api/dashboard` | Summary stats |
| Subjects | GET | `/api/subjects` | List all subjects |
| Subjects | POST | `/api/subjects` | Create subject |
| Subjects | GET | `/api/subjects/:id` | Get one subject |
| Subjects | PUT | `/api/subjects/:id` | Update subject |
| Subjects | DELETE | `/api/subjects/:id` | Delete subject |
| Tasks | GET | `/api/tasks` | List tasks (supports `?status=&priority=&search=&date=`) |
| Tasks | POST | `/api/tasks` | Create task |
| Tasks | PUT | `/api/tasks/:id` | Update task |
| Tasks | DELETE | `/api/tasks/:id` | Delete task |
| Study Plans | GET | `/api/studyplans` | List plans (supports `?date=&subject=`) |
| Study Plans | POST | `/api/studyplans` | Create study plan |
| Study Plans | PUT | `/api/studyplans/:id` | Update study plan |
| Study Plans | DELETE | `/api/studyplans/:id` | Delete study plan |

---

## 7. Features

- Dashboard: total subjects, tasks, completed/pending, today's tasks, progress %
- Subject Management (full CRUD) with progress bars
- Study Planner: schedule sessions by subject/date/time/topic/priority
- Task Management: add/edit/delete/complete, filter by status & priority, search
- Calendar: view schedule by date
- Progress Tracking: subject-wise and overall
- Search & Filter across subjects and tasks
- Form validation, loading states, empty states, and centralized API error handling

---

Built for the Silver Oak University BCA (Honours) Full Stack Development-I course.
