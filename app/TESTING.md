# Testing Guide

## Manual Testing Checklist

### Test Case 1: High-Resolution PNG (Should Pass)
- **File**: Create or use a 3000x3000px PNG file
- **Expected Results**:
  - ✅ All print sizes show 300+ DPI
  - ✅ Format validation passes
  - ✅ File size validation passes
  - ✅ Overall status: PASS

### Test Case 2: Low-Resolution Image (Should Fail)
- **File**: Create or use an 800x800px PNG file
- **Expected Results**:
  - ❌ Most/all print sizes show <150 DPI
  - ✅ Format validation passes
  - ✅ File size validation passes
  - ❌ Overall status: FAIL
  - Should see prescriptive "How to fix" guidance

### Test Case 3: Medium-Resolution (Should Warn)
- **File**: Create or use a 1800x1800px PNG file
- **Expected Results**:
  - ✅ Small sizes (4x6") pass
  - ⚠️ Larger sizes (16x20") warn or fail
  - Shows different DPI ratings across sizes

### Test Case 4: SVG File
- **File**: Any SVG file
- **Expected Results**:
  - ✅ Shows "SVG Note: Vector files scale infinitely"
  - ✅ Format validation passes (for Printify/General)
  - ❌ Format validation fails for Printful (doesn't accept SVG)

### Test Case 5: Platform-Specific Validation
- **Test**: Same file, different platforms
- **Expected Results**:
  - Printful: More lenient (150+ DPI acceptable)
  - Printify: Stricter (300+ DPI required)
  - Different max file size limits displayed

### Test Case 6: File Upload UX
- **Test**: Drag-and-drop vs click upload
- **Expected Results**:
  - Both methods work
  - Loading spinner shows during analysis
  - Error messages for unsupported formats

### Test Case 7: Share Functionality
- **Test**: Click "Share This Validation"
- **Expected Results**:
  - Button text changes to "✓ Link Copied!"
  - URL is copied to clipboard
  - URL contains validation parameters

### Test Case 8: Creative Fabrica CTA
- **Test**: Check CTA messaging
- **Expected Results**:
  - Pass state: "Need more high-quality designs?"
  - Fail state: "Want professionally designed, print-ready files?"
  - Links to Creative Fabrica marketplace

## Quick Test Files

You can create test files using these specs:

### High-Res Test (Should Pass)
```
Dimensions: 3000x3000px
Format: PNG
Expected DPIs:
- 4x6": 500 DPI ✅
- 8x10": 375 DPI ✅
- 11x14": 272 DPI ⚠️
- 16x20": 188 DPI ❌
```

### Low-Res Test (Should Fail)
```
Dimensions: 800x800px
Format: PNG
Expected DPIs:
- 4x6": 133 DPI ❌
- 8x10": 100 DPI ❌
- 11x14": 72 DPI ❌
- 16x20": 50 DPI ❌
```

## Browser Testing

Test in these browsers:
- Chrome (primary target)
- Safari
- Firefox
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Performance Testing

- File upload should complete in <1 second for typical files
- Analysis should complete in <2 seconds
- UI should remain responsive during processing

## Accessibility Testing

- All interactive elements should be keyboard accessible
- Color contrast should meet WCAG AA standards
- Screen reader compatibility (headings, alt text)

## Edge Cases

1. **Very large file** (>100 MB): Should show error before analysis
2. **Unsupported format** (e.g., PDF): Should show error message
3. **Corrupted image**: Should handle gracefully with error message
4. **SVG without dimensions**: Should use default 1000x1000

## Known Limitations

1. **Color mode detection**: Currently assumes RGB (Canvas API doesn't easily detect CMYK)
2. **Metadata DPI**: Not currently reading EXIF metadata (would need external library)
3. **SVG dimensions**: May not accurately detect all SVG dimension formats
