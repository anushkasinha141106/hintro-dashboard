# Hintro Dashboard

A responsive dashboard web app built for the Hintro Frontend Developer Internship assignment. The app replicates the provided Figma design and integrates with the Hintro mock API to display real user data.

## Live Demo

[View Deployed Site](https://hintro-dashboard-app.vercel.app)

## GitHub Repository

[https://github.com/anushkasinha141106/hintro-dashboard](https://github.com/anushkasinha141106/hintro-dashboard)

## Tech Stack

- React with Vite
- React Router DOM for client-side routing
- Axios for API requests
- Lucide React for icons
- Plain CSS with CSS variables, no UI libraries used

## Features

- Closely follows the Figma design in layout, colors, and typography
- Two user states switchable from the sidebar
  - u1 shows empty and new user states
  - u2 shows active user with randomized real data
- All data comes from the mock API, nothing is hardcoded
- Feedback modal with a star rating system
  - Rating 1 to 3 shows a negative feedback form
  - Rating 4 to 5 shows a positive feedback form
  - Submitted feedback is saved to localStorage
  - Shows a success screen after submission
- Feedback History page that displays all past feedback from localStorage
- Responsive layout that works on both mobile and desktop
- Global CSS variables used throughout for consistent theming
- Loading states while API data is being fetched

## Project Structure
src/
├── components/
│   ├── Layout/
│   └── Feedback/
├── context/
├── hooks/
├── pages/
└── utils/

## Setup and Run Instructions

Prerequisites: Node.js v18 or above and npm

Clone the repository

```bash
git clone https://github.com/anushkasinha141106/hintro-dashboard.git
cd hintro-dashboard
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Open in browser at http://localhost:5173

## API Reference

Base URL: https://mock-backend-hintro.vercel.app

The user is passed via the x-user-id header using either u1 or u2.

| Endpoint | Description |
|----------|-------------|
| GET /api/auth/profile | User profile data |
| GET /api/auth/dashboard | Dashboard and subscription info |
| GET /api/call-sessions/stats | Call statistics |
| GET /api/call-sessions?limit=10 | Call history list |

## Assumptions and Notes

- Call Insights, Knowledge Base, Prompts, and Boxy Controls show a coming soon state since the mock API has no endpoints for these sections
- Average duration from the API is in seconds and is converted to a readable format like 1h 37m 48sec as shown in the Figma design
- Last Session is shown as relative time such as 2 days ago, calculated from the lastSession array in the API response
- Feedback is stored in localStorage under the key hintro_feedback
- The user switcher in the sidebar is included for reviewer convenience to easily toggle between u1 and u2
- Watch Tutorial, Start New Call, and Upgrade buttons show a brief toast notification since their functionality is outside the scope of this assignment

Built by Anushka Sinha
