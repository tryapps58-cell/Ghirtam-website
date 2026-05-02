# GHRITAM — Premium A2 Bilona Ghee

> *"The Essence of Pure Tradition"*

A premium D2C e-commerce platform for GHRITAM Organic A2 Bilona Ghee, built with Next.js, Tailwind CSS, and Supabase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v3 |
| Language | TypeScript |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL |
| Storage | Supabase Storage |
| Deployment | Vercel (Mumbai region) |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/           — Next.js App Router pages
├── components/    — Reusable UI components
├── lib/           — Supabase clients, utils, hooks
├── context/       — React context (cart, auth)
└── types/         — TypeScript type definitions

public/
└── images/        — Product & brand images
```

---

## Deployment

**Every push to `main` auto-deploys to Vercel production.**

```bash
# Feature development workflow
git checkout -b feature/your-feature
git commit -m "feat: description"
git push origin feature/your-feature

# Merge to dev → preview URL
# Merge to main → production deploy (~60 seconds)
```

---

## Admin Dashboard

Access at `/admin` — requires admin role in Supabase profiles table.

---

© 2024 GHRITAM | Made with ❤ in India
