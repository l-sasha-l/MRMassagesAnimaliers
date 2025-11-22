# Massages Animalier - Single Page Application

A professional single-page website for animal massage services (dogs and horses) built with Astro and clean architecture principles.

## Features

- Video background header
- Presentation section
- Pricing section (separate for dogs and horses)
- Service area maps
- Contact form
- Feedback/testimonials section
- Legal notice
- Responsive design
- Custom color scheme (#785444 and #fffcf4)
- Component-based architecture
- TypeScript support

## Project Structure

```
src/
├── components/
│   ├── sections/          # Main page sections
│   │   ├── Hero.astro
│   │   ├── Presentation.astro
│   │   ├── Pricing.astro
│   │   ├── Maps.astro
│   │   ├── Contact.astro
│   │   ├── Feedback.astro
│   │   └── Legal.astro
│   └── ui/                # Reusable UI components
│       ├── Navigation.astro
│       ├── FeatureCard.astro
│       ├── PricingCard.astro
│       ├── ContactForm.astro
│       ├── FeedbackCard.astro
│       ├── FeedbackForm.astro
│       └── Footer.astro
├── layouts/
│   └── Layout.astro       # Base layout with global styles
└── pages/
    └── index.astro        # Main page composition
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your video file:
- Place your header background video in `public/video/hero-video.mp4`
- Supported formats: MP4, WebM

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm preview
```

## Customization

### Update Contact Information

Edit `src/components/sections/Contact.astro`:
- Modify the `contactDetails` array with your phone, email, and hours

### Update Service Areas

Edit `src/components/sections/Maps.astro`:
- Update the `serviceAreas` array with your actual coverage zones

### Update Pricing

Edit `src/components/sections/Pricing.astro`:
- Modify `dogsPricing` and `horsesPricing` arrays with your rates

### Update Legal Notice

Edit `src/components/sections/Legal.astro`:
- Update the `legalSections` array with your business information

### Update Testimonials

Edit `src/components/sections/Feedback.astro`:
- Modify the `testimonials` array to add/edit customer reviews

### Update Features

Edit `src/components/sections/Presentation.astro`:
- Customize the `features` array to highlight your expertise

### Customize Navigation

Edit `src/components/ui/Navigation.astro`:
- Modify the `navLinks` array to add/remove menu items

### Add Map Integration

To add an interactive map, edit `src/components/sections/Maps.astro`:

1. Get a Google Maps API key or use OpenStreetMap
2. Replace the `.map-placeholder` div
3. Add the map integration code

Example with Google Maps:
```astro
<div id="map" style="height: 400px;"></div>
<script>
  // Add Google Maps initialization code
</script>
```

## Component Architecture

### Sections
Large page sections that compose the main layout. Each section is self-contained and manages its own data.

### UI Components
Reusable components that can be used across different sections. They accept props for customization.

Example:
```astro
<PricingCard 
  title="Massages pour Chiens" 
  items={dogsPricing} 
/>
```

## Video Requirements

For best performance, ensure your header video:
- Is optimized for web (compressed)
- Has a reasonable file size (< 10MB recommended)
- Is in MP4 format
- Has a 16:9 aspect ratio
- Is muted (autoplay requirement)

## Form Handling

The contact and feedback forms currently use JavaScript alerts. To make them functional:

1. Set up a backend API endpoint
2. Update the form submission handlers in:
   - `src/components/ui/ContactForm.astro`
   - `src/components/ui/FeedbackForm.astro`

3. Consider using services like:
   - Formspree
   - EmailJS
   - Netlify Forms
   - Your own API

## Deployment

This Astro site can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Color Scheme

- Primary: #785444 (Brown)
- Secondary: #fffcf4 (Cream)

These colors are defined as CSS variables in `src/layouts/Layout.astro`:
```css
:root {
  --primary-color: #785444;
  --secondary-color: #fffcf4;
  --text-dark: #333333;
  --text-light: #666666;
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Video autoplay supported in most modern browsers

## License

All rights reserved.
