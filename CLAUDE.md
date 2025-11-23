# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page Astro application for "MR Massages Animaliers" - a professional animal massage service website for dogs and horses. The site features a video background header, service sections, interactive maps with distance calculator, contact forms, and testimonials.

**Tech Stack**: Astro 5.16, TypeScript, Leaflet (maps), Resend (email API)

## Essential Commands

```bash
# Development
npm run dev                 # Start dev server at localhost:4321

# Production
npm run build              # Build for production (outputs to dist/)
npm run preview            # Preview production build locally

# Utility
npm run astro              # Run Astro CLI commands
```

## Architecture

This project follows clean architecture principles with strict component separation:

### Component Structure
```
src/
├── layouts/Layout.astro          # Base layout with global styles and SEO
├── pages/index.astro             # Main page composition
├── components/
│   ├── sections/                 # Large self-contained page sections
│   │   ├── Header.astro          # Video background hero
│   │   ├── Presentation.astro    # Feature cards
│   │   ├── Pricing.astro         # Dog and horse pricing tables
│   │   ├── Maps.astro            # Leaflet map + distance calculator
│   │   ├── Contact.astro         # Contact info + form
│   │   ├── Feedback.astro        # Testimonials display
│   │   └── Legal.astro           # Legal notices
│   └── ui/                       # Reusable UI components
│       ├── Navigation.astro
│       ├── ContactForm.astro     # Form with Resend integration
│       ├── PricingCard.astro
│       ├── FeatureCard.astro
│       ├── FeedbackCard.astro
│       ├── FeedbackForm.astro
│       └── Footer.astro
```

### Data Flow Pattern
Sections define their own data (arrays, objects) and pass it to UI components via props:
```astro
<!-- In sections/Pricing.astro -->
const dogsPricing = [{ service: "...", price: "..." }]
<PricingCard title="Chiens" items={dogsPricing} />
```

### Styling Architecture
- **Global styles**: CSS variables and base styles in `Layout.astro`
- **Component styles**: Scoped `<style>` blocks in each component
- **Theme colors**: 
  - Primary: `#785444` (brown)
  - Secondary: `#fffcf4` (cream)
  - Accent: `#d4a373`
- **Design system**: Mobile-first responsive, WCAG 2.1 AA compliant

## Email API Integration

Contact form uses **Resend** API via Vercel serverless function:
- API endpoint: `/api/send-email` (Vercel function at `api/send-email.ts`)
- Sends two emails:
  1. Notification to business owner (`sasha.laigle@gmail.com`)
  2. Confirmation to customer
- Requires `RESEND_API_KEY` environment variable
- Form located in: `src/components/ui/ContactForm.astro`

## Maps & Distance Calculator

Interactive map system using Leaflet + French address API:
- Base location: Boutier-Saint-Trojan (Cognac area)
- **Address search**: Uses `api-adresse.data.gouv.fr` (French government API)
- **Route calculation**: Uses OSRM (OpenStreetMap routing)
- **Pricing logic**: First 20km free, then €0.50/km
- Modal-based calculator with real-time distance calculation
- All logic in: `src/components/sections/Maps.astro`

## Key Features & Implementation Details

### Accessibility (WCAG 2.1 AA)
- Skip-to-content link (keyboard accessible)
- ARIA labels and roles throughout
- Screen reader only classes (`.sr-only`)
- Focus-visible styles for keyboard navigation
- Respects `prefers-reduced-motion`
- Contrast ratios meet AA standards

### Smooth Scrolling
Navigation uses hash links (`#contact`, `#pricing`, etc.) with smooth scroll JavaScript in `src/pages/index.astro` that accounts for fixed nav height (80px offset).

### SEO & Meta
Comprehensive SEO setup in `Layout.astro`:
- Open Graph tags
- Twitter Card tags
- Schema.org LocalBusiness structured data
- French language (`lang="fr"`)
- Sitemap at `public/sitemap.xml`

### Static Assets
- Fonts: Custom Montserrat variable fonts in `public/fonts/`
- Icons: SVG icons in `public/icones/`
- Video: Hero background at `public/video/` (MP4 format)
- Images: Service images in `public/images/`

## Important Conventions

1. **Never create new files unless absolutely necessary** - Always prefer editing existing components
2. **TypeScript Props**: All components use typed Props interfaces
3. **File naming**: 
   - Sections/UI: PascalCase (e.g., `ContactForm.astro`)
   - Pages: lowercase (e.g., `index.astro`)
4. **No emojis** unless explicitly requested
5. **Component scoping**: Keep components focused on single responsibility
6. **Data location**: Section components own and define their data

## Content Updates

To update business content, edit data arrays in section files:
- **Pricing**: `src/components/sections/Pricing.astro` (dogsPricing, horsesPricing)
- **Features**: `src/components/sections/Presentation.astro` (features array)
- **Testimonials**: `src/components/sections/Feedback.astro` (testimonials array)
- **Contact info**: `src/components/sections/Contact.astro` (contactDetails array)
- **Legal notices**: `src/components/sections/Legal.astro` (legalSections array)
- **Navigation**: `src/components/ui/Navigation.astro` (navLinks array)

## Deployment

Currently deployed on Vercel (required for `/api/send-email` serverless function):
- Automatic builds from Git
- Environment variable `RESEND_API_KEY` must be set in Vercel dashboard
- Static assets served from `dist/` after build

## Related Documentation

- Full architecture details: `ARCHITECTURE.md`
- Setup instructions: `README.md`
- Recent commits show accessibility improvements and email integration
