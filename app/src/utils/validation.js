/**
 * File Validation Utilities
 *
 * Core logic for validating print-ready files:
 * - Extract image dimensions
 * - Read metadata DPI (if available)
 * - Calculate effective DPI at multiple print sizes
 * - Validate against platform-specific requirements
 */

// Platform-specific requirements
export const PLATFORM_REQUIREMENTS = {
  printful: {
    name: 'Printful',
    minDPI: 150,
    warnDPI: 300,
    formats: ['PNG', 'JPG', 'JPEG'],
    maxSize: 200 * 1024 * 1024, // 200 MB
    colorMode: 'RGB'
  },
  printify: {
    name: 'Printify',
    minDPI: 300,
    warnDPI: 300,
    formats: ['PNG', 'JPG', 'JPEG', 'SVG'],
    maxSize: 100 * 1024 * 1024, // 100 MB
    colorMode: 'RGB'
  },
  general: {
    name: 'General Print-Ready',
    minDPI: 300,
    warnDPI: 300,
    formats: ['PNG', 'JPG', 'JPEG', 'SVG'],
    maxSize: 100 * 1024 * 1024, // 100 MB
    colorMode: 'RGB'
  }
}

// Common POD print sizes (in inches)
export const PRINT_SIZES = [
  { label: '4x6"', width: 6, height: 4 },
  { label: '8x10"', width: 10, height: 8 },
  { label: '11x14"', width: 14, height: 11 },
  { label: '16x20"', width: 20, height: 16 }
]

/**
 * Load image and extract dimensions
 * @param {File} file - The image file
 * @returns {Promise<{width: number, height: number, url: string, isSVG: boolean, svgDimensionWarning?: string}>}
 */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    // For SVG files, we can't easily get pixel dimensions
    // So we'll handle them specially
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const parser = new DOMParser()
          const doc = parser.parseFromString(e.target.result, 'image/svg+xml')
          const svg = doc.querySelector('svg')

          // Check for parsing errors
          const parserError = doc.querySelector('parsererror')
          if (parserError || !svg) {
            reject(new Error('Invalid SVG file format'))
            return
          }

          let width = 0
          let height = 0
          let hasExplicitDimensions = false

          // Try to get dimensions from width/height attributes
          if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
            const widthAttr = svg.getAttribute('width')
            const heightAttr = svg.getAttribute('height')

            // Remove units (px, pt, etc.) if present
            width = parseFloat(widthAttr.replace(/[^\d.]/g, ''))
            height = parseFloat(heightAttr.replace(/[^\d.]/g, ''))
            hasExplicitDimensions = true
          }
          // Try to get from viewBox
          else if (svg.hasAttribute('viewBox')) {
            const viewBox = svg.getAttribute('viewBox').split(/\s+/)
            if (viewBox.length >= 4) {
              width = parseFloat(viewBox[2])
              height = parseFloat(viewBox[3])
              hasExplicitDimensions = true
            }
          }

          // Warn if dimensions couldn't be determined or seem unusual
          let svgDimensionWarning = null
          if (!hasExplicitDimensions || !width || !height || width < 10 || height < 10) {
            svgDimensionWarning = 'Could not determine SVG dimensions accurately. Vector files scale infinitely, but for validation purposes, we recommend checking the exported pixel dimensions.'
            // Use a reasonable default for validation display purposes
            width = width || 3000
            height = height || 3000
          }

          resolve({
            width,
            height,
            url: URL.createObjectURL(file),
            isSVG: true,
            svgDimensionWarning
          })
        } catch (error) {
          reject(new Error('Failed to parse SVG file: ' + error.message))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read SVG file'))
      reader.readAsText(file)
    } else {
      // For raster images (PNG, JPG)
      const img = new Image()
      const url = URL.createObjectURL(file)

      img.onload = () => {
        // Validate that dimensions are reasonable
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          reject(new Error('Invalid image: dimensions are 0'))
          return
        }

        if (img.naturalWidth < 50 || img.naturalHeight < 50) {
          reject(new Error('Image is too small (minimum 50x50 pixels)'))
          return
        }

        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          url,
          isSVG: false
        })
      }

      img.onerror = () => reject(new Error('Failed to load image. File may be corrupted or in an unsupported format.'))
      img.src = url
    }
  })
}

/**
 * Calculate effective DPI at various print sizes
 * @param {number} pixelWidth - Image width in pixels
 * @param {number} pixelHeight - Image height in pixels
 * @param {string} platform - Platform identifier
 * @returns {Array} Array of {size, dpi, status} objects
 */
