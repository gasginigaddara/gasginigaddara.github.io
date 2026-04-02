# Portfolio Data Management

This folder contains all portfolio project data organized by category. Each project is stored in JSON format for easy editing and maintenance.

## Folder Structure

```
portfolio-data/
├── trainer/
│   └── projects.json
├── researcher/
│   └── projects.json
├── consultant/
│   └── projects.json
├── academic/
│   └── projects.json
├── public-speaker/
│   └── projects.json
├── administrator/
│   └── projects.json
└── social-enthusiast/
    └── projects.json
```

## How to Add a New Project

1. Open the appropriate category folder (e.g., `trainer/` for training projects)
2. Edit the `projects.json` file
3. Add a new project object to the array following the format below
4. Save the file
5. Refresh the website to see your changes

## JSON Format

Each project entry should follow this structure:

```json
{
  "id": 31,
  "category": "trainer",
  "title": "Your Project Title",
  "description": "A brief description of the project (keep under 150 characters for best display)",
  "link": "https://example.com/your-project-link",
  "timestamp": "2025-12-06T10:30:00",
  "image": "https://example.com/image.jpg"
}
```

### Field Explanations

- **id**: A unique number for the project (use the next available number)
- **category**: Must match the folder name exactly:
  - `"trainer"`
  - `"researcher"`
  - `"consultant"`
  - `"academic"`
  - `"public-speaker"`
  - `"administrator"`
  - `"social-enthusiast"`
- **title**: The project name/topic (displayed on the card)
- **description**: Short description (shown on hover)
- **link**: URL to the project source (opens in new tab when clicked)
- **timestamp**: Date and time in ISO 8601 format `YYYY-MM-DDTHH:MM:SS`
  - Example: `"2025-12-06T14:30:00"` = December 6, 2025 at 2:30 PM
- **image**: URL to the project image
  - For social media posts: Right-click the image → "Copy Image Address" and paste here
  - For custom images: Upload to the `Images/` folder and use the relative path
  - **To use category default image**: Leave this field empty (`""`) or omit it. The system will automatically use the correct photo from `Images/default/` based on the category.

## Timestamp Format

The timestamp determines the order of projects (newest first). Format: `YYYY-MM-DDTHH:MM:SS`

Examples:
- `"2025-12-06T10:30:00"` = December 6, 2025 at 10:30 AM
- `"2025-11-15T14:00:00"` = November 15, 2025 at 2:00 PM
- `"2025-01-20T09:15:00"` = January 20, 2025 at 9:15 AM

## Tips

- Keep descriptions concise (under 150 characters) for best display
- Use high-quality images (recommended: at least 800px wide)
- Test your JSON syntax using a JSON validator before saving
- Make sure each project has a unique ID number
- The website shows the 6 most recent projects per category
- Use "View All" button to see all projects in a modal

## Example: Adding a New Project

1. Open `portfolio-data/trainer/projects.json`
2. At the end of the array (before the closing `]`), add a comma and your new project:

```json
  ,
  {
    "id": 32,
    "category": "trainer",
    "title": "New Training Workshop",
    "description": "Description of the new workshop",
    "link": "https://example.com/workshop",
    "timestamp": "2025-12-10T10:00:00",
    "image": "https://images.unsplash.com/photo-12345?w=800"
  }
```

3. Save the file and refresh your website 
