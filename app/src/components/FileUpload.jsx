import { useState, useCallback } from 'react'
import { trackUploadInitiated } from '../utils/analytics'

/**
 * FileUpload Component
 *
 * Provides drag-and-drop and click-to-upload functionality.
 * Validates file type and size before passing to parent.
 *
 * Accepted formats: PNG, JPG, JPEG, SVG
 * Max size: Platform-dependent (200 MB for Printful, 100 MB for others)
 */

const ACCEPTED_FORMATS = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']

export default function FileUpload({ onFileUpload, isAnalyzing, platform = 'general' }) {
  // Platform-specific max file size
  const MAX_FILE_SIZE = platform === 'printful'
    ? 200 * 1024 * 1024  // 200 MB for Printful
    : 100 * 1024 * 1024  // 100 MB for Printify and General
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Validate file type and size
   */
  const validateFile = (file) => {
    // Check file type
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return 'Please upload a PNG, JPG, or SVG file.'
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1)
      const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)
      return `File is too large (${sizeMB} MB). Maximum size for ${platform === 'printful' ? 'Printful' : 'this platform'} is ${maxSizeMB} MB.`
    }

    return null
  }

  /**
   * Handle file selection (from click or drop)
   */
  const handleFile = useCallback((file, method = 'click') => {
    setError(null)

    // Track upload initiated
    trackUploadInitiated(method)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    onFileUpload(file)
  }, [onFileUpload])

  /**
   * Handle drag events
   */
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file, 'drag_drop')
    }
  }, [handleFile])

  /**
   * Handle file input change
   */
  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      handleFile(file, 'click')
    }
  }, [handleFile])

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">
        Upload Your Design
      </h2>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
          isDragging
            ? 'border-amber-500 bg-amber-500/10'
            : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
        } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input
          type="file"
          id="file-input"
          accept=".png,.jpg,.jpeg,.svg"
          onChange={handleFileInputChange}
          disabled={isAnalyzing}
          className="hidden"
          aria-label="Upload image file for validation"
        />

        <label
          htmlFor="file-input"
          className={`${isAnalyzing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          tabIndex={isAnalyzing ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              document.getElementById('file-input')?.click()
            }
          }}
        >
          <div className="text-6xl mb-4">📁</div>
          <div className="text-lg font-medium text-white mb-2">
            {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
          </div>
          <div className="text-slate-400 mb-4">or</div>
          <div className="inline-block px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors">
            Click to Browse
          </div>
          <div className="mt-4 text-sm text-slate-400">
            Accepts PNG, JPG, SVG • Max {platform === 'printful' ? '200' : '100'} MB
          </div>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/50 rounded-lg">
          <div className="flex items-start">
            <span className="text-rose-400 text-xl mr-2">❌</span>
            <div className="flex-1">
              <div className="font-medium text-rose-300">Upload Error</div>
              <div className="text-rose-400 text-sm mt-1">{error}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
