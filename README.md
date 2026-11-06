# Enchanted Code

Marketing site for Enchanted Code, a web design and development studio. A single scrolling page covers services, approach, featured work, and testimonials, with dialogs for contact, the studio story, and project details.

Built with React 19 and Vite 6. Content for services, projects, and testimonials lives in `src/data.js`.

## Requirements

- Node.js 20 or newer

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Document shell, meta description, fonts |
| `src/main.jsx` | React entry |
| `src/App.jsx` | Page sections and dialog state |
| `src/data.js` | Services, projects, and testimonials |
| `src/components/` | Header, sections, and dialogs |
| `src/assets/` | Logo, icons, and section art |
| `public/favicon.svg` | Favicon |

Sections, in order: hero, services, approach, featured work, testimonials, and a closing call to action.

The contact form validates name, email, and message in the browser and shows a confirmation. It does not send the message anywhere.
