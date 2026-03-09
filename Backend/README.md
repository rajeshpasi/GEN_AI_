# GEN_AI Interview Prep — Backend

A Node.js + Express REST API that uses **Google Gemini AI** to generate personalised interview preparation reports from a candidate's resume, self-description, and a target job description.

## Features

- **JWT Authentication** — Register, login, logout, and profile retrieval with HTTP-only cookie tokens and a token blacklist.
- **AI Interview Reports** — Upload a PDF resume and receive a full report containing:
  - Match score (0–100)
  - Technical & behavioural interview questions with intentions and suggested answers
  - Skill gap analysis with severity ratings
  - Day-wise preparation plan
- **Resume PDF Generation** — Generate an optimised resume PDF via Puppeteer based on an existing report.
- **MongoDB** persistence via Mongoose.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB / Mongoose |
| AI | Google Gemini (`@google/genai`) |
| Auth | JWT + bcryptjs |
| Validation | Zod → JSON Schema |
| File Upload | Multer |
| PDF Parsing | pdf-parse |
| PDF Generation | Puppeteer |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** running locally or a MongoDB Atlas URI

### Installation

```bash
cd Backend
npm install
```

### Environment Variables

Create a `.env` file in the `Backend/` directory:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/GEN_AI
JWT_SECRET=<your-jwt-secret>
GEMINI_API_KEY=<your-google-gemini-api-key>
```

### Run

```bash
# Development (with nodemon)
npm run dev

# Production
node server.js
```

The server starts on `http://localhost:8000` by default.

## API Endpoints

### Auth — `/api/auth`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | Public | Register a new user (`username`, `email`, `password`) |
| POST | `/login` | Public | Login and receive a JWT cookie (`email`, `password`) |
| GET | `/logout` | Public | Clear cookie and blacklist the token |
| GET | `/get-profile` | Private | Get the authenticated user's profile |

### Interview — `/api/interview`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/` | Private | Upload a PDF resume (`multipart/form-data`) with `selfDescription` and `jobDescription` to generate a report |
| GET | `/:interviewId` | Private | Get a specific interview report |
| GET | `/` | Private | List all interview reports for the logged-in user |
| GET | `/resume/:interviewReportId` | Private | Download a generated resume PDF |

## Testing with Postman

> Base URL: `http://localhost:8000`

### 1. Register

- **POST** `http://localhost:8000/api/auth/register`
- Body → **raw / JSON**:
  ```json
  {
    "username": "john",
    "email": "john@example.com",
    "password": "secret123"
  }
  ```

### 2. Login

- **POST** `http://localhost:8000/api/auth/login`
- Body → **raw / JSON**:
  ```json
  {
    "email": "john@example.com",
    "password": "secret123"
  }
  ```
- The response sets a `token` cookie automatically.

> **Important:** After logging in, the JWT is stored in a cookie. For all **Private** routes to work you must send the cookie back.  
> In Postman go to **Settings ⚙️ → General → Automatically follow redirects** and ensure **Send cookies** is enabled, or copy the `token` value from the **Cookies** tab and add it manually in subsequent requests via the **Cookies** section.

### 3. Get Profile (Private)

- **GET** `http://localhost:8000/api/auth/get-profile`
- No body required — the cookie is sent automatically if you're in the same Postman session.

### 4. Logout

- **GET** `http://localhost:8000/api/auth/logout`

### 5. Generate Interview Report (Private)

- **POST** `http://localhost:8000/api/interview`
- Body → **form-data**:

  | Key | Type | Value |
  |-----|------|-------|
  | `resume` | **File** | Select a PDF file |
  | `selfDescription` | Text | A short paragraph about yourself |
  | `jobDescription` | Text | The full job description text |

### 6. Get All Interview Reports (Private)

- **GET** `http://localhost:8000/api/interview`

### 7. Get Interview Report by ID (Private)

- **GET** `http://localhost:8000/api/interview/:interviewId`
- Replace `:interviewId` with the actual `_id` from a report, e.g.  
  `http://localhost:8000/api/interview/660f1a2b3c4d5e6f7a8b9c0d`

### 8. Download Generated Resume PDF (Private)

- **GET** `http://localhost:8000/api/interview/resume/:interviewReportId`
- Replace `:interviewReportId` with the report's `_id`.
- Postman will show a **Save Response** button to download the PDF.

## Project Structure

```
Backend/
├── server.js                   # Entry point — starts Express & connects DB
├── package.json
├── .env
└── src/
    ├── app.js                  # Express app setup, middleware, routes
    ├── config/
    │   └── DB.js               # MongoDB connection
    ├── controllers/
    │   ├── auth.controller.js  # Register, login, logout, profile
    │   └── interview.controller.js # Report CRUD & resume PDF
    ├── middlewares/
    │   ├── auth.middleware.js   # JWT verification
    │   └── file.middleware.js   # Multer file upload config
    ├── models/
    │   ├── user.model.js
    │   ├── blackList.model.js  # Token blacklist
    │   └── interviewReport.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   └── interview.routes.js
    └── services/
        └── ai.service.js       # Gemini AI integration & Zod schema
```

## License

ISC
