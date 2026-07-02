# Sri Ram Mannam - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

The development server will start at [http://localhost:3000](http://localhost:3000)

## 📋 Features

- **Modern Design**: Clean, professional layout with gradient backgrounds
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Built-in dark mode support
- **Fast Performance**: Optimized with Next.js 15 and React 19
- **Type Safety**: Full TypeScript support
- **SEO Friendly**: Proper metadata and semantic HTML

## 🎨 Sections

- **Hero**: Introduction with call-to-action buttons
- **About**: Personal background, skills, and expertise
- **Projects**: Showcase of featured projects with links
- **Contact**: Contact information and social media links
- **Footer**: Copyright and social links

## 🎯 Customization

### Personal Information

Update the following in `src/app/page.tsx`:

- Name and title in hero section
- About me content and skills
- Project details (title, description, tags, links)
- Contact information (email, location, social links)
- Footer copyright and social media URLs

### Styling

- Modify colors using Tailwind's color palette
- Adjust spacing and layout using Tailwind's spacing utilities
- Add custom animations or transitions in `globals.css`

## 🌐 Deployment

This portfolio is ready for deployment on:

- **Vercel**: Recommended for Next.js projects
- **Netlify**: Full support for Next.js
- **GitHub Pages**: Requires static export configuration
- **Any platform**: Supports Node.js and Next.js

### Static Export

To generate a static export, update `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
  // ... other config
}
```

## 📧 Contact

- **Email**: manamsriram@gmail.com
- **GitHub**: https://github.com/manamsriram
- **LinkedIn**: https://linkedin.com/in/srirammannam

---

**© 2026 Sri Ram Mannam. All rights reserved.**
