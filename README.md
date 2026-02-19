
# 📚 Smart Bookmark App

A Smart Bookmark Manager built using Next.js and Supabase with Google OAuth authentication.
Users can log in with Google and manage their personal bookmarks securely
✅ The application is successfully deployed on Vercel and publicly accessible

---

## 🚀 Features

✔️ Login / Signup using **Google OAuth only**  
✔️ Logged-in users can **add bookmarks** (title + URL)  
✔️ Bookmarks are **private per user** (User A cannot see User B’s bookmarks)  
✔️ **Real-time updates** across tabs without page refresh  
✔️ Users can **delete their own bookmarks**  
✔️ Persistent bookmarks saved in database  

---

## 🧠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js (App Router) | Frontend & Page Routing |
| Supabase | Backend, Database, Authentication & Real-time |
| Google OAuth | Authentication provider |
| Tailwind CSS | Utility-first styling |
| Vercel | Deployment |

---

## Local Setup Guide
Follow these steps to run the project locally.

### 1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/smart-bookmark-app.git
cd smart-bookmark-app
### 2️⃣ Install Dependencies
npm install
### 3️⃣ Create Supabase Project

Go to https://app.supabase.com

Create a new project

Wait until initialization completes

### 4️⃣ Get Supabase API Keys

Supabase Dashboard → Settings → API

Copy:

Project URL

anon public key

### 5️⃣ Create Environment File

Create a file in the project root:

.env.local

Add:

NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
### 6️⃣ Create Database Table

Open Supabase → SQL Editor → Run:

create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  user_id uuid references auth.users(id),
  created_at timestamptz default now()
); 

### 7️⃣ Enable Google OAuth

Supabase → Authentication → Providers → Google → Enable

Add redirect URL:

http://localhost:3000/auth/v1/callback

Save settings.

### 8️⃣Run the App
npm run dev

Open:

http://localhost:3000

Login with Google and start using the app.

## Deployment Status

This project is fully deployed and working in production on Vercel.

🔗 **Live App:** https://smart-bookmark-1a30xyj5y-priah17s-projects.vercel.app

