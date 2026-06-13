# Vercel Deployment Guide

## Quick Deploy (5 minutes)

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to your project folder**
   ```bash
   cd /path/to/your/project
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   - First time? You'll be asked to log in
   - Press Enter to accept defaults
   - You'll get a live URL instantly!

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard (No CLI needed)

1. **Create a GitHub repository**
   - Go to https://github.com/new
   - Create a new repository (e.g., "ecopoints-app")
   - Don't initialize with README

2. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - EcoPoints app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ecopoints-app.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Wait 1-2 minutes for build to complete
   - You'll get a live URL like: `https://ecopoints-app.vercel.app`

### Option 3: Deploy from a ZIP file

1. **Create a ZIP of your project**
   - Exclude node_modules folder
   - Include all source files

2. **Go to Vercel**
   - Visit https://vercel.com/new
   - Drag and drop your ZIP file
   - Click "Deploy"

## What happens next?

- Vercel builds your app automatically
- You get a URL like: `https://your-project-name.vercel.app`
- Share this URL in your presentation - no one will see your prompts!
- Every time you push changes, Vercel auto-deploys

## Environment Variables (if needed later)

If you add real API keys later:
1. Go to your project on Vercel
2. Click "Settings" > "Environment Variables"
3. Add your keys there (they stay private)

## Custom Domain (optional)

Want a custom domain like `ecopoints.com`?
1. Go to your project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS instructions

## Troubleshooting

**Build fails?**
- Check that pnpm-lock.yaml is committed
- Ensure all dependencies are in package.json

**Blank page?**
- Check browser console for errors
- Verify index.html and main.tsx are in place

**Need help?**
- Vercel docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
