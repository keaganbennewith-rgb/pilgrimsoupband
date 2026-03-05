# Pilgrim Soup Official Website

This is the static website codebase for the South African rap-rock band **Pilgrim Soup**.

## Architecture & Technology
- HTML5 (Semantic, SEO optimized)
- Vanilla CSS3 (CSS Variables, Flexbox, CSS Grid)
- Vanilla JavaScript (Interactions)
- Mobile-first responsive design
- Google Fonts (`Outfit` for headings, `Inter` for body text)

## File Structure
```text
Pilgrim-Soup-Website/
├── index.html       # The single page application structure
├── css/
│   └── style.css    # All styling rules, design variables
├── js/
│   └── main.js      # Mobile menu, scroll behaviors, bio copy
└── README.md        # This file
```

## How to Update Content

### Modifying the Hero Background Image / Video
Open `css/style.css` and locate `.hero-bg-image`. You can replace the `background: url(...)` with an actual band photo URL.
Alternatively, to use a background video, go to `index.html` line `47`, uncomment the `<video>` element, and provide the link to an actual `.mp4` file in the `<source src="...">`.

### Updating Embedded YouTube Videos
In `index.html`, locate the `<!-- Videos Section -->` (around line `107`).
Replace the `<div class="video-item">...</div>` blocks with actual YouTube `<iframe>` embed codes extracted from YouTube (Share > Embed). Keep the responsive styling by placing the iframe inside a `<div class="video-wrapper">`.

### Adding Live Shows
In `index.html` under the `<!-- Shows Section -->` (around line `131`), uncomment Option 1.
Create a new `<div class="show-item">` for each new show, updating the date, location, venue, and ticket link appropriately. Hide the `.empty-state` container if shows are present.

### Replacing Media Kit Assets
In the `<!-- Media Kit Section -->` (around line `180`), replace the `#` anchors with the actual `.zip`/`.pdf` file paths. Make sure these target valid files on your server so Promoters can easily download them.

## Local Development
To run this site locally:
1. Since we are using basic HTML/CSS/JS, simply double-click the `index.html` file to run it in your browser.
2. For testing functionality like the Copy Bio button properly, it is best to run it using a local server (e.g., Live Server extension in VSCode, or `npx http-server` via terminal).

## Deployment
Upload the contents of the `Pilgrim-Soup-Website` folder directly to any static web host, such as:
- Vercel
- Netlify
- GitHub Pages
- Hostinger / Namecheap CPanel (Copy files into the `public_html` directory).
