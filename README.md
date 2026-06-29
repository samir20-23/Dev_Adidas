 
# Next-DevaAdidas

A Next.js version of the original React project `dev_adidas`.  
This project replicates the React app design and functionality using Next.js 16 with Turbopack.  

---

## Project Overview

- **Framework:** Next.js 16 (Turbopack)
- **Language:** TypeScript / React
- **Styling:** CSS (included via CSS modules or styled-jsx)
- **Font & Icons:** Font Awesome, Lucide Icons
- **Internationalization:** i18next
- **Theme:** Custom ThemeContext
- **Routing:** Next.js App Router (`app` directory)
- **Structure:** Clean page-based routing with layouts

The Next.js version is designed to exactly match the React version design and layout, with the following rules:

1. **Do not change CSS or visual design**.  
2. Client navigation replaces React Router navigation.  
3. Pages may have client-only logic (`"use client"`), but server components remain static.  
4. Navbar, Footer, and Menubar appear only on designated pages, like in the original React app.

---

## Project Structure

```

next-devadidas/
├─ app/
│  ├─ start/
│  │  ├─ page.tsx
│  │  └─ start.css
│  ├─ load/
│  │  ├─ page.tsx
│  │  └─ load.css
│  ├─ home/
│  │  ├─ page.tsx
│  │  └─ home.css
│  ├─ product/
│  │  └─ [id]/
│  │     └─ page.tsx
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ navbar.tsx
│  ├─ footer.tsx
│  ├─ menubar.tsx
│  ├─ loading.tsx
│  └─ logo_comp/
│     ├─ logo.tsx
│     └─ line_loader.tsx
├─ contexts/
│  └─ ThemeContext.tsx
├─ css_comp/
│  ├─ authFooter.css
│  ├─ loading.css
│  └─ logo.css
├─ i18n/
│  └─ i18n.ts
├─ public/
│  └─ assets/
│     └─ (images, icons, etc.)
├─ globals.css
└─ README.md

````

---

## Pages

### `/start`
- Client page with a button to navigate to `/load`.
- Uses `start.css`.
- Clean layout (no navbar, no footer, no menubar).

### `/load`
- Loading animation page with a 3-second timeout before redirecting to `/home`.
 