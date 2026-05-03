# Vote Sathi

An intelligent, interactive election assistant web application designed to guide Indian citizens through the voting process with personalized assistance, step-by-step guidance, and essential tools.

## Project Overview

### 1. Chosen Vertical
**Civic Technology & Election Assistance**. Vote Sathi aims to bridge the information gap in the Indian democratic process by empowering citizens with accessible, bilingual, and personalized voter education.

### 2. Approach and Logic
The core philosophy behind Vote Sathi is **Accessibility and Personalization**. 
- **Rule-Based Decision Engine**: Instead of relying on a costly or unpredictable AI backend, we built a deterministic client-side decision tree. This ensures users get 100% accurate, legally compliant guidance regarding their eligibility and registration status without needing a constant internet connection.
- **Bilingual First**: Language is often a barrier to civic participation. We structured our context and translation engine to seamlessly toggle between English and Hindi globally across the app.
- **Progressive Disclosure**: Information about elections can be overwhelming. We guide the user step-by-step (e.g., in the Chat Wizard) to provide bite-sized, relevant information based on their age, location, and registration status.

### 3. How the Solution Works
- **Smart Chat Wizard (`/assistant`)**: The user interacts with a conversational UI that asks basic profile questions. Based on the responses, the logic engine computes eligibility (e.g., age >= 18) and provides dynamic "Next Steps" (like showing future eligibility dates or directing to registration).
- **Eligibility & Registration (`/eligibility`, `/register`)**: Provides standalone tools to manually verify voter criteria and lists exactly what documents are needed for online or offline registration.
- **Polling Booth Locator (`/booth`)**: Integrates with mock geospatial data (and Google Maps via iframes) to help users find their nearest polling station, view timings, and get directions.
- **Election Timeline (`/timeline`)**: Uses the `calendarService` to give users a visual countdown to important dates, allowing them to instantly generate `.ics` files to save reminders to their personal calendars.

### 4. Assumptions Made
- **Data Availability**: For the prototype phase, we assume the existence of a structured backend (or APIs) that will eventually provide live polling station locations, dates, and FAQ updates. Currently, this is mocked in `src/data/electionData.js`.
- **Client-Side Processing**: We assume that running the decision-tree logic on the client-side is acceptable since the rules for Indian voter eligibility are static and public. This saves server costs and improves speed.
- **Legal Accuracy**: The mock data and FAQs reflect general guidelines of the Election Commission of India (ECI), but it is assumed users understand this is a prototype and not a legally binding official government resource.

## Architecture & Tech Stack

- **Framework**: React 19 + Vite 6
- **Routing**: React Router v7
- **Styling**: Vanilla CSS (Custom Design System with Design Tokens)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context + useReducer
- **APIs**: Google Maps (Polling Booths), Google Calendar (Reminders), Firebase (Ready for auth/db)


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
   docker run -p 8080:8080 vote-sathi
   ```

3. **Deploy to Cloud Run via gcloud CLI**:
   ```bash
   gcloud run deploy vote-sathi \
     --source . \
     --platform managed \
     --region asia-south1 \
     --allow-unauthenticated \
     --port 8080
   ```

*(Alternatively, you can connect your GitHub repository directly in the Google Cloud Console for continuous deployment to Cloud Run).*
