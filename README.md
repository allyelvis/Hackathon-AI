# Hackathon AI Dashboard

An AI-powered dashboard for managing and monitoring hackathon projects. It provides key metrics, submission tracking, and leverages Gemini for in-depth project analysis to assist judges and organizers.

## ✨ Features

- **📊 Interactive Dashboard:** Get a real-time overview of hackathon statistics including total projects, participant numbers, submission counts, and projects currently under review.
- **📈 Submission Trends:** Visualize project submission activity over time with an interactive bar chart.
- **📋 Dynamic Submissions List:** View all submitted projects in a clean, sortable table. Search by project name or team members, and filter by submission status (`Winner`, `Finalist`, `Judging`, `Submitted`, etc.).
- **🤖 AI-Powered Analysis:** Leverage the Google Gemini API to:
    - Automatically generate a detailed analysis of any project, including scores for innovation, technical complexity, and business potential.
    - Get AI-generated strengths, weaknesses, and suggested questions for the judges.
    - Create a catchy, one-sentence tagline for any project instantly.
- **🏆 Winners Showcase:** A dedicated view to highlight and celebrate the winning and finalist projects.
- **📝 Easy Registration & Submission:** Built-in forms for participants to register for the hackathon and for teams to submit their projects seamlessly.
- **🎨 Modern & Responsive UI:** A sleek, dark-themed interface built with Tailwind CSS that looks great on all devices.

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charting:** [Recharts](https://recharts.org/)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview) (`@google/genai`)

## 🚀 Getting Started

This project is designed to run in an environment that supports ES modules and has the necessary environment variables configured.

### Prerequisites

- A modern web browser.
- A valid Google Gemini API Key.

### Installation & Running

1.  **Set up the files:**
    Ensure you have all the project files (`index.html`, `index.tsx`, `components/`, etc.) in a single directory.

2.  **Set up your Environment Variables:**
    The application requires a Google Gemini API key to function. This key must be available as an environment variable named `API_KEY`.

3.  **Serve the files:**
    You can use any simple static server to run the `index.html` file. A popular choice is `serve`.
    ```bash
    # Install serve globally if you don't have it
    npm install -g serve

    # Run the server from your project's root directory
    serve .
    ```
    Now, you can open the provided URL (e.g., `http://localhost:3000`) in your browser to view the application.

## 📂 Project Structure

```
.
├── components/          # Reusable React components
│   ├── DashboardView.tsx
│   ├── Header.tsx
│   ├── NewSubmissionView.tsx
│   ├── ProjectDetailModal.tsx
│   ├── RegistrationView.tsx
│   ├── Sidebar.tsx
│   ├── StatCard.tsx
│   ├── SubmissionsView.tsx
│   ├── WinnersView.tsx
│   └── icons/
│       └── Icons.tsx
├── services/            # Services for external APIs
│   └── geminiService.ts
├── App.tsx              # Main application component
├── README.md            # Project documentation
├── constants.ts         # Mock data and constants
├── index.html           # Entry HTML file
├── index.tsx            # Main React entry point
├── metadata.json        # Project metadata
└── types.ts             # TypeScript type definitions
```
