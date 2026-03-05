# Quick Start Guide for Reviewers

## TL;DR - 3 Steps to Review

1. **View the running app:** Open http://localhost:5173/ in your browser
2. **Test file upload:** Drag any PNG/JPG file onto the upload area
3. **See the magic:** Watch multi-size DPI validation with prescriptive explanations

The dev server is already running. Just open the browser and start testing.

## What You'll See

### 1. Landing Page
- Headline: "Is Your Design Print-Ready?"
- Platform selector with 3 options (Printful, Printify, General)
- Drag-and-drop file upload area

### 2. After File Upload
- Loading spinner: "Analyzing your file..."
- Then: Comprehensive validation results

### 3. Validation Results Page
- **Overall status:** Green (pass) or Red (fail) header
- **Multi-size DPI table:** Shows DPI at 4x6", 8x10", 11x14", 16x20"
- **Detailed checks:** Resolution, format, file size, color mode
- **Prescriptive explanations:** "Why this works" or "How to fix"
- **Creative Fabrica CTA:** Context-aware marketplace link
- **Share button:** Copy validation results URL
- **Validate Another button:** Reset to start

## Quick Test Scenarios

### Test 1: High-Resolution Image (Should Pass)
1. Create or find a 3000x3000px PNG image
2. Select "Printify" platform
3. Upload the file
4. **Expected:** ✅ Green success, all print sizes show good DPI

### Test 2: Low-Resolution Image (Should Fail)
1. Create or find an 800x800px PNG image
2. Select "Printify" platform
3. Upload the file
4. **Expected:** ❌ Red fail, prescriptive "How to fix" guidance

### Test 3: Platform Differences
1. Upload the same medium-resolution file (e.g., 1800x1800px)
2. Try with "Printful" - may pass (150+ DPI acceptable)
3. Try with "Printify" - may warn/fail (300+ DPI required)
4. **Expected:** Different validation results for same file

### Test 4: SVG File
1. Upload any SVG file
2. **Expected:** Special message: "Vector files scale infinitely"

### Test 5: Share Functionality
1. Complete any validation
2. Click "Share This Validation" button
3. **Expected:** Button changes to "✓ Link Copied!"
4. Paste in browser - URL contains validation parameters

## File Locations for Code Review

### Start Here (Core Logic)
1. `/app/src/App.jsx` - Main orchestrator (119 lines)
2. `/app/src/utils/validation.js` - DPI calculation logic (268 lines)
3. `/app/src/components/ValidationResults.jsx` - Results display (196 lines)

### Supporting Components
4. `/app/src/components/DPITable.jsx` - Multi-size DPI display (61 lines)
5. `/app/src/components/FileUpload.jsx` - Drag-and-drop upload (127 lines)
6. `/app/src/components/PlatformSelector.jsx` - Platform selection (62 lines)

### Smaller Components
7. `/app/src/components/CheckResult.jsx` - Reusable check display (31 lines)
8. `/app/src/components/CreativeFabricaCTA.jsx` - CF marketplace CTA (53 lines)

**Total lines of code:** ~900 lines (excluding documentation)

## Key Features to Look For

### 1. Multi-Size DPI Display (Key Differentiator)
**Location:** ValidationResults.jsx → DPITable.jsx

Look for the table showing:
```
4x6"   → 500 DPI ✅ Excellent
8x10"  → 375 DPI ✅ Great
11x14" → 272 DPI ⚠️  Acceptable
16x20" → 188 DPI ❌ Too low
```

This is what sets us apart from calculator competitors.

### 2. Prescriptive Explanations
**Location:** ValidationResults.jsx → CheckResult components

Look for:
- "Why this works" explanations
- "How to fix" guidance with specific steps
- Educational content about metadata DPI vs effective DPI

### 3. Platform-Specific Validation
**Location:** validation.js (PLATFORM_REQUIREMENTS)

Notice how the same file can pass/fail differently based on:
- Printful: More lenient (150+ DPI)
- Printify: Stricter (300+ DPI)
- General: Standard (300+ DPI)

