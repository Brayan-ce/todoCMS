# WhoresHub Project Summary

## Project Structure
```
prueba/
├── backend/          # Backend (Express API) - mostly empty, needs setup
├── frontend/         # Next.js 16 App Router frontend
│   ├── app/
│   │   ├── layout.js           # Root layout (html, body, ShellProvider)
│   │   ├── ClientShell.js       # Client shell (header, sidebar, footer wrapper)
│   │   ├── shell.module.css
│   │   ├── (main)/             # Main site route group (with shell)
│   │   │   ├── layout.js        # ClientShell wrapper
│   │   │   ├── page.js          # Home page
│   │   │   ├── videos/[...slug]/page.js  # Video detail page
│   │   │   ├── latest-updates/page.js    # Listing page (35 videos)
│   │   │   ├── most-viewed/page.js       # Listing page
│   │   │   ├── top-rated/page.js         # Listing page
│   │   │   ├── categories/
│   │   │   │   ├── page.js               # All categories
│   │   │   │   └── [...slug]/page.js     # Dynamic category page
│   │   │   ├── tags/
│   │   │   │   ├── page.js               # All tags
│   │   │   │   └── [...slug]/page.js     # Dynamic tag page
│   │   │   ├── albums/
│   │   │   │   ├── top-rated/page.js     # Albums listing
│   │   │   │   ├── most-viewed/page.js   # Albums listing
│   │   │   │   └── [...slug]/page.js     # Album viewer (photos, details)
│   │   │   └── models/
│   │   │       ├── page.js               # Model grid (24 models, 6 cols)
│   │   │       └── [...slug]/page.js     # Model profile page
│   │   └── (auth)/             # Auth route group (no shell)
│   │       ├── layout.js
│   │       ├── login/page.js
│   │       └── signup/page.js
│   ├── _PAGES/                # Page components
│   │   ├── main/
│   │   │   ├── Home/          # Home page component
│   │   │   │   ├── Home.js
│   │   │   │   ├── servidor.js
│   │   │   │   └── componentes/
│   │   │   │       ├── VideoSection/  # Video grid section
│   │   │   │       ├── VideoCard/     # Video card (5 cols responsive)
│   │   │   │       ├── CategorySection/
│   │   │   │       ├── CategoryCard/
│   │   │   │       ├── TagCloud/
│   │   │   │       ├── Tag/          # Tag chip component
│   │   │   │       ├── Pagination/   # Pagination with Jump To
│   │   │   │       ├── Dropdown/
│   │   │   │       └── Button/
│   │   │   ├── Videos/        # Video detail page
│   │   │   │   ├── VideoPage.js
│   │   │   │   ├── VideoPage.module.css
│   │   │   │   ├── servidor.js
│   │   │   │   └── componentes/
│   │   │   │       ├── VideoPlayer/  # Video player with controls
│   │   │   │       ├── VideoInfo/    # Title, metadata, uploader, tags
│   │   │   │       └── RelatedVideoCard/
│   │   │   ├── Albums/
│   │   │   │   ├── AlbumsPage.js     # Albums grid
│   │   │   │   ├── AlbumsPage.module.css
│   │   │   │   ├── AlbumViewer.js    # Album photo viewer
│   │   │   │   ├── AlbumViewer.module.css
│   │   │   │   └── componentes/
│   │   │   │       └── AlbumCard.js  # Album card component
│   │   │   └── Models/
│   │   │       ├── ModelsPage.js     # Models grid
│   │   │       ├── ModelsPage.module.css
│   │   │       ├── ModelProfile.js   # Model profile page
│   │   │       ├── ModelProfile.module.css
│   │   │       └── componentes/
│   │   │           ├── ModelCard.js
│   │   │           └── ModelVideoCard.js
│   │   ├── auth/
│   │   │   ├── Login/    # Login modal design
│   │   │   └── Signup/   # Signup modal design
│   │   └── layout/
│   │       └── main/
│   │           ├── Header/
│   │           │   ├── Header.js
│   │           │   ├── Header.module.css
│   │           │   └── componentes/
│   │           │       └── SearchDropdown.js  # Autocomplete search
│   │           ├── Navbar/
│   │           │   ├── Navbar.js      # Main nav with dropdowns
│   │           │   ├── Navbar.module.css
│   │           │   └── componentes/
│   │           │       ├── VideoDropdown.js    # Small dropdown
│   │           │       ├── CategoriesDropdown.js  # Full-width grid
│   │           │       ├── TagsDropdown.js    # Full-width grid 8 cols
│   │           │       ├── AlbumsDropdown.js  # Small dropdown
│   │           │       └── ModelsDropdown.js  # Full-width grid 8 cols
│   │           ├── Sidebar/
│   │           │   ├── Sidebar.js
│   │           │   └── Sidebar.module.css
│   │           └── Footer/
│   │               ├── Footer.js
│   │               └── Footer.module.css
│   ├── _EXTRAS/
│   │   ├── AgeModal/         # Age verification modal
│   │   ├── Icons/Icons.js    # SVG sprite icons
│   │   ├── Imagenes/Imagenes.js  # Image wrapper (next/image)
│   │   ├── Logo/Logo.js     # SVG logo component
│   │   └── Shell/ShellContext.js  # Dark mode + sidebar context
│   ├── data/
│   │   ├── content.js       # All site data (videos, categories, models, etc.)
│   │   └── images.js        # 38 base64 image data URIs
│   └── styles/
│       └── globals.css      # Global CSS (reset, dark mode vars)
```

