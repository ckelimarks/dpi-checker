# Print-Ready File Validator - Product Requirements Document

**Take-Home Assignment for Creative Fabrica**
**Role:** Satellite App Builder - AI Vibe Coder
**Build Time:** 48 hours
**Target Ship Date:** March 5, 2026

---

## Product Vision & Strategic Positioning

### Vision Statement
A client-side file validation tool that helps Creative Fabrica's monetization-focused POD sellers validate their design files against platform-specific print requirements before uploading, preventing costly rejected orders and building confidence through education.

### Strategic Context: CF Customer Segmentation

Creative Fabrica serves two distinct customer segments:
1. **Hobbyist Crafters** (Asset Consumers) - Download SVGs for personal Cricut projects
2. **Monetization-Focused Creators** (POD Sellers) - Create and sell original designs via Printful/Printify

This tool serves the **second segment** - CF's highest-value, highest-retention customers who demonstrate "high tool adoption" and focus on monetization. This is the segment CF is strategically doubling down on.

### Positioning Statement
> **"Validate your files, don't just calculate. Upload your design and get instant, platform-specific print readiness checks with clear explanations."**

### Competitive Differentiation

**Existing Solution: gopathtomillions.com DPI Calculator ($49.94/mo)**
- What they do: Help users calculate required pixel dimensions BEFORE designing
- User inputs: Numbers (print size, desired DPI)
- User moment: Planning phase

**Our Wedge: File Validator (not Calculator)**
- What we do: Validate EXISTING files against platform requirements
- User inputs: Actual file upload
- User moment: Validation phase (after designing, before printing)

**The Gap:** Calculator can't answer "is my existing file print-ready?" - it only helps plan future files.

---

## Target User & Use Cases

### Primary Persona: "Sarah - Etsy POD Seller"

**Demographics:**
- Started Etsy shop 6 months ago selling custom t-shirts and mugs
- Uses Canva for designs, uploads to Printful/Printify
- Makes $1.79 profit per sale after Etsy fees and product costs
- Needs 280 sales/month to make $500 (requires ~14,000 visitors at 2% conversion)

**Pain Points:**
- Has had 3 orders rejected for "low resolution" - didn't understand why
- Saw conflicting DPI readings: "Printify says 258 DPI but my file properties say 96 DPI"
- Doesn't understand metadata DPI vs effective print resolution
- Uses wrong QA method (checking OS file properties instead of calculating print DPI)
- Can't afford rejected orders - one refund wipes out 5-7 sales of profit

**Behavioral Traits:**
- Moves fast, launches 20+ products in first 2 weeks
- Skips QA, learns by trial-and-error
- Reactive (fixes problems after customer complaints, not proactively)
- "Doesn't know what they don't know" - no formal training on print specs

### Jobs to Be Done

**Functional Jobs:**
1. **Validate existing file** - "I've finished designing - will this file work on Printful?"
2. **Understand why it failed** - "Why does Printify say different DPI than my file properties?"
3. **Prevent costly errors** - "I can't afford another rejected order and angry customer"

**Emotional Jobs:**
1. Feel confident - "I know this will work before I upload"
2. Feel competent - "I understand print requirements now"
3. Avoid embarrassment - "No more 'low quality print' complaints"

---

## Core Features & Requirements (Prioritized MVP)

