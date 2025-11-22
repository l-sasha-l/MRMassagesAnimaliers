# Architecture Documentation

## Clean Architecture Principles

This project follows clean architecture principles for Astro applications:

1. **Component Separation**: UI components are separated from sections
2. **Single Responsibility**: Each component has one clear purpose
3. **Data-Driven**: Components receive data through props
4. **Reusability**: UI components can be reused across sections
5. **Maintainability**: Easy to update and extend

## Component Hierarchy

```
index.astro (Main Page)
├── Layout.astro (Base Layout)
│   └── Global Styles & Meta
└── Sections
    ├── Hero
    │   └── Navigation
    ├── Presentation
    │   └── FeatureCard (x3)
    ├── Pricing
    │   └── PricingCard (x2)
    ├── Maps
    ├── Contact
    │   └── ContactForm
    ├── Feedback
    │   ├── FeedbackCard (x3)
    │   └── FeedbackForm
    ├── Legal
    └── Footer
```

## Component Types

### Layouts
- **Purpose**: Provide base HTML structure and global styles
- **Location**: `src/layouts/`
- **Example**: `Layout.astro`

### Sections
- **Purpose**: Large page sections that compose the main layout
- **Location**: `src/components/sections/`
- **Characteristics**:
  - Self-contained
  - Manage their own data
  - Use UI components for rendering
  - Include section-specific styles

### UI Components
- **Purpose**: Reusable components used across sections
- **Location**: `src/components/ui/`
- **Characteristics**:
  - Accept props for customization
  - Highly reusable
  - Single responsibility
  - Minimal dependencies

## Data Flow

```
index.astro
    ↓ (imports)
Sections (e.g., Pricing.astro)
    ↓ (defines data)
const dogsPricing = [...]
    ↓ (passes as props)
UI Components (e.g., PricingCard.astro)
    ↓ (renders with data)
Final HTML
```

## Adding New Components

### Adding a UI Component

1. Create file in `src/components/ui/ComponentName.astro`
2. Define props interface:
```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---
```
3. Add markup and styles
4. Import and use in sections

### Adding a Section

1. Create file in `src/components/sections/SectionName.astro`
2. Define data (arrays, objects, etc.)
3. Import required UI components
4. Compose section using data and components
5. Add section-specific styles
6. Import in `index.astro`

## Styling Strategy

### Global Styles
- Defined in `Layout.astro`
- CSS variables for theme colors
- Base element styles
- Typography

### Component Styles
- Scoped to each component
- Use CSS variables for colors
- Mobile-first responsive design
- No global class pollution

## File Naming Conventions

- **Layouts**: `Layout.astro`
- **Sections**: `PascalCase.astro` (e.g., `Presentation.astro`)
- **UI Components**: `PascalCase.astro` (e.g., `FeatureCard.astro`)
- **Pages**: `lowercase.astro` (e.g., `index.astro`)

## TypeScript Integration

Components use TypeScript for prop validation:

```astro
---
interface Props {
  title: string;
  items: Array<{
    service: string;
    price: string;
  }>;
}

const { title, items } = Astro.props;
---
```

## Best Practices

1. **Keep components small**: Each component should do one thing well
2. **Use props for data**: Pass data from parent to child components
3. **Avoid duplication**: Extract common patterns into UI components
4. **Consistent styling**: Use CSS variables for theme colors
5. **Responsive design**: Mobile-first approach
6. **Semantic HTML**: Use appropriate HTML elements
7. **Accessibility**: Include labels, alt text, ARIA attributes

## Extending the Application

### Adding a New Section

1. Create new section component in `src/components/sections/`
2. Create any required UI components in `src/components/ui/`
3. Import section in `index.astro`
4. Add navigation link in `Navigation.astro`
5. Update smooth scroll script if needed

### Adding Form Backend

1. Choose a service (Formspree, EmailJS, etc.)
2. Update form components:
   - `src/components/ui/ContactForm.astro`
   - `src/components/ui/FeedbackForm.astro`
3. Replace alert handlers with API calls

### Adding Map Integration

1. Get API key for mapping service
2. Update `src/components/sections/Maps.astro`
3. Add script for map initialization
4. Replace placeholder div with map container

## Performance Considerations

- **Image optimization**: Use Astro's Image component for images
- **Code splitting**: Astro automatically splits code by route
- **CSS scoping**: Component styles are automatically scoped
- **Static generation**: Site is pre-rendered for fast loading
- **Video optimization**: Ensure video files are compressed

## Testing Strategy

1. **Visual testing**: Test each component in isolation
2. **Responsive testing**: Test on different screen sizes
3. **Browser testing**: Test on Chrome, Firefox, Safari, Edge
4. **Accessibility testing**: Use browser dev tools and screen readers
5. **Performance testing**: Use Lighthouse for performance metrics
