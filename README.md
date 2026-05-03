# Campus Connect

A full-stack university portal for students, teachers, and admins.
**Stack:** React + Vite (frontend) · Node.js + Express (backend) · SQL Server (cloud DB).

---

## What you need

- **Node.js** (v18 or newer): https://nodejs.org
- **SQL Server Management Studio (SSMS)** if you want to view/edit the DB directly: https://aka.ms/ssms
- An internet connection (the database is hosted in the cloud).

---

## Database

The app connects to a cloud SQL Server hosted at `SQL1001.site4now.net`. Credentials are already set in `backend/config/db.js` — you don't need to install local SQL Server.

To view the DB in SSMS:

| Field | Value |
|---|---|
| Server name | `SQL1001.site4now.net` |
| Authentication | SQL Server Authentication |
| Login | `db_ac8e32_campusconnect_admin` |
| Password | (the one in `backend/config/db.js`) |
| Database name | `db_ac8e32_campusconnect` |

In **Connection Properties** check **Trust Server Certificate**, then Connect.

---

## Running the app

You need **2 terminals open at the same time**.

### Terminal 1 — Backend

```bash
cd backend
npm install
node server.js
```

Wait until you see:
```
server running on port
connected to sql server
```

Leave this terminal running.

### Terminal 2 — Frontend

Open a new terminal in the **project root** (not in backend):

```bash
npm install
npm run dev
```

It prints a URL like `http://localhost:5173/`. Open it in your browser.

---

## Stopping / restarting

- **Stop a server:** click the terminal and press `Ctrl + C`
- **Edited a backend file?** Restart Terminal 1 (`Ctrl + C` → `node server.js`)
- **Edited a frontend file?** No restart — Vite auto-reloads.

---

## Common errors

**"Cannot reach server. Make sure backend is running on port 5000."**
→ Terminal 1 is not running. Start it.

**"Login failed for user ..." (in SSMS or backend logs)**
→ Wrong DB password in `backend/config/db.js`.

**"connection timed out" / `ETIMEDOUT`**
→ No internet, or the cloud DB is temporarily down.

**Frontend page is blank**
→ Open browser console (F12) and check for errors.

---

## Project structure

```
Campus-Connect-main/
├── backend/                  # Node.js + Express API
│   ├── config/db.js          # DB connection (cloud)
│   ├── repositories/         # Direct DB queries
│   ├── services/             # Business logic
│   ├── routes/auth.js        # All API endpoints
│   └── server.js             # Backend entry point (port 5000)
├── src/
│   ├── CampusConnect.jsx     # Main React app (all UI + API calls)
│   ├── index.css             # Styles
│   └── main.jsx              # Frontend entry point
├── campusconnect.sql         # DB schema (already loaded into cloud DB)
└── package.json
```

---

## Roles

- **Student** — sign up via the app. Can view attendance/marks/transcript, register for courses, pay fees, book courts, file complaints.
- **Teacher** — sign up via the app. Can record attendance/marks, generate transcripts, post announcements, add achievements.
- **Admin** — must be created directly in the database (no signup form). Can generate fee challans, manage courses, view all complaints.

---

## Default ports

- Backend API: `http://localhost:5000`
- Frontend dev server: `http://localhost:5173`

---

## SOLID Principles

The backend is organized into three layers — **routes → services → repositories** — and this layering is what allows it to follow the SOLID principles.

### S — Single Responsibility Principle
Every file has exactly one job:
- `repositories/courtbooking.js` only talks to the database (raw SQL queries).
- `services/courtBookingService.js` only handles business rules (e.g. "no booking in the past", "no overlapping slots").
- `routes/auth.js` only handles HTTP — reading the request body and sending a JSON response.

If the database changes, only the repository file changes. If a business rule changes, only the service changes.

### O — Open/Closed Principle
Adding a new feature does not require modifying existing code. To add a new entity (e.g. *Library Books*), you create a new repository, a new service, and a new route. The existing files for attendance, marks, complaints, etc. stay untouched.

### L — Liskov Substitution Principle
All repositories follow the same shape — a class with `create / get / update / delete` style methods that return data the same way. Any service expecting "a repository" can work with any repository class without breaking, because they are interchangeable in behavior.

### I — Interface Segregation Principle
Each service only depends on the repositories it actually needs. For example, `complaintService.js` injects `Complaint` and `Student` repositories — it doesn't see the fee, marks, or course repos. No service is forced to know about methods it doesn't use.

### D — Dependency Inversion Principle
High-level code (services) does not directly create database connections. Instead, services depend on **repository abstractions**, and repositories depend on a shared `db` connection from `config/db.js`. The `db` module can be swapped (e.g. point to a different server) without touching any service or route.

---

## Design Patterns

### 1. Singleton Pattern — `config/db.js`
The database connection is a singleton: only one pool is ever created, and every repository reuses it. This avoids opening multiple expensive connections to SQL Server.

```js
class database {
    constructor() {
        if (database.instance) return database.instance
        this.pool = null
        database.instance = this
    }
    async connect() {
        if (this.pool) return this.pool
        this.pool = await sql.connect(config)
        return this.pool
    }
}
```

### 2. Repository Pattern — `backend/repositories/`
Each repository encapsulates the SQL for one entity (`student.js`, `course.js`, `courtbooking.js`, etc.). The rest of the app never writes raw SQL — it just calls methods like `bookingRepo.bookCourt(...)`. This isolates database details from business logic.

### 3. Service Layer Pattern — `backend/services/`
Each service handles the business rules between the route layer and the repository layer. For example, `courtBookingService.bookCourt(...)` checks that the date isn't in the past, the student exists, and the slot isn't double-booked — *before* calling the repository to insert.

### 4. Module / Façade Pattern — `src/CampusConnect.jsx`
The frontend's `api` object exposes one clean call per backend endpoint (`api.bookCourt`, `api.viewFee`, etc.). React components never write `fetch(...)` directly — they just call `api.*`. This hides URL construction, JSON parsing, and error handling behind a simple façade.

### 5. Strategy Pattern — Login flow
The `Auth` component picks a different login function (`api.loginStudent`, `api.loginTeacher`, `api.loginAdmin`) at runtime based on the selected role tab. The calling code stays the same — only the strategy changes.

### 6. Observer Pattern (via React state) — UI auto-updates
React's `useState` + `useEffect` implement an observer relationship: when state changes (e.g. a new booking is made), components subscribed to that state automatically re-render. This is why the booking table refreshes the moment a new booking succeeds.

---
---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
