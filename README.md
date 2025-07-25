# Project Setup Instructions

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

---

## 1. Backend (NestJS + MongoDB)

### Install dependencies
```
cd backend
npm install
```

### Configure MongoDB
- By default, the backend connects to `mongodb://localhost/nest`.
- To use a different URI, update the connection string in `src/app.module.ts`:
  ```ts
  MongooseModule.forRoot('mongodb://localhost/nest')
  ```

### Start the backend server
```
npm run start:dev
```
- The backend will run on [http://localhost:3001](http://localhost:3001)

---

## 2. Frontend (Next.js)

### Install dependencies
```
cd ../frontend
npm install
```

### Start the frontend server
```
npm run dev
```
- The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## 3. Usage
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Enter a website idea and click "Generate Sections".
- The app will display dummy sections as a preview.

---

## 4. Troubleshooting
- Ensure MongoDB is running and accessible.
- If you change backend or MongoDB ports, update the URLs in the frontend and backend code accordingly.
- If you see CORS errors, make sure the backend has `app.enableCors()` in `main.ts`.

---

## 5. Customization
- To change the dummy sections, edit `src/sections/sections.service.ts` in the backend.
- To improve UI, edit `app/page.tsx` and `app/globals.css` in the frontend.

---

## 6. Scripts
- **Backend:**
  - `npm run start:dev` — Start backend in watch mode
  - `npm run test` — Run backend tests
- **Frontend:**
  - `npm run dev` — Start frontend in development mode
  - `npm run build` — Build frontend for production

---
