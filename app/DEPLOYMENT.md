# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project root
cd /path/to/dpi-checker/app
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project's name? print-ready-validator
# - In which directory is your code located? ./
# - Override settings? No

# Your app will be live at: https://print-ready-validator.vercel.app
```

### Option 2: Vercel Dashboard

1. Go to https://vercel.com/new
2. Import Git Repository (or drag/drop folder)
3. Configure project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Click "Deploy"
5. Your app will be live in ~2 minutes

## Deploy to Netlify

### Option 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod

# Follow prompts and provide dist/ as publish directory
```

### Option 2: Netlify Dashboard

1. Go to https://app.netlify.com/
2. Drag and drop the `dist/` folder (after running `npm run build`)
3. Your app will be live immediately

## Build for Production

```bash
# Build optimized production bundle
npm run build

# Output will be in dist/ folder
# This folder contains everything needed for deployment
```

## Environment Setup

No environment variables required - this is a fully client-side app.

## Custom Domain Setup

### Vercel
1. Go to project settings
2. Add domain: printreadychecker.com (or your domain)
3. Configure DNS with provided nameservers

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS records as instructed

## Performance Optimization

Already implemented:
- Vite code splitting
- Tailwind CSS purging (removes unused styles)
- Image lazy loading
- Client-side processing (no server latency)

## Monitoring & Analytics

To add Google Analytics:

1. Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. Track CTA clicks in `CreativeFabricaCTA.jsx`:
```javascript
onClick={() => {
  gtag('event', 'cta_click', {
    event_category: 'conversion',
    event_label: overallPass ? 'pass_state' : 'fail_state'
  });
}}
```

## Post-Deployment Checklist

- [ ] App loads without errors
- [ ] File upload works (drag-and-drop + click)
- [ ] Platform selector changes validation rules
- [ ] DPI table displays correctly
- [ ] Share functionality copies URL to clipboard
- [ ] Creative Fabrica CTA links to correct URL
- [ ] Mobile responsive (test on phone)
- [ ] SEO meta tags present (view source)
- [ ] All images/assets load correctly

## Troubleshooting

### Build Fails
- Check Node version (should be 18+)
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm run build` locally first

### Deployment Successful But App Shows Blank Page
- Check browser console for errors
- Verify base path in `vite.config.js` (should be `/` for root deployment)
- Clear browser cache and hard reload

### File Upload Not Working
- Check browser console for CORS errors
- File API should work client-side (no CORS issues)
- Test in different browser

## Rollback Strategy

### Vercel
- Go to Deployments tab
- Click "..." on previous working deployment
- Click "Promote to Production"

### Netlify
- Go to Deploys tab
- Click "Publish deploy" on previous version

## Cost Estimate

Both Vercel and Netlify offer generous free tiers:

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited static sites
- Perfect for this use case

**Netlify Free Tier:**
- 100 GB bandwidth/month
- Unlimited static sites
- Perfect for this use case

Expected monthly cost: **$0** (stays within free tier)

## SSL/HTTPS

Both platforms provide free SSL certificates automatically.
Your site will be served over HTTPS by default.

## CDN

Both platforms include global CDN:
- Vercel: Edge network (70+ locations)
- Netlify: CDN (multiple edge nodes)

Fast load times worldwide.
