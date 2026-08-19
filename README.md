# IEEE Curtin University Colombo Student Branch Website

Official website for the IEEE Student Branch of Curtin University Colombo, built with [Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Start the development server                 |
| `npm run build`      | Production build + sitemap generation        |
| `npm run start`      | Serve the production build                   |
| `npm run lint`       | Run ESLint                                   |
| `npm run typecheck`  | Run the TypeScript compiler (no emit)        |
| `npm run fetch-gallery` | Regenerate `app/data/gallery.ts` from Cloudinary |

## Deployment

This project deploys to **Vercel** using Vercel's Git integration. Pushes to `main` deploy to production; pull requests get preview deployments. The build command is `npm run build` (configured in `vercel.json`).

### Required environment variables (Vercel project settings)

| Variable                        | Purpose                                             |
| ------------------------------- | --------------------------------------------------- |
| `RESEND_API_KEY`                | Resend API key used by the `/api/contact` endpoint  |
| `RESEND_FROM`                   | Verified sender email for contact form emails       |
| `RESEND_TO`                     | Recipient email for contact form submissions        |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for gallery image URLs     |

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` has a built-in fallback (`dtlt5iw3v`), so it is only required if a different Cloudinary account is used.

The contact form on the home page and `/contact` posts to the serverless function at `/api/contact`, which validates the input and sends an email via Resend. `RESEND_FROM` must be a domain verified in the Resend dashboard (or use the default `onboarding@resend.dev` sandbox for testing).

## Project Structure

- `app/` — App Router pages, components, data, and the `/api/contact` route
- `app/data/` — Static content (events, gallery, committee)
- `app/components/ui/` — Reusable UI primitives
- `public/` — Static assets (images, membership guide)
- `scripts/` — Admin helper scripts (Cloudinary gallery fetch)

Sitemap and robots.txt are generated automatically by `next-sitemap` during `npm run build` and are not committed to the repository.