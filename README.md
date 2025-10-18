# PollNext - Question Voting App

A simple Next.js application for collecting and voting on questions. No login required, voting tracked via browser localStorage.

## Features

- 📝 Submit questions (10-500 characters)
- 👍 Upvote questions (one vote per question per browser)
- 📊 Questions automatically sorted by votes
- 💾 Data persisted in JSON file
- 📱 Fully responsive design
- 🌙 Dark mode support
- 🚀 Free hosting on Vercel

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy (it's free!)

## How It Works

- **No Database**: Questions are stored in a JSON file (`data/questions.json`)
- **No Authentication**: Voting state is tracked in browser's localStorage
- **Serverless**: API routes run as serverless functions on Vercel
- **Real-time Sorting**: Questions with more votes appear first

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Vercel (Deployment)

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── questions/route.ts  # GET/POST questions
│   │   └── vote/route.ts       # POST vote endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── data/
│   └── questions.json          # Data storage
└── package.json
```

## Notes

- Each browser can vote once per question (tracked via localStorage)
- Data persists across deployments via Vercel's filesystem
- No moderation features (add if needed)
- Questions are validated (10-500 characters)

## License

MIT

