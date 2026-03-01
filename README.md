# The Build Log - Donald Bury's Portfolio & Blog

A modern, responsive personal website and blog built with **React** and **Vite**. This application serves as a central hub for Donald Bury's coding projects, career history, hobbies (rock climbing, Warhammer, gaming), and offers professional web development services.

## Features & Pages
The application is structured as a Single Page Application (SPA) using `react-router-dom`:
- **Home (`/`)**: A dynamic landing page introducing Donald, complete with animated CSS grid overlays and a sun orb backend.
- **About (`/about`)**: A detailed resume-style page outlining career history (Babcock International, The Range, NHS), education, and hobbies.
- **Services (`/services`)**: A professional offerings page detailing Website Creation and Web Application services, complete with a responsive contact form.
- **Blog (`/blog`)**: An index of technical blog posts and updates.
- **Blog Post (`/blog/:slug`)**: Dynamic individual article views for deep-diving into specific topics.
- **Modern Theme System**: The entire site is wrapped in a React Context that provides a `light` or `dark` mode toggle, adjusting semantic CSS variables globally.

## Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS utilizing modern CSS Custom Properties (Variables) and Flexbox/Grid layouts. Fully responsive out-of-the-box (`@media` breakpoints defined for mobile devices).
- **Icons**: Inline SVGs

## Project Structure
```text
src/
├── components/          # Reusable UI pieces
│   ├── NavBar.jsx       # Top navigation & theme toggle
│   └── Footer.jsx       # Bottom copyright & social links
├── contexts/            
│   └── ThemeContext.jsx # Light/Dark mode state management
├── pages/               # Top-level route components
│   ├── Home.jsx         
│   ├── About.jsx        
│   ├── Services.jsx     
│   ├── BlogList.jsx     
│   └── BlogPost.jsx     
├── App.jsx              # Main Router and ThemeProvider wrapper
└── index.css            # Global CSS Variables and reset styles
```

## How to Run Locally

To get this project up and running on your local machine:

1. **Clone the repository** (or download the source).
2. **Install Dependencies**: Open your terminal in the root project folder and run:
   ```bash
   npm install
   ```
3. **Start the Development Server**: Spin up the Vite dev server with:
   ```bash
   npm run dev
   ```
4. **View the App**: Open your browser and navigate to the localhost URL provided by Vite (typically `http://localhost:5173`).

## Git Ignored Folders

This project includes a `.gitignore` file that excludes the following folders:

### `node_modules`
*   **Why?**: This folder contains all the external libraries (dependencies) required by the project. It is massive and platform-dependent.
*   **How to get it back?**: Run `npm install`. This regenerates the folder based on your `package.json` and `package-lock.json`.

### `dist`
*   **Why?**: This is the "distribution" or build folder. It contains the final, minified code generated for production. Tracking it in Git causes unnecessary bloat and merge conflicts.
*   **How to get it back?**: Run `npm run build`. This takes your source code from the `src` folder and recreates the `dist` folder.
