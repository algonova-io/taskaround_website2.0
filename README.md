# TaskAround Website 2.0

TaskAround is a modern web application built with Nuxt 4, designed to connect users with service providers (Taskers). The platform features a step-by-step wizard for both creating tasks and becoming a tasker, multi-language support, and integration with Firebase and Google Maps.

## 🛠 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3, TypeScript)
- **UI & Styling**: [Nuxt UI](https://ui.nuxt.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Better-SQLite3](https://github.com/WiseLibs/better-sqlite3)
- **Backend Services**: [Firebase](https://firebase.google.com/) (Authentication & Realtime Database/Firestore)
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Other Tools**: [Nuxt Content](https://content.nuxt.com/), [Nuxt Image](https://image.nuxt.com/), [Zod](https://zod.dev/) for validation.

## 📁 Project Structure

```text
├── app/                  # Main application source code
│   ├── assets/           # Global styles and assets
│   ├── components/       # Vue components (Wizards, Profiles, Layout)
│   ├── composables/      # Shared logic and state
│   ├── layouts/          # Page layouts (Default, Landing)
│   ├── middleware/       # Navigation guards (City detection)
│   ├── models/           # TypeScript interfaces and Zod schemas
│   ├── pages/            # Application routes (Dynamic city/category routing)
│   ├── plugins/          # Nuxt plugins (Firebase initialization)
│   └── utils/            # Helper functions
├── i18n/                 # Localization files (JSON)
├── public/               # Static assets (images, fonts, robots.txt)
├── shared/               # Code shared between client and server (TODO)
├── nuxt.config.ts        # Nuxt configuration
├── package.json          # Project dependencies and scripts
└── .env                  # Environment variables (not in version control)
```

## 🚀 Getting Started

### Requirements

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) (Package manager)

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd taskaround_website_2.0
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   NUXT_PUBLIC_GOOGLE_MAPS_KEY=your-google-maps-api-key
   NUXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   NUXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NUXT_PUBLIC_FIREBASE_REGION=your-firebase-region
   ```

### Development

Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### Production

Build the application for production:
```bash
npm run build
```

Locally preview the production build:
```bash
npm run preview
```

## 📜 Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build production-ready application.
- `npm run generate`: Static site generation (SSG).
- `npm run preview`: Preview the production build locally.
- `npm run postinstall`: Run Nuxt preparation (auto-generation of types).

## 🧪 Testing

- **TODO**: Automated tests are not yet implemented. `@nuxt/test-utils` is included in the project for future use.

## 🌍 Localization

The project uses `@nuxtjs/i18n` for multi-language support. Translations are located in `i18n/locales/`.
Supported languages:
- German (de) - Default
- English (en)
- Spanish (es)
- Italian (it)
- Russian (ru)
- Ukrainian (uk)

## 📄 License

This project is private and not licensed for public use.
