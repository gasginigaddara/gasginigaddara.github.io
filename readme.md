# G.A.S. Ginigaddara - Professional Portfolio

This repository contains the source code for the professional portfolio of Professor G.A.S. Ginigaddara, highlighting her accomplishments as an Academic, Researcher, Consultant, Public Speaker, Administrator, Trainer, and Social Enthusiast.

## Live Website

The live portfolio is hosted via GitHub Pages and is accessible at:
👉 **[gasginigaddara.github.io](https://gasginigaddara.github.io)**

## Project Structure

The project is built using semantic HTML5, CSS3, and JavaScript, ensuring a lightweight and performant single-page application experience.

### Directory Layout

- `index.html`: The main entry point containing the website's DOM structure.
- `styles.css`: The primary stylesheet, including global styling and responsive layouts.
- `script.js`: Contains custom JavaScript logic for interactivity, sticky navigation, and modal management.
- `portfolio-loader.js`: Responsible for asynchronously fetching and rendering project data dynamically.
- `img/`: Contains all localized image assets, categorized properly with lowercase snake/kebab case filenames.
- `portfolio-data/`: Contains individual JSON configuration files for each portfolio category (e.g., `academic/projects.json`, `trainer/projects.json`). This structured data format allows the frontend to be scalable and data-driven.

## Key Features

- **Dynamic Data Routing**: Uses Fetch API to read and display project entries dynamically from structured JSON files inside `portfolio-data/`.
- **MixItUp Integration**: A smooth, visually animated grid layout using `mixitup.js` to filter and sort projects based on their designated category tags.
- **Swiper Carousel**: Includes a dynamic touch-friendly slider for projects, testimonials, and mobile device rendering.
- **Lighthouse Optimized**: Implements performance best practices like explicit DOM `<link rel="preload">`, layout shift (CLS) prevention dimensions, asynchronous deferred scripts, and a localized webmanifest configuration.
- **Responsive Design**: Designed Mobile-first leveraging CSS Flexbox, Grid, and the Bootstrap framework.

## Local Development

If you wish to test or develop the portfolio locally, you must use a standard web server. Opening `index.html` via the `file://` protocol directly in a browser will throw CORS (Cross-Origin Resource Sharing) policy errors because the Fetch API restricts local directory traversing.

Using Python 3, you can swiftly start a local web server:

```bash
# Start a local static HTTP server
python3 -m http.server 8080

# Navigate to http://localhost:8080 in your browser
```

## Maintenance & Updates

To add new professional highlights to the portfolio, simply add a new JSON object entry into the relevant `portfolio-data/<category>/projects.json` file.

Format Example:
```json
{
    "title": "New Research Publication",
    "description": "Short summary of the publication.",
    "image": "img/projects/research_thumb.jpg",
    "link": "https://link-to-publication.com",
    "category": "researcher",
    "timestamp": "2026-03-10T00:00:00Z"
}
```

The `portfolio-loader.js` script will automatically map this to the UI during the next page load.

## License

All visual images, content, and branding are the property of G.A.S. Ginigaddara. All Rights Reserved.
