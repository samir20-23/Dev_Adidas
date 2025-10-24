 
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
- Uses `load.css`.
- Clean layout.

### `/home`
- Main home page with all homepage content.
- Uses `home.css`.
- Includes optional navbar, footer, and menubar (like in React).

### `/product/[id]`
- Dynamic product detail page.
- Uses inline or page-level CSS.
- Buttons for back, favorite, cart.

---

## Components

- **Navbar:** `components/navbar.tsx`
- **Footer:** `components/footer.tsx`
- **Menubar:** `components/menubar.tsx`
- **Loading:** `components/loading.tsx`
- **Logo Components:** `components/logo_comp/logo.tsx`, `line_loader.tsx`

All components use CSS from `components/css_comp`.

---

## Styling

- Page-specific CSS lives alongside pages (`start.css`, `load.css`, `home.css`).
- Shared component CSS lives in `css_comp/`.
- Font Awesome loaded via CDN in `layout.tsx`.
- Lucide Icons used for buttons/icons.

---

## Internationalization

- Uses `i18next` for language support.
- Translation files located in `i18n/`.
- Access with `useTranslation()` hook in components or pages.

---

## Theme

- `ThemeContext` provides dark/light mode support.
- Wraps `MainLayout` in `layout.tsx`.
- Accessible via `useTheme()` in any component.

---

## Development

### Install dependencies
```bash
npm install
# or
yarn install
````

### Run development server

```bash
npm run dev
# or
yarn dev
```

* Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for production

```bash
npm run build
npm run start
```

---

## Notes

* **Do not modify CSS or div structure** — visual design must match the React version.
* Client-only pages must have `"use client"` at the top.
* If using external scripts or dynamic values, ensure they are compatible with SSR to avoid hydration errors.
* Disable browser extensions like Grammarly during development to avoid hydration mismatch warnings.

---

## References

* [Next.js Documentation](https://nextjs.org/docs)
* [i18next](https://www.i18next.com/)
* [Lucide React Icons](https://lucide.dev/)
* [Font Awesome](https://fontawesome.com/)

 