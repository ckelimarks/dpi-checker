# Print-Ready File Validator

A client-side file validation tool that helps Creative Fabrica's POD sellers validate their design files against platform-specific print requirements before uploading.

## Overview

This tool serves Creative Fabrica's monetization-focused POD sellers who sell designs via Printful/Printify. It validates files against platform-specific requirements and provides prescriptive explanations to help users understand print readiness.

## Key Features

### 1. Platform-Specific Validation
- **Printful**: 150+ DPI acceptable (warns <300), 200 MB max
- **Printify**: 300+ DPI required, 100 MB max
- **General**: 300+ DPI standard requirement

### 2. Multi-Size DPI Display (Key Differentiator)
Shows effective DPI at common POD print sizes:
- 4x6" (small prints)
- 8x10" (standard)
- 11x14" (medium)
- 16x20" (large)

### 3. Prescriptive Explanations
Not just pass/fail - explains WHY and HOW TO FIX:
- Resolution validation with pixel dimension guidance
- Format validation
- File size validation
- Color mode validation

### 4. Educational Focus
Helps users understand the difference between:
- Metadata DPI (stored in file properties)
- Effective DPI (pixels ÷ print dimensions)

### 5. Share Functionality
Generate shareable URLs with validation results for community sharing.

### 6. Creative Fabrica CTA
Context-aware calls-to-action linking to CF marketplace.

## Technical Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **File Processing**: Browser File API + Canvas API (client-side)
- **Deployment**: Ready for Vercel/Netlify

## Architecture

### Client-Side Processing
All file processing happens in the browser:
- **Faster**: No upload latency
- **Privacy**: Files never leave user's browser
- **Lower cost**: No server infrastructure
- **Simpler**: Static hosting

### Core Validation Logic

Located in `/src/utils/validation.js`:

1. **Image Loading**: Extract pixel dimensions from PNG/JPG/SVG
2. **DPI Calculation**: Calculate effective DPI at multiple print sizes
3. **Platform Validation**: Check against platform-specific requirements
4. **Prescriptive Results**: Generate explanatory messages

## Project Structure

```
/src
  /components
    FileUpload.jsx         - Drag-and-drop file upload
    PlatformSelector.jsx   - Platform selection buttons
    ValidationResults.jsx  - Results display orchestrator
    DPITable.jsx          - Multi-size DPI table
    CheckResult.jsx       - Individual check result display
    CreativeFabricaCTA.jsx - CF marketplace CTA
  /utils
    validation.js         - Core validation logic
  App.jsx                 - Main app orchestrator
  index.css              - Tailwind imports
  main.jsx               - React entry point
index.html               - HTML with SEO meta tags
```

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Validation Flow

1. User selects platform (Printful/Printify/General)
2. User uploads file (drag-and-drop or click)
3. Tool extracts image dimensions
4. Tool calculates effective DPI at 4 print sizes
5. Tool validates format, file size, color mode
6. Results displayed with prescriptive explanations
7. User can share results or validate another file

## Competitive Positioning

### vs gopathtomillions.com DPI Calculator ($49.94/mo)

**Their approach**: Help users calculate required pixel dimensions BEFORE designing
- User inputs: Numbers (print size, desired DPI)
- User moment: Planning phase

**Our approach**: Validate EXISTING files against platform requirements
- User inputs: Actual file upload
- User moment: Validation phase (after designing, before printing)

**The gap**: Calculator can't answer "is my existing file print-ready?" - it only helps plan future files.

## Target Keywords

- "print ready checker"
- "DPI checker tool"
- "Printify DPI requirements"
- "is my design print ready"
- "Printful file validation"

## Future Enhancements (Phase 2)

- Bleed margin validation
- POD product-specific sizing (t-shirt, mug, poster presets)
- Batch upload (10-50 files at once)
- CMYK detection
- File conversion suggestions
- Analytics dashboard

## Author

Built for Creative Fabrica take-home assignment
Role: Satellite App Builder - AI Vibe Coder
