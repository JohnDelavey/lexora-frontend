Lexora AI – Frontend
Lexora AI is a Grammarly-style AI writing assistant built with Next.js + TipTap, connected to a FastAPI backend hosted on Hugging Face Spaces.
This repository contains the frontend application deployed on Vercel.
🚀 Tech Stack
Framework: Next.js 13
Editor: TipTap
HTTP Client: Axios
Backend: FastAPI (Hugging Face Space)
Database: Supabase
Deployment: Vercel
📂 Project Structure
Copy code

lexora-frontend/
├── package.json
├── tsconfig.json
├── next.config.js
├── pages/
│   └── index.tsx
├── components/
│   └── Editor.tsx
├── lib/
│   └── apiClient.ts
⚙️ Environment Variables
Create the following variables in Vercel → Project Settings → Environment Variables:
Copy code

NEXT_PUBLIC_BACKEND_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Example:
Copy code

NEXT_PUBLIC_BACKEND_URL=https://your-backend.hf.space
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
After adding variables, redeploy the project.
🖥️ Local Development
Install dependencies:
Copy code
Bash
npm install
Run development server:
Copy code
Bash
npm run dev
Open in browser:
Copy code

http://localhost:3000
🌍 Deployment (Vercel)
Push repository to GitHub
Go to Vercel Dashboard
Click New Project → Import Git Repository
Add environment variables
Deploy
Vercel will automatically:
Install dependencies
Build the Next.js project
Provide a live URL
🔗 API Integration
Frontend communicates with the backend via:
Copy code

POST /correct
POST /download
The backend must be running on Hugging Face Spaces for live corrections to function.
🧠 Features
Rich text editing (TipTap)
AI-powered grammar corrections
Real-time text processing
File export (PDF, DOCX, JPEG)
Supabase document storage
Production-ready deployment on Vercel
📜 License
MIT License