### 1. File Upload (Must-Have)
- Drag-and-drop or file picker UI
- Accepted formats: PNG, JPG, SVG
- Max file size: 100 MB (Printify's limit)
- No login required (friction-free validation)

**Technical Implementation:**
- Browser File API (client-side, no backend)
- File type validation on upload
- File size check

---

### 2. Platform-Specific Validation Presets (Must-Have - MOVED FROM OPTIONAL)

**Why This is Core MVP:** Different platforms have different requirements. This is the competitive wedge vs calculator competitor who doesn't offer platform-specific validation.

**Dropdown Selector:**
- **"Printful"** - 150+ DPI acceptable, RGB, PNG/JPG, 200 MB max
- **"Printify"** - 300+ DPI required, RGB, PNG/JPG/SVG, 100 MB max
- **"General Print-Ready"** - 300+ DPI, RGB, standard POD requirements

**Validation Rules by Platform:**

| Check | Printful | Printify | General |
|-------|----------|----------|---------|
| **DPI** | ≥150 DPI (warn if <300) | ≥300 DPI | ≥300 DPI |
| **Color Mode** | RGB/sRGB | RGB/sRGB | RGB/sRGB |
| **Format** | PNG, JPG | PNG, JPG, SVG | PNG, JPG, SVG |
| **File Size** | ≤200 MB | ≤100 MB | ≤100 MB |

**User Flow:**
1. User selects platform from dropdown (defaults to "General")
2. Uploads file
3. Tool validates against that platform's specific requirements
4. Results show pass/fail for each requirement with platform context

---

### 3. Prescriptive Validation Results (Must-Have - CORE DIFFERENTIATOR)

**Why This is Critical:** Research shows users don't understand the difference between embedded metadata DPI and effective print resolution. Education IS the product value.

**Results Display Structure:**

**A. Multi-Size DPI Display (NEW - High Value)**
Show effective DPI at common POD print sizes:

```
Your 3000x3000px file will print at:
• 4x6"   → 500 DPI ✅ Excellent
• 8x10"  → 375 DPI ✅ Great
• 11x14" → 272 DPI ⚠️  Acceptable (Printful OK, Printify risky)
• 16x20" → 188 DPI ❌ Too low - will look pixelated
```

**B. Prescriptive Explanations for Each Check:**

**DPI Check - Pass Example:**
```
✅ Resolution: Print-Ready
Your file is 3000x3000 pixels.
Metadata DPI: 96 (this is just a stored number)
Effective DPI at 8x10": 375 DPI ✅

Why this works: Effective DPI = pixels ÷ print dimensions
3000px ÷ 10" = 300 DPI (sharp prints)
```

**DPI Check - Fail Example:**
```
❌ Resolution: Too Low for Sharp Prints
Your file is 800x800 pixels.
Effective DPI at 8x10": 100 DPI ❌

Why this fails: 800px ÷ 10" = 80 DPI
For sharp prints, you need at least 2400x2400px for 8x10" (300 DPI)

How to fix:
→ Recreate your design at 3000x3000px minimum
→ OR print at smaller size: Your file is print-ready at 4x4" or smaller
```

**Color Mode Check:**
```
✅ Color Mode: RGB
Your file is in RGB color space - perfect for Printful/Printify.

Note: If your file properties showed CMYK, you'd need to convert to RGB first.
```

**Format Check:**
```
✅ File Format: PNG
Accepted by Printful, Printify, and most POD services.
```

**File Size Check:**
```
✅ File Size: 8.2 MB
Well within Printify's 100 MB limit.
```

---

### 4. Creative Fabrica Funnel (Must-Have)

**CTA Placement:** After validation results display

**Pass State CTA:**
```
✅ Your file is print-ready!

Need more high-quality designs?
[Browse 15M+ Print-Ready Assets at Creative Fabrica →]
```

**Fail State CTA:**
```
❌ Your file needs fixes before printing.

Want professionally designed, print-ready files?
[Explore Creative Fabrica's Marketplace →]
```

**Tracking (if time allows):** Log CTA clicks to measure conversion

---

### 5. Share/Save Validation Results (Must-Have - NEW)

**Why This is Core MVP:** POD sellers operate in tight communities (Reddit, Facebook groups). Shareability = organic distribution.

**Implementation:**
- "Share this validation" button
- Generate shareable URL with results (encode validation results in URL params)
- Copy link to clipboard functionality

**Low Effort Implementation:** Store results in URL params (no backend needed)
- Example: `?file=design.png&dpi=375&status=pass&platform=printify`

---

## Out of Scope (Phase 2)

❌ **CMYK Detection** - Most Canva/Figma exports are RGB by default. CMYK is rare in this user segment.
❌ **Bleed Margin Validation** - Too complex for 48-hour MVP, requires edge detection
❌ **POD Product-Specific Sizing** (t-shirt vs mug dimensions) - Too many variants
❌ **Batch Upload** - Single file validation is sufficient for MVP
❌ **User Accounts / Saved History** - No login, no persistence
❌ **File Conversion Tools** - Only validate, don't fix (no DPI upscaling)
❌ **PDF Support** - Only PNG/JPG/SVG (most common for POD)

---

## Technical Implementation

### Stack
- **Frontend:** React + Tailwind CSS (fast styling)
- **File Processing:** Browser File API + Canvas API (client-side)
- **EXIF Parsing:** exif-js or piexif.js (read metadata DPI)
- **Deployment:** Vercel (instant deploy, free tier)

### Why Client-Side Processing
- **Faster:** No upload latency to server
- **Privacy:** Files never leave user's browser
- **Lower cost:** No server infrastructure
- **Simpler:** Static hosting, no backend complexity

### DPI Calculation Logic

**Step 1: Extract Metadata DPI** (if available)
```javascript
// Read EXIF metadata
const metadataDPI = EXIF.getTag(image, "XResolution") || 96;
```

**Step 2: Calculate Effective DPI at Common Print Sizes**
```javascript
const pixelWidth = image.width;
const pixelHeight = image.height;

const printSizes = [
  { label: "4x6\"", width: 6, height: 4 },
  { label: "8x10\"", width: 10, height: 8 },
  { label: "11x14\"", width: 14, height: 11 },
  { label: "16x20\"", width: 20, height: 16 }
];

printSizes.forEach(size => {
  const effectiveDPI = Math.min(
    pixelWidth / size.width,
    pixelHeight / size.height
  );
  // Display effectiveDPI with pass/fail status
});
```

**Step 3: Platform-Specific Validation**
```javascript
const platformRequirements = {
  printful: { minDPI: 150, warnDPI: 300, formats: ["PNG", "JPG"], maxSize: 200 * 1024 * 1024 },
  printify: { minDPI: 300, warnDPI: 300, formats: ["PNG", "JPG", "SVG"], maxSize: 100 * 1024 * 1024 },
  general: { minDPI: 300, warnDPI: 300, formats: ["PNG", "JPG", "SVG"], maxSize: 100 * 1024 * 1024 }
};
```

---

## User Flow

```
1. User lands on tool homepage
   Headline: "Validate Your Files, Don't Just Calculate"
   Subhead: "Upload your design and get instant, platform-specific validation"
   ↓
2. User selects platform: [Printful] [Printify] [General]
   ↓
3. User uploads file (drag-and-drop or file picker)
   ↓
4. Tool analyzes file (loading state: "Analyzing your file...")
   ↓
5. Results page displays:
   • Multi-size DPI table (4x6", 8x10", 11x14", 16x20")
   • Pass/fail for each check (DPI, color, format, size)
   • Prescriptive explanations ("Here's why..." + "How to fix")
   • Platform-specific context ("Printify requires 300+ DPI")
   ↓
6. CTAs:
   • "Share this validation" (copy link)
   • "Browse Creative Fabrica" (CF marketplace CTA)
   ↓
7. User either:
   • Fixes file and re-uploads
   • Shares validation with POD seller community
   • Clicks through to Creative Fabrica
```

---

## Success Metrics (What We'd Measure in Production)

**Primary Metric:**
- **Creative Fabrica CTA clicks** (conversions to CF marketplace)

**Secondary Metrics:**
- Tool usage (files validated per day/week)
- Pass rate (% of files that are print-ready)
- Most common failures (DPI? Format? Platform-specific?)
- Platform preset distribution (Printful vs Printify vs General)
- Share link usage (viral distribution coefficient)
- Organic traffic (SEO keyword rankings)

**For Take-Home Presentation:**
- Show where analytics would be placed
- Explain what you'd track and why (CTA clicks = direct CF value)

---

## SEO & Distribution Strategy

### Target Keywords
| Keyword | Monthly Searches | Difficulty | Priority |
|---------|------------------|------------|----------|
| "print ready checker" | 500-1,000 | Low | High |
| "DPI checker tool" | 1,200 | Low | High |
| "Printify DPI requirements" | Est. 300-500 | Low | Medium |
| "is my design print ready" | High intent | Low | High |

### On-Page SEO (48-Hour MVP)
- **Title tag:** "Print-Ready File Validator - Platform-Specific Validation for Printful, Printify & POD"
- **Meta description:** "Upload your design and get instant validation against Printful, Printify, or general print requirements. Check DPI, color mode, and format in seconds."
- **H1:** "Is Your Design Print-Ready? Upload to Find Out."
- **Open Graph tags** (for social sharing)

### Distribution Channels (Post-Launch)
1. **Reddit:** Post in r/printondemand, r/EtsySellers with "I built a free tool to validate files before uploading to Printify/Printful"
2. **Facebook Groups:** 20+ Etsy/POD seller groups identified
3. **Discord:** Etsy Empire, SellerAider communities
4. **Creative Fabrica Blog:** Partnership post ("Free validation tool for CF's POD sellers")

---

## Timeline (48-Hour Build)

**Hours 0-8: Setup & Core Logic**
- React + Tailwind + Vercel project setup
- File upload UI (drag-and-drop)
- Platform preset selector
- EXIF metadata parsing (DPI extraction)
- Canvas API integration (read dimensions)
- Multi-size DPI calculation logic
- Validation logic (DPI, color, format, size)

**Hours 8-16: Results UI**
- Multi-size DPI table component
- Prescriptive explanation copy for each check
- Pass/fail visual feedback (checkmarks/X's)
- Platform-specific messaging
- CF CTA component

**Hours 16-24: Polish & Deploy**
- Share functionality (URL param encoding)
- Mobile responsive layout
- SEO meta tags
- Vercel deployment
- Test with real files (5+ test cases)

**Hours 24-32: Presentation Prep**
- Demo video (screen recording of validation flow)
- Slide deck:
  - Problem (Reddit quote: "Printify says 258 DPI but my file says 96 DPI")
  - Research insight (metadata vs effective DPI confusion)
  - Competitive gap (calculator vs validator)
  - Solution (platform-specific validation with education)
  - SEO/distribution strategy
  - CF customer segment framing
  - Metrics & what's next
- Document decisions (what built vs cut, and why)

**Hours 32-48: Buffer & Final Polish**
- Bug fixes from testing
- Edge case handling
- Performance optimization
- Final presentation review

---

## Definition of Done (48-Hour MVP)

✅ **Live URL** - Deployed on Vercel, accessible publicly
✅ **Platform-Specific Validation** - Printful, Printify, General presets working
✅ **Multi-Size DPI Display** - Shows effective DPI at 4x6", 8x10", 11x14", 16x20"
✅ **Prescriptive Explanations** - "Here's why" + "How to fix" for each check
✅ **Share Functionality** - Generate shareable validation result URLs
✅ **CF CTA** - Link to Creative Fabrica marketplace
✅ **SEO Basics** - Title, meta description, Open Graph tags
✅ **Tested** - 5+ real files validated (low DPI, wrong format, various platforms)
✅ **Presentation Deck** - Problem, competitive gap, solution, research framing, CF segment positioning, metrics

**Bonus (If Time):**
✅ **Mobile responsive** - Works on phone (POD sellers work mobile-first)
✅ **Copy to clipboard** - One-click share link copying
✅ **Analytics hooks** - Event tracking ready for GA (even if not fully wired)

---

## Presentation Strategy

### Lead With (In This Order)

1. **CF Customer Segmentation Understanding**
   > "Creative Fabrica has two segments: hobbyist crafters and monetization-focused POD sellers. The POD sellers are CF's highest-value, highest-retention customers with high tool adoption. This tool serves THAT segment."

2. **Direct Problem Evidence (Reddit Quote)**
   > "I found a POD seller on Reddit asking: 'Printify says my image dpi is about 258 but when I check the properties of the image it says the dpi is 96. Which one is correct?' This is the exact problem I'm solving."

3. **Competitive Gap (Calculator vs Validator)**
   > "There's a $49.94/month DPI calculator, but it solves the wrong problem. It helps you plan dimensions before designing. POD sellers need to validate files they've already created. That's the gap."

4. **Solution (Demo)**
   > "Upload your file, select your platform, get instant validation with explanations. Not just pass/fail - understand WHY."

5. **Growth Strategy**
   > "SEO keywords, Reddit distribution, CF blog partnership, shareability for viral growth."

### Emphasize in Presentation

- **Business strategy understanding** - I know this serves CF's most valuable segment
- **Prescriptive education** - The tool teaches users, not just diagnoses problems
- **Competitive positioning** - Clear wedge vs existing calculator
- **Shipping capability** - Working tool in 48 hours
- **SEO thinking** - Keywords, distribution, growth strategy
- **Clear communication** - Research-backed decisions, documented trade-offs

### Acknowledge Honestly

- **Research gap** - Would benefit from 3-5 more direct file rejection examples from Printful/Printify forums
- **Target audience nuance** - Tool serves established sellers more than beginners (who fail on strategy/pricing, not technical specs)
- **CMYK deprioritized** - Rare in this user segment, moved to Phase 2

---

## What's Next (Phase 2 - If We Had 2 More Weeks)

1. **Bleed margin validation** - Detect 1/8" bleed around edges
2. **POD product-specific sizing** - T-shirt, mug, poster presets with exact dimensions
3. **Batch upload** - Validate 10-50 files at once
4. **CMYK detection** - Now that RGB validation is proven
5. **File conversion suggestions** - "Try TinyPNG to reduce file size" + affiliate link
6. **Analytics dashboard** - Track which checks fail most often, inform CF product strategy

---

**End of Updated PRD. Ready to build with research-backed confidence.**
