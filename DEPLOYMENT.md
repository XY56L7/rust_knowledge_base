# Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended - 2 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

Or use the Vercel dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Click Deploy
4. Done! 🎉

### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### 3. Railway

1. Connect GitHub repository
2. Railway auto-detects Next.js
3. Deploys automatically
4. Get URL instantly

### 4. Docker Deployment

```bash
# Build image
docker build -t rust-blockchain-course .

# Run container
docker run -p 3000:3000 rust-blockchain-course
```

## Environment Variables

No environment variables needed for basic deployment.

## Custom Domain

1. **Vercel**: Settings → Domains → Add domain
2. **Netlify**: Domain settings → Add custom domain
3. **Railway**: Settings → Domains

## Performance Optimization

- Enable Next.js Image Optimization
- Use CDN for static assets
- Enable compression
- Optimize bundle size

## Monitoring

- Add Vercel Analytics
- Set up error tracking (Sentry)
- Monitor performance (Lighthouse)

