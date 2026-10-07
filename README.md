# Rajiv Madan CPA – Website (React + Tailwind CSS)

Static frontend for the Rajiv Madan CPA accounting practice.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Production build

```bash
npm run build     # output goes to /dist
npm run preview   # preview the production build
```

## Folder structure

```
rajiv-madan-cpa/
├── index.html              # Google Fonts (DM Serif Display + Inter)
├── tailwind.config.js      # navy / brand(teal) colors, fonts, shadows
├── src/
│   ├── main.jsx
│   ├── App.jsx             # page sections in order
│   ├── index.css           # Tailwind + small helper classes
│   ├── data/
│   │   └── siteData.js     # ALL static text, phone, lists – edit here
│   └── components/
│       ├── TopBar.jsx
│       ├── Navbar.jsx      # sticky, with mobile menu
│       ├── Logo.jsx
│       ├── Hero.jsx
│       ├── CoreServices.jsx
│       ├── WhatWeDo.jsx
│       ├── Capabilities.jsx
│       ├── Advantages.jsx  # Firm Advantages + Testimonial
│       ├── CallToAction.jsx
│       ├── Footer.jsx
│       └── Icon.jsx        # lucide icons + color maps
```

To change any text, phone number or list item, edit `src/data/siteData.js` only.
