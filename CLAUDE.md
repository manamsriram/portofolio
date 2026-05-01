# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. The site showcases projects, skills, and contact information in a modern, responsive design.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure
- `src/app/page.tsx` - Main portfolio page with hero, about, projects, and contact sections
- `src/app/layout.tsx` - Root layout with metadata and fonts
- `src/app/globals.css` - Global styles and Tailwind imports
- `public/` - Static assets (images, icons)

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS for utility-first styling
- **Language**: TypeScript for type safety
- **Fonts**: Geist Sans and Geist Mono via next/font/google

### Key Components
The portfolio is built as a single-page application with smooth scrolling navigation:
- **Navigation**: Fixed header with links to sections
- **Hero Section**: Introduction with call-to-action buttons
- **About Section**: Personal background, skills, and services
- **Projects Section**: Grid of featured projects with tags and links
- **Contact Section**: Contact information and social links
- **Footer**: Social media links and copyright

### Design Patterns
- Responsive design using Tailwind's responsive prefixes (sm:, md:, lg:)
- Dark mode support using Tailwind's dark mode utilities
- Gradient backgrounds and modern card layouts
- Smooth hover transitions and interactive elements

## Customization

### Personalization
Update the following in `src/app/page.tsx`:
- Name and title in hero section
- About me content and skills
- Project details (title, description, tags, links)
- Contact information (email, location, social links)
- Footer copyright and social media URLs

### Styling
- Modify colors using Tailwind's color palette
- Adjust spacing and layout using Tailwind's spacing utilities
- Add custom animations or transitions in globals.css

## Deployment

The site is ready for deployment on Vercel, Netlify, or any platform supporting Next.js:
- Build command: `npm run build`
- Output directory: `.next/`
- Static export can be configured in next.config.ts if needed

## Development Notes

- The site uses client-side navigation with smooth scrolling
- All components are server components by default (optimal for performance)
- Images should be optimized using Next.js Image component when added
- Consider adding error boundaries and loading states for production use