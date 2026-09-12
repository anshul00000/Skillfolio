# Skillfolio

> A developer portfolio platform for sharing projects, discovering other developers, and creating a professional resume.

🔗 **Live Demo:** [skillfolioo.netlify.app](https://skillfolioo.netlify.app)

## ✨ What Skillfolio Does

| Icon | Feature | What users can do |
| :---: | --- | --- |
| 🏠 | Landing page | Explore the Skillfolio experience and navigate to the main sections. |
| 🔐 | Authentication | Create an account with email OTP verification, log in, log out, and reset a forgotten password with OTP verification. |
| 👤 | Personal profile | View profile details, social links, completion progress, project statistics, skills, education, experience, and certifications. |
| ✏️ | Profile editing | Update personal information and professional profile details. |
| 🚀 | Project publishing | Upload and manage portfolio projects with descriptions, technologies, GitHub links, and live links. |
| 🔎 | Project discovery | Browse all published projects and open project details. |
| 👥 | Developer discovery | Browse users, open public profiles, and inspect their portfolio information. |
| 🤝 | Following | Follow developers, unfollow them, and view followers or following lists. |
| 📄 | Resume builder | Choose from Modern, Classic, Creative, and Minimal templates using profile and project data. |
| ⬇️ | PDF export | Download a generated resume as a multi-page PDF. |
| 💬 | Contact | Send a message to the Skillfolio team through the contact form. |
| 📱 | Responsive UI | Use the portfolio, discovery, profile, and resume views on desktop or mobile screens. |

## 🧭 Main Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Home page | Public |
| `/login` | Sign in | Public |
| `/signup` | Create an account | Public |
| `/profile` | View your profile | Signed in |
| `/edit-profile` | Edit your profile | Signed in |
| `/pu` | Upload or manage a project | Signed in |
| `/allproject` | Browse all projects | Public |
| `/users` | Browse developers | Public |
| `/user/:user_id` | View another developer's profile | Public |
| `/followers_users` | View follower or following users | Signed in |
| `/resume` | Open the default resume template | Signed in |
| `/resume/:templateId` | Preview a selected resume template | Signed in |
| `/contact` | Send a contact message | Public |
| `/Search` | Search the platform | Public |
| `/logout` | Sign out | Signed in |

## 🛠️ Frontend Stack

- ⚛️ React 18
- ⚡ Vite
- 🧭 React Router
- 🎨 Material UI, styled-components, and project-specific CSS
- 🎞️ GSAP and AOS for motion and page transitions
- 📑 jsPDF and html2canvas for resume PDF generation
- 🔔 React Toastify for success and error notifications
- 🌐 Fetch API and React Context for backend data and authentication state

## 🚀 Getting Started

### Requirements

- Node.js 18 or newer
- npm
- The Skillfolio backend running locally or the configured production API

### Install and run

Install each application separately:

```bash
cd clint
npm install
npm run dev
```

Vite will print the local development URL in the terminal, normally `http://localhost:5173`.

### Available client commands

Run these commands from `clint/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## 🔗 Backend Configuration

The frontend API URL is configured in:

```text
clint/src/context/context_api.jsx
```

The current client points to the deployed backend. For local development, update `backend_url` to your local server URL, such as `http://localhost:3000`.

Authentication tokens are stored in browser `localStorage` under the `tooken` key. The shared context loads the signed-in user, projects, users, and all public projects for the application.

## 🗂️ Project Structure

```text
skillfolio/
├── clint/           # React/Vite frontend
│   ├── component/   # Feature components and styles
│   ├── public/      # Static files and deployment configuration
│   └── src/         # Routes, entry point, styles, and shared context
├── server/          # Express/MongoDB backend
├── README.md        # Project documentation
└── .gitignore
```

## 👣 Typical User Journey

1. 📝 Register with an email OTP or sign in.
2. 🧑‍💻 Complete the profile with a bio, skills, education, experience, and social links.
3. 🚀 Upload projects with their technology stack and external links.
4. 🌍 Browse projects and discover other developers.
5. 🤝 Follow developers and inspect their public profiles.
6. 📄 Select a resume design and download the finished PDF.

## 🧩 Resume Templates

The resume builder supports four templates:

- 🔷 **Modern**
- 📰 **Classic**
- 🎨 **Creative**
- ◻️ **Minimal**

Resume content is populated from the current profile and project data. Missing optional sections are omitted, and the generated document can span multiple A4 pages.

## 📌 Notes

- The client expects the backend API to be reachable before profile, project, and authentication features can load correctly.
- The client dependency directory is intentionally ignored by Git as `clint/node_modules/`.
- The server dependency directory is intentionally ignored by Git as `server/node_modules/`.
