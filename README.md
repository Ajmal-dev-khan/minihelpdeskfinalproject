# 🎫 MiniHelpDesk

A full-stack support ticket management system built with React, Express, and MongoDB.

---

## 👥 Group Members

| Name | Roll No | Section |
|------|---------|---------|
| Ajmal Khan Jatoi | 2312144 | BSCS 6B |
| Danish Ali | 2312147 | BSCS 6B |

**Course:** Web Technologies I (CS4717)
**Project:** Section B — MiniHelpDesk

---

## 🛠 Technologies Used

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- React Router DOM v6 (routing)
- CSS (custom design, no UI library)

### Backend
- Node.js + Express.js + TypeScript
- Mongoose (MongoDB ODM)
- CORS, dotenv

### Database
- MongoDB (local)

---

## 📁 Project Structure

```
miniHelpDesk/
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── api/            # API service functions
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript interfaces
│   └── index.html
│
└── backend/                # Express + TypeScript
    ├── src/
    │   ├── controllers/    # Route logic
    │   ├── middleware/      # Validation middleware
    │   ├── models/         # Mongoose schemas
    │   └── routes/         # Express routes
    └── .env
```

---

## ⚙️ How to Install

### Prerequisites
- Node.js v18+
- MongoDB running locally
- npm

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

---

## 🚀 How to Run

### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows (if installed as service, it runs automatically)
# Or start manually:
mongod
```

### 2. Start Backend
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

### 3. Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/miniHelpDesk
NODE_ENV=development
```

---

## 🗄 MongoDB Connection Setup

1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. The app will automatically create the `miniHelpDesk` database and `tickets` collection on first use
4. No manual database setup required

---

## 📡 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/tickets?limit=5` | Get tickets with limit |
| GET | `/tickets?limit=10` | Get tickets with limit |
| GET | `/tickets?limit=20` | Get tickets with limit |
| POST | `/tickets` | Create a new ticket |
| DELETE | `/tickets/:id` | Delete a ticket by ID |
| GET | `/health` | Health check |

---

## 🎯 Implemented Features

### ✅ Product Feature: Limit Items by Number
- Dropdown with options: **5**, **10**, **20** tickets
- Frontend sends `?limit=N` query parameter
- Backend validates the limit (only 5, 10, 20 accepted)
- MongoDB uses `.limit(N)` to restrict results
- Shows "X of Y total tickets" count to the user
- List automatically reloads when limit changes

### ✅ Engineering / Quality Feature: Frontend + Backend Validation
**Frontend Validation:**
- Real-time validation on field blur
- Subject: required, min 3 chars, max 100 chars
- Description: required, min 10 chars, max 1000 chars
- Priority: must select Low, Medium, or High
- Red error messages shown under each invalid field
- Character counter for subject and description
- Submit button prevented if validation fails

**Backend Validation:**
- Middleware layer validates all fields before controller runs
- Returns structured error response with field-level messages
- MongoDB schema has enum validation as final layer
- Returns proper HTTP status codes (400, 404, 500)

---

## 🏆 Full Marks Checklist

- [x] React + TypeScript frontend
- [x] Express + TypeScript backend
- [x] MongoDB with Mongoose schema
- [x] GET /tickets with limit query
- [x] POST /tickets with full validation
- [x] DELETE /tickets/:id
- [x] Loading and error states
- [x] Empty state UI
- [x] Product Feature: Limit Items by Number
- [x] Engineering Feature: Frontend + Backend Validation
- [x] React Router with 404 page
- [x] Custom React hooks
- [x] Reusable components
- [x] TypeScript interfaces for all types
- [x] Environment variables
- [x] Clean README.md
- [x] Responsive design

---

## 📸 Screenshots

*(Add screenshots here after running the app)*

---

## 📝 Notes

- Update/Edit is NOT implemented (not required per project spec)
- The bonus authentication task is not included
- All commits are meaningful and track development progress