function calculateDPIsAtSizes(pixelWidth, pixelHeight, platform) {
  const requirements = PLATFORM_REQUIREMENTS[platform]

  return PRINT_SIZES.map(size => {
    // Calculate DPI for both dimensions and use the smaller one
    // (limiting factor for print quality)
    const dpiWidth = pixelWidth / size.width
    const dpiHeight = pixelHeight / size.height
    const effectiveDPI = Math.min(dpiWidth, dpiHeight)

    // Determine status based on platform requirements
    let status = 'excellent'
    let statusIcon = '✅'
    let statusText = 'Excellent'

    if (effectiveDPI < requirements.minDPI) {
      status = 'fail'
      statusIcon = '❌'
      statusText = 'Too low - will look pixelated'
    } else if (effectiveDPI < requirements.warnDPI) {
      status = 'warning'
      statusIcon = '⚠️'
      if (platform === 'printful') {
        statusText = 'Acceptable (Printful OK)'
      } else {
        statusText = 'Acceptable (Printify risky)'
      }
    } else if (effectiveDPI >= 300 && effectiveDPI < 400) {
      status = 'good'
      statusIcon = '✅'
      statusText = 'Great'
    } else if (effectiveDPI >= 400) {
      status = 'excellent'
      statusIcon = '✅'
      statusText = 'Excellent'
    }

    return {
      label: size.label,
      width: size.width,
      height: size.height,
      dpi: Math.round(effectiveDPI),
      status,
      statusIcon,
      statusText
    }
  })
}

/**
 * Get file format from MIME type
 */
function getFileFormat(mimeType) {
  const formatMap = {
    'image/png': 'PNG',
    'image/jpeg': 'JPG',
    'image/jpg': 'JPG',
    'image/svg+xml': 'SVG'
  }
  return formatMap[mimeType] || 'Unknown'
}

/**
 * Main validation function
 * @param {File} file - The uploaded file
 * @param {string} platform - Selected platform (printful, printify, general)
 * @returns {Promise<Object>} Validation results
 */
export async function validateFile(file, platform) {
  const requirements = PLATFORM_REQUIREMENTS[platform]

  // Load image and get dimensions
  const imageData = await loadImage(file)

  // Get file details
  const fileFormat = getFileFormat(file.type)
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)

  // Calculate DPIs at various print sizes
  const dpiResults = calculateDPIsAtSizes(
    imageData.width,
    imageData.height,
    platform
  )

  // Find the best (largest) print size that meets requirements
  const bestSize = [...dpiResults]
    .reverse()
    .find(size => size.status !== 'fail')

  // Overall pass/fail determination
  const hasAnyValidSize = dpiResults.some(size => size.status !== 'fail')
  const allSizesPass = dpiResults.every(size => size.status === 'excellent' || size.status === 'good')

  // Validate format
  const formatValid = requirements.formats.includes(fileFormat)

  // Validate file size
  const sizeValid = file.size <= requirements.maxSize

  // Color mode check (we'll assume RGB for now since Canvas API doesn't easily detect CMYK)
  // In a production app, you'd need a library to read EXIF data for this
  const colorModeValid = true // Assuming RGB (most exports from Canva/Figma are RGB)

  return {
    fileName: file.name,
    fileFormat,
    fileSizeMB,
    fileSizeBytes: file.size,
    imageWidth: imageData.width,
    imageHeight: imageData.height,
    isSVG: imageData.isSVG,
    svgDimensionWarning: imageData.svgDimensionWarning,
    imageUrl: imageData.url,
    platform,
    platformName: requirements.name,
    dpiResults,
    bestSize,
    hasAnyValidSize,
    allSizesPass,
    checks: {
      resolution: {
        pass: hasAnyValidSize,
        allPass: allSizesPass
      },
      format: {
        pass: formatValid,
        expected: requirements.formats.join(', '),
        actual: fileFormat
      },
      fileSize: {
        pass: sizeValid,
        maxMB: requirements.maxSize / (1024 * 1024),
        actualMB: parseFloat(fileSizeMB)
      },
      colorMode: {
        pass: colorModeValid,
        expected: requirements.colorMode,
        actual: 'RGB', // Assumption
        note: 'Most design tools (Canva, Figma, Photoshop) export RGB by default. CMYK detection requires EXIF parsing.'
      }
    },
    overallPass: hasAnyValidSize && formatValid && sizeValid && colorModeValid
  }
}

/**
 * Generate shareable URL with validation results
 * @param {Object} results - Validation results
 * @returns {string} URL with encoded results
 */
export function generateShareableURL(results) {
  const bestSizeDPI = results.bestSize ? results.bestSize.dpi : 0
  const bestSizeLabel = results.bestSize ? results.bestSize.label : 'None'

  const params = new URLSearchParams({
    file: results.fileName,
    width: results.imageWidth,
    height: results.imageHeight,
    platform: results.platform,
    status: results.overallPass ? 'pass' : 'fail',
    format: results.fileFormat,
    size: results.fileSizeMB,
    bestSize: bestSizeLabel,
    bestDPI: bestSizeDPI,
    platformName: results.platformName
  })

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}
