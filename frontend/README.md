# VitalCare Admin Analytics Dashboard — UI

A modern, responsive healthcare analytics dashboard built with React and TypeScript to monitor consultation performance, facility operations, routing efficiency, and operational alerts.

The frontend consumes REST APIs provided by the separate **VitalCare Admin Analytics Dashboard Backend** and displays analytics sourced from Databricks Lakebase PostgreSQL.

## Tech Stack

- **React** — UI development
- **TypeScript** — Type-safe application development
- **Vite** — Frontend development server and build tooling
- **Axios** — HTTP client for backend API integration
- **Recharts** — Data visualization and analytics charts
- **Lucide React** — Icons and interface elements
- **CSS** — Responsive styling and dashboard layout

## Features

### Dashboard Overview
- Total consultations
- Consultation completion rate
- Escalation rate
- Pending consultations
- Active facilities and providers

### Consultation Trends
- Daily consultation volume
- Completed consultation trends
- Interactive line chart with tooltips

### Facility Performance
- Facility-level consultation statistics
- Completion and escalation rates
- Pending consultation counts
- Facility search functionality
- Visual performance indicators

### Routing Analytics
- Routing performance by tier
- Acceptance rate comparisons
- Average primary response time

### Operational Alerts
- Alert severity indicators
- Facility and consultation reference details
- Pending consultation age
- Operational issue summaries

### User Experience
- Responsive dashboard layout
- Sidebar navigation
- Loading and error states
- Dashboard refresh control
- Mobile-friendly navigation

## Technology Architecture

```text
VitalCare Admin Dashboard UI
          |
          | HTTP / REST API
          v
VitalCare Admin Dashboard Backend
          |
          | SQL queries
          v
Databricks Lakebase PostgreSQL
          |
          v
VitalCare Analytics Views
```

The frontend is maintained separately from the Python backend.

## Project Structure

```text
vitalcare-admin-dashboard-UI/
├── public/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   └── layout/
│   ├── services/
│   │   ├── api.ts
│   │   ├── dashboardService.ts
│   │   └── useDashboardData.ts
│   ├── types/
│   │   └── dashboard.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

*The directory structure may evolve as the dashboard is enhanced.*

## Prerequisites

- Node.js and npm
- Git
- Access to the VitalCare Admin Dashboard Backend for live data

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/anitech17/vitalcare-admin-dashboard-UI.git
cd vitalcare-admin-dashboard-UI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend API URL

Create a `.env` file in the frontend root:

```dotenv
VITE_API_BASE_URL=http://localhost:8000
```

For local development, this points to the FastAPI backend running on port `8000`.

For deployment, configure the API URL to match the deployed application architecture.

**Security:** Vite exposes `VITE_` environment variables to browser code. Never store database credentials, OAuth tokens, or other secrets in frontend environment variables.

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local development URL, typically:

```text
http://localhost:5173
```

Open that URL in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the production frontend |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint, if configured in `package.json` |

## Backend API Integration

The UI uses a centralized Axios client and dashboard service to retrieve data from the FastAPI backend.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/dashboard/overview` | Dashboard KPIs |
| GET | `/api/dashboard/trends` | Daily consultation trends |
| GET | `/api/dashboard/facilities` | Facility performance |
| GET | `/api/dashboard/routing` | Routing analytics |
| GET | `/api/dashboard/alerts` | Operational alerts |

The backend must be running and accessible for live dashboard data to load.

During local development, configure FastAPI CORS to allow the frontend origin, `http://localhost:5173`.

## Production Build

To create the optimized frontend build:

```bash
npm run build
```

Vite generates the production assets in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

The production build can be used as part of a suitable deployment configuration for Databricks Apps or another compatible hosting environment.

## Deployment

The planned deployment environment is **Databricks Apps**, with the React UI integrated with the Python FastAPI backend and Databricks Lakebase PostgreSQL.

Deployment configuration must ensure that:
- The frontend can reach the backend API.
- Required environment variables are configured.
- Backend authentication to Lakebase works in the deployed environment.
- Sensitive credentials are not bundled into the frontend.
- The application is tested after deployment.

## Development Roadmap

- Complete GitHub integration and version control.
- Deploy the application to Databricks Apps.
- Validate all dashboard APIs in the hosted environment.
- Improve filtering, sorting, and dashboard interactions.
- Enhance operational monitoring and analytics capabilities.

## Repository

GitHub: https://github.com/anitech17/vitalcare-admin-dashboard-UI

## License

Add the appropriate license when the project licensing terms are finalized.