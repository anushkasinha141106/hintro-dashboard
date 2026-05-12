# Hintro Frontend Dashboard

A responsive React implementation of the Hintro frontend assignment. The project builds a mock dashboard based on the provided Figma design and uses the supplied mock APIs for user profile, dashboard statistics, and call-session data.

## Live Access

GitHub Repository: `https://github.com/anushkasinha141106/hintro-dashboard`

Deployed Link: `https://hintro-dashboard-app.vercel.app`

## Login Access

The login screen is implemented as a mock UI gate because the assignment API does not provide an authentication endpoint.

No real credentials are required. Reviewers can enter any email and password, or simply click **Login**, to access the dashboard.

After entering the dashboard, the profile dropdown can be used to switch between the two required review states:

- `u1` / Empty user: displays empty dashboard and empty call-session state
- `u2` / Active user: displays populated dashboard and call-session state

## Features

- Figma-matched dashboard layout with sidebar, header, profile menu, statistics cards, and recent calls section
- Responsive login page for desktop and mobile layouts
- User-state switching for `u1` and `u2`
- Empty state handling for new users
- Populated state handling for active users
- Feedback modal flow with rating selection, positive/negative prompts, validation, and acknowledgement screen
- Feedback persistence using `localStorage`
- Feedback History page that displays submitted feedback records
- Logout confirmation modal
- Coming-soon states for pages without mock API endpoints

## Tech Stack

- React
- Vite
- React Router
- Axios
- Lucide React
- CSS with shared global theme variables
- Browser `localStorage` for feedback persistence

## API Integration

Base URL:

```txt
https://mock-backend-hintro.vercel.app
```

The application uses the required `x-user-id` header to switch API responses between assignment user states.

Implemented endpoints:

```txt
GET /api/auth/profile
GET /api/call-sessions/stats
GET /api/call-sessions?limit=10
```

Documented mock API endpoint not currently displayed in the UI:

```txt
GET /api/auth/dashboard
```

User states:

```txt
u1: Empty/new user state
u2: Active user with randomized dashboard and call-session data
```

### Profile

```txt
GET /api/auth/profile
Headers: x-user-id: u1 | u2
```

Returns the current user's profile information, including name, email, login method, account status, and timestamps.

### Dashboard

```txt
GET /api/auth/dashboard
Headers: x-user-id: u1 | u2
```

Returns user, subscription, and usage information. The assignment documentation includes this endpoint for subscription and usage-related dashboard data.

For `u1`, subscription is `null` and usage values are empty. For `u2`, subscription and usage values are populated.

### Call Session Stats

```txt
GET /api/call-sessions/stats
Headers: x-user-id: u1 | u2
```

Returns the statistics shown in the dashboard cards:

- Total sessions
- Average duration
- Total AI interactions
- Last session dates

For `u1`, the API returns zero or empty values. For `u2`, the API returns randomized active-user data.

### Call History

```txt
GET /api/call-sessions?limit=N
Headers: x-user-id: u1 | u2
```

Returns paginated call-session history. The dashboard uses this data for the Recent Calls section.

For `u1`, the API returns an empty `callSessions` array. For `u2`, the API returns randomized call-session records with client, description, start time, duration, AI interactions, and participants.

## Feedback Storage

Feedback submissions are stored locally in the browser using:

```txt
hintro_feedback
```

Each saved feedback entry includes:

- Rating
- Feedback type
- Text description
- Submission timestamp
- Display title

The Feedback History page reads from the same `localStorage` key.

## Project Setup

Clone the repository:

```bash
git clone https://github.com/anushkasinha141106/hintro-dashboard.git
cd hintro-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

```txt
npm run dev      Starts the Vite development server
npm run build    Creates the production build
npm run lint     Runs ESLint checks
npm run preview  Serves the production build locally
```

## Project Structure

```txt
src/
  components/
    Feedback/
    Layout/
    LogoutModal/
  context/
    UserContext.jsx
  hooks/
    useFetch.js
    useToast.js
  pages/
    ComingSoon.jsx
    Dashboard.jsx
    FeedbackHistory.jsx
    Login.jsx
  utils/
    formatters.js
  App.jsx
  main.jsx
  index.css

public/
  assets/
    dashboard/
```

## Design Implementation Notes

- The UI follows the supplied Figma screens for dashboard, empty state, feedback flow, feedback history, logout modal, and login.
- Figma-exported SVG and PNG assets are stored under `public/assets/dashboard`.
- Shared colors, dimensions, borders, and spacing are centralized through CSS variables where practical.
- The active user profile image uses the provided exported PNG asset.
- Dashboard time values are formatted into the display conventions shown in the design.
- Dashboard statistics and call history are read from the mock API and are not hardcoded.
- The UI includes responsive adjustments for smaller viewports.

## Assumptions

- The assignment does not include an authentication API, so login is implemented as a visual entry screen only.
- Feedback is intentionally persisted on the client using `localStorage`, as required by the assignment.
- Sections without provided API endpoints are represented as coming-soon states.
- The reviewer user switcher is included in the profile dropdown to make testing `u1` and `u2` states straightforward.
- The mock API returns randomized data for `u2`, so active dashboard values may differ between refreshes.

## Build Status

The project has been verified with:

```bash
npm run build
```

ESLint runs successfully with no blocking errors.
