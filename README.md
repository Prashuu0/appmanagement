# Team Task Manager

Production-ready full-stack SaaS task manager with JWT auth, role-based access, project/member management, task assignment, dashboard analytics, and Railway deployment support.

## Folder Structure

```text
app assessment/
  backend/
    .env.example
    package.json
    src/
      config/
        db.js
      controllers/
        authController.js
        dashboardController.js
        projectController.js
        taskController.js
        userController.js
      middleware/
        authMiddleware.js
        errorMiddleware.js
        roleMiddleware.js
      models/
        Project.js
        Task.js
        User.js
      routes/
        authRoutes.js
        dashboardRoutes.js
        projectRoutes.js
        taskRoutes.js
        userRoutes.js
      utils/
        generateToken.js
      server.js
  frontend/
    .env.example
    package.json
    src/
      components/
      context/
      layouts/
      pages/
      services/
      App.jsx
      index.css
      main.jsx
```

## Backend API

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Projects
- `POST /api/projects` (admin only)
- `GET /api/projects` (admin gets owned projects, member gets joined projects)
- `POST /api/projects/:id/add-member` (admin only)

### Tasks
- `POST /api/tasks` (admin only)
- `GET /api/tasks` (admin gets created tasks, member gets assigned tasks)
- `PUT /api/tasks/:id` (assigned user updates status)
- `DELETE /api/tasks/:id` (creator admin deletes)

### Other Utility APIs
- `GET /api/dashboard`
- `GET /api/users` (admin only, used for assignment/member selection)

## Status Values

Use these exact values in task payloads:
- `pending`
- `in-progress`
- `completed`

## Local Setup

### 1) Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Environment Variables

### `backend/.env`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/team-task-manager?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## Railway Deployment

### Backend Service
1. Create Railway service from the `backend` folder.
2. Set env vars: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, `PORT`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Copy deployed backend URL, for example `https://team-task-api.up.railway.app`.

### Frontend Service
1. Create Railway service from the `frontend` folder.
2. Set `VITE_API_URL=https://<backend-url>/api`.
3. Build command: `npm run build`.
4. Start command: `npm run preview -- --host 0.0.0.0 --port $PORT`.
5. Open deployed frontend URL.

## Sample API Testing (Postman)

1. Register admin  
   `POST /api/auth/register`
   ```json
   { "name": "Admin", "email": "admin@example.com", "password": "admin123", "role": "admin" }
   ```
2. Register member  
   `POST /api/auth/register`
3. Login as admin and store JWT.
4. Create project (admin token).  
   `POST /api/projects`
   ```json
   { "title": "Website Revamp", "description": "Q2 redesign project" }
   ```
5. Add member to project.  
   `POST /api/projects/:id/add-member`
   ```json
   { "userId": "<memberId>" }
   ```
6. Create task assigned to member.  
   `POST /api/tasks`
   ```json
   { "title": "Build login UI", "description": "Responsive auth screens", "projectId": "<projectId>", "assignedTo": "<memberId>", "deadline": "2026-12-31" }
   ```
7. Login as member and fetch assigned tasks.  
   `GET /api/tasks`
8. Update task status as member.  
   `PUT /api/tasks/:id`
   ```json
   { "status": "completed" }
   ```
