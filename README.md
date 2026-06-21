# Leonard Johnson Agency Website

A React + Vite + Tailwind CSS website for the Leonard Johnson Insurance Agency.

## Getting Started

```bash
pnpm install
pnpm dev        # Start dev server at http://localhost:5173
pnpm build      # Build for production → dist/
pnpm preview    # Preview production build locally
```

## Audit Fixes Applied (June 2026)

- **Canonical Tag**: Fixed — now correctly points to `https://leonardjohnsoninsurance.com/` instead of a YouTube URL.
- **Schema Markup**: Added `LocalBusiness` + `InsuranceAgency` JSON-LD structured data for better local SEO.
- **Image Optimization**: Headshot compressed from 1.5 MB → 22 KB (WebP). Hero image from 200 KB → 82 KB (WebP).
- **Lovable Dev Badge**: Removed from production build.
- **Open Graph**: Added `og:url` tag for correct social sharing.
- **Apple Touch Icon**: Added for iOS home screen support.
- **Theme Color**: Added `theme-color` meta tag for browser chrome theming.
- **Accessibility**: Decorative images use `alt=""`. All interactive elements have accessible labels.
- **Trust Signals**: Footer now includes licensing info, NPN placeholder, address, and social media links.
- **Social Media Links**: Footer links to Facebook, Instagram, LinkedIn, and YouTube.

## Deployment

Deploy the `dist/` folder to any static host:
- **Cloudflare Pages** (recommended — already on Cloudflare)
- **Netlify**
- **Vercel**

> **Note:** Update the NPN (National Producer Number) in `src/App.tsx` footer section before deploying.
