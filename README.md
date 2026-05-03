# Vote Sathi

An intelligent, interactive election assistant web application designed to guide Indian citizens through the voting process with personalized assistance, step-by-step guidance, and essential tools.

## Architecture & Tech Stack

- **Framework**: React 19 + Vite 6
- **Routing**: React Router v7
- **Styling**: Vanilla CSS (Custom Design System with Design Tokens)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context + useReducer
- **APIs**: Google Maps (Polling Booths), Google Calendar (Reminders), Firebase (Ready for auth/db)

### Architecture Diagram

```mermaid
graph TB
    subgraph Frontend["Frontend (React + Vite)"]
        App["App Shell"]
        Router["React Router"]
        Pages["Pages (Lazy Loaded)"]
        Context["Providers (Theme, Lang, Assistant)"]
    end

    subgraph Core Features
        Assistant["Smart Chat Assistant"]
        Eligibility["Eligibility Checker"]
        Registration["Registration Guide"]
        Booth["Polling Booth Finder"]
        Timeline["Election Timeline"]
    end

    subgraph External Services
        Firebase["Firebase (Auth/Firestore)"]
        GoogleMaps["Google Maps API"]
        GoogleCalendar["Google Calendar API"]
    end

    App --> Router --> Pages
    Pages --> Context
    Context --> Core Features
    Booth --> GoogleMaps
    Timeline --> GoogleCalendar
    Context -.-> Firebase
```

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Environment Variables**:
   Copy `.env.example` to `.env` and fill in your API keys (see below).
   ```bash
   cp .env.example .env
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Firebase Setup Instructions

The application is scaffolded for Firebase, but you need to create a project and configure keys to use the backend features:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **Create a project** and follow the prompts.
3. In your project dashboard, click the **Web icon (`</>`)** to register a web app.
4. Firebase will provide a `firebaseConfig` object.
5. Copy these values into your `.env` file mapping to the respective `VITE_FIREBASE_*` variables.
6. To enable Authentication: Go to **Build > Authentication > Get Started** and enable your preferred sign-in methods (Email/Password, Google).
7. To enable Database: Go to **Build > Firestore Database > Create Database**.

## Deployment to Google Cloud Run

The repository includes a `Dockerfile` optimized for deploying Vite/React SPA applications using Nginx.

1. **Build the Docker Image**:
   ```bash
   docker build -t vote-sathi .
   ```

2. **Run Locally via Docker** (Testing):
   ```bash
   docker run -p 8080:80 vote-sathi
   ```

3. **Deploy to Cloud Run via gcloud CLI**:
   ```bash
   gcloud run deploy vote-sathi \
     --source . \
     --platform managed \
     --region asia-south1 \
     --allow-unauthenticated \
     --port 80
   ```

*(Alternatively, you can connect your GitHub repository directly in the Google Cloud Console for continuous deployment to Cloud Run).*