## Key Architecture Decisions

### Routing: Route Groups
- `(main)/` - Pages with shell layout (header, navbar, sidebar, footer)
- `(auth)/` - Pages without shell (login, signup)

### CSS: All px converted to rem (base 16px)
### Responsive Breakpoints: 1250px, 991px, 768px, 639px, 425px
### Images: `@/_EXTRAS/Imagenes/Imagenes` wrapper for next/image
### Icons: `@/_EXTRAS/Icons/Icons` SVG sprite component
### Logo: `@/_EXTRAS/Logo/Logo` SVG component (used by Header & Footer)

## Current State

### Working Routes (15 total)
- `/` - Home with sections, categories, tags, pagination
- `/latest-updates/`, `/most-viewed/`, `/top-rated/` - 35 videos (7×5)
- `/categories/`, `/categories/[name]/` - Dynamic categories
- `/tags/`, `/tags/[name]/` - Dynamic tags with "Tagged with" title
- `/albums/top-rated/`, `/albums/most-viewed/` - Albums 5×5 grid
- `/albums/[slug]/` - Album viewer with photos, details, related
- `/models/` - Models grid 6×4 (24 models)
- `/models/[slug]/` - Model profile with hero, videos, tags
- `/login/`, `/signup/` - Auth pages (no shell)
- `/videos/[...slug]/` - Video detail page

### Navbar Dropdowns
- **Videos**: Small dropdown (Latest, Most Viewed, Top Rated)
- **Categories**: Full-width grid 6 cols with thumbnails
- **Tags**: Full-width grid 8 cols with counts
- **Albums**: Small dropdown (Top Rated, Most Viewed)
- **Models**: Full-width grid 8 cols (1 row preview) + "All Models"
- **Theporndude, LIVE SEX, Telegram, Premium**: "Coming soon!" alert

### Features
- Dark mode toggle (ShellContext + localStorage)
- Age verification modal (localStorage)
- Search autocomplete (categories + models)
- Pagination with Jump To
- Dynamic active nav state (based on pathname)
- Hover + click dropdowns with ::before bridge
- Responsive grids (all pages)

## Backend (prueba/backend/)
Currently empty - just a package.json. Needs Express API setup for user auth, video data, etc.

## Build Commands
- `cd frontend && npx next build` (only with explicit permission)

## Rules (AGENTS.md)
- Do NOT run `npm run build`, `npm run dev`, or `npm install` without explicit permission