### 4. Educational Content
Look for:
- Formula display: "Effective DPI = pixels ÷ print dimensions"
- Metadata vs effective DPI explanation
- SVG vector scaling explanation
- Print quality scale (300+ = sharp, <150 = pixelated)

## Documentation to Review

### Essential Reading
1. **COMPLETION_SUMMARY.md** - Overall project status & what was built
2. **PROJECT_OVERVIEW.md** - Executive summary, architecture, business value
3. **FEATURES.md** - Complete feature list with code locations

### Additional Context
4. **README.md** - Setup, development, competitive positioning
5. **TESTING.md** - Test cases and manual testing guide
6. **DEPLOYMENT.md** - How to deploy to Vercel/Netlify
7. **PROJECT_STRUCTURE.md** - File organization and responsibilities

### PRD Reference
- `/dpi-checker/PRD.md` - Original product requirements (read this first if you want full context)

## Commands Reference

### Already Running
```bash
# Dev server (already running)
# http://localhost:5173/
```

### If You Need to Restart
```bash
cd /Users/christopherk.marks/Downloads/personal-os-main/Projects/prototypes/dpi-checker/app
npm run dev
```

### Build for Production
```bash
npm run build
# Output: dist/ folder (211 KB)
```

### Preview Production Build
```bash
npm run preview
```

## Browser Testing

Recommended browsers to test:
- ✅ Chrome (primary target)
- ✅ Safari (Canvas API compatibility)
- ✅ Firefox (File API support)
- ✅ Mobile Safari (responsive design)

## What to Pay Attention To

### Code Quality
- **Comments:** Every component has JSDoc documentation
- **Modularity:** Clear separation of concerns
- **Naming:** Semantic variable and function names
- **Structure:** Logical file organization

### User Experience
- **Loading states:** Spinner during analysis
- **Error handling:** Clear error messages
- **Visual feedback:** Drag state, button states
- **Responsive:** Works on mobile and desktop

### Business Value
- **Educational:** Teaches users, not just validates
- **Platform-specific:** Real differentiation (Printful vs Printify)
- **Prescriptive:** "How to fix" guidance
- **Shareable:** Viral growth potential

### Competitive Edge
- **Multi-size display:** Shows all common print sizes at once
- **File validation:** Validates existing files (not just planning)
- **Prescriptive:** Beyond pass/fail

## Common Questions

### Q: Does it actually calculate DPI correctly?
**A:** Yes. Formula: `min(pixelWidth/printWidth, pixelHeight/printHeight)`

Open validation.js line 89 to see the calculation.

### Q: Are platform requirements accurate?
**A:** Yes. Based on Printful/Printify official documentation:
- Printful: 150+ DPI acceptable, 200 MB max
- Printify: 300+ DPI required, 100 MB max

See validation.js lines 12-40.

### Q: Does it handle SVG files?
**A:** Yes. Special parsing for SVG (width/height attributes and viewBox).

See validation.js lines 49-88.

### Q: Is it production-ready?
**A:** Yes for MVP. Known limitations:
- Color mode detection (assumes RGB)
- EXIF metadata reading (not implemented)
- SVG dimensions (basic parsing only)

See TESTING.md for full list.

## Success Indicators

If you see these, the prototype is working correctly:

✅ File upload accepts PNG/JPG/SVG
✅ Platform selector changes validation rules
✅ DPI table shows 4 different print sizes
✅ Results include "Why this works" or "How to fix"
✅ Creative Fabrica CTA changes based on pass/fail
✅ Share button copies URL to clipboard
✅ Mobile responsive (test by resizing browser)
✅ No console errors
✅ Build completes successfully

## Need Help?

All code is extensively commented. If something is unclear:

1. Check the component's JSDoc comment (top of file)
2. Read inline comments explaining logic
3. Refer to FEATURES.md for feature locations
4. Check PROJECT_OVERVIEW.md for architecture decisions

## Time Estimate

**Quick review:** 15 minutes
- Open browser, test file upload, check results

**Thorough review:** 45-60 minutes
- Test all scenarios, read code, review documentation

**Deep dive:** 2 hours
- Understand architecture, review all components, test edge cases

---

**Ready to review!** Open http://localhost:5173/ and start testing.
