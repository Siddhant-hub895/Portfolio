# Siddhant Pawar — Portfolio

Personal site for a final-year Electronics & Telecommunication Engineering student and full-stack developer. Content lives in one data file. The contact form sends mail through Resend without exposing the API key in the browser.

## Features

- Single-page portfolio: about, experience, projects, skills, education, certifications, contact
- Light and dark themes, saved in localStorage, with the system theme on first visit
- Sticky navigation with an active section and a mobile menu
- Contact form with validation, a honeypot, and basic rate limiting
- Resume link pointed at `frontend/public/resume.pdf`

## Tech stack

- React, Vite, JavaScript, Tailwind CSS, Framer Motion, Lucide React
- Serverless contact endpoint. Shared logic lives in `backend/`. Vercel and Netlify each have a thin entry file.
- Resend for email delivery

## Folder structure

```
frontend/
  index.html
  public/                 Static files, including resume.pdf
  src/
    components/           Navbar, sections, and small UI pieces
    context/              Theme provider
    data/portfolio.js     All editable content
    hooks/
    utils/
  vite.config.js
backend/
  contactCore.js          Validation, rate limit, and Resend email
  devMiddleware.js        Local /api/contact handler for Vite
api/contact.js            Vercel entry — calls backend
netlify/functions/        Netlify entry — calls backend
```

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, copy the example file with:

```powershell
Copy-Item .env.example .env
```

Open the URL Vite prints, usually `http://localhost:5173`.

## Environment variables

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Secret API key from the Resend dashboard. Server only. |
| `CONTACT_EMAIL` | Inbox that should receive form messages. |
| `FROM_EMAIL` | Verified sender, for example `Portfolio <hello@yourdomain.com>`. |

Do not prefix these with `VITE_`. That would expose them in the frontend bundle.

## Email configuration

1. Create a [Resend](https://resend.com) account and an API key.
2. Verify a domain, then set `FROM_EMAIL` to an address on that domain.
3. Set `CONTACT_EMAIL` to the address where you want messages delivered.
4. For a quick local test, Resend allows `FROM_EMAIL=onboarding@resend.dev` and delivery only to the email on your Resend account.
5. Add the same three variables in the Vercel or Netlify project settings before deploying.

The form posts to `POST /api/contact`. In development, the Vite server uses `backend/devMiddleware.js`. In production, `api/contact.js` (Vercel) and `netlify/functions/contact.js` (Netlify) both call `backend/contactCore.js`.

A message includes the sender's name, email, subject, and message, and sets Reply-To to the sender's address.

## Scripts

```bash
npm run dev       # local site and contact API
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Deployment

### Vercel

- Import the repository.
- Framework preset: Vite.
- Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and `FROM_EMAIL`.
- Deploy. The `api` folder is picked up as serverless functions.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- `netlify.toml` already sets the function directory and the `/api/*` redirect.
- Add the same three environment variables, then deploy.

## Content you still need to fill

Edit `frontend/src/data/portfolio.js`:

- Optional Instagram
- Resume: put the PDF at `frontend/public/resume.pdf`
- Project live demo and screenshot paths
- Certifications, using the object shape commented in the file

Leave a field empty rather than inventing a detail.
