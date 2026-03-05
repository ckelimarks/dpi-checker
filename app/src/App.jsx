import { useState, useCallback, useEffect } from 'react'
import FileUpload from './components/FileUpload'
import PlatformSelector from './components/PlatformSelector'
import ValidationResults from './components/ValidationResults'
import SEOArticle from './components/SEOArticle'
import { validateFile } from './utils/validation'
import { initAnalytics, trackPlatformSelected, trackFileValidated } from './utils/analytics'

/**
 * Main App Component
 *
 * Orchestrates the print-ready file validation flow:
 * 1. Platform selection (Printful, Printify, General)
 * 2. File upload (drag-and-drop or click)
 * 3. Validation logic execution
 * 4. Results display with prescriptive explanations
 */
function App() {
  // Selected platform - determines validation rules
  const [platform, setPlatform] = useState('general')

  // Validation results object (null when no file uploaded yet)
  const [results, setResults] = useState(null)

  // Loading state during file processing
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics()
  }, [])

  /**
   * Handle file upload and trigger validation
   * @param {File} file - The uploaded image file
   */
  const handleFileUpload = useCallback(async (file) => {
    setIsAnalyzing(true)
    setResults(null)

    try {
      // Validate the file against platform-specific requirements
      const validationResults = await validateFile(file, platform)
      setResults(validationResults)

      // Calculate validation score for tracking
      const checksStatus = [
        validationResults.checks.resolution.allPass || false,
        validationResults.checks.format.pass || false,
        validationResults.checks.fileSize.pass || false,
        validationResults.checks.colorMode.pass || false
      ]
      const validationScore = checksStatus.filter(check => check === true).length

      // Track successful validation
      trackFileValidated({
        platform: validationResults.platform,
        fileFormat: validationResults.fileFormat,
        fileSizeMB: validationResults.fileSizeMB,
        overallPass: validationResults.overallPass,
        validationScore: `${validationScore}/4`,
        imageWidth: validationResults.imageWidth,
        imageHeight: validationResults.imageHeight
      })
    } catch (error) {
      console.error('Validation error:', error)
      // Provide more specific error messages based on error type
      let errorMessage = 'Failed to analyze file. Please try again with a valid image file.'

      if (error.message) {
        if (error.message.includes('Invalid SVG')) {
          errorMessage = 'Invalid SVG file format. Please ensure your SVG is properly formatted.'
        } else if (error.message.includes('too small')) {
          errorMessage = error.message
        } else if (error.message.includes('corrupted')) {
          errorMessage = 'The image file appears to be corrupted. Please try re-exporting or uploading a different file.'
        } else if (error.message.includes('Failed to load')) {
          errorMessage = 'Failed to load the image. The file may be corrupted or in an unsupported format.'
        } else {
          errorMessage = error.message
        }
      }

      setResults({
        error: errorMessage
      })
    } finally {
      setIsAnalyzing(false)
    }
  }, [platform])

  /**
   * Reset to initial state for new validation
   */
  const handleReset = () => {
    setResults(null)
  }

  /**
   * Handle platform change - if results exist, inform user to re-upload
   */
  const handlePlatformChange = (newPlatform) => {
    if (results && !results.error) {
      // If user has results and changes platform, reset to allow re-validation
      setResults(null)
    }
    setPlatform(newPlatform)

    // Track platform selection
    trackPlatformSelected(newPlatform)
  }

  return (
    <div className="min-h-screen bg-technical relative">
      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Hero Section with Upload */}
        <div className="mb-16 animate-fadeInUp">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 bg-amber-500 text-slate-950 font-technical text-sm tracking-wide font-bold">
              <span>PRECISION VALIDATION SYSTEM</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Why Does Printify Show<br />
              <span className="text-slate-300">Different DPI Than</span><br />
              My File Properties<span className="text-amber-400">?</span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                Upload your design and get a <strong className="text-white">clear explanation</strong> of your file's actual print quality at multiple print sizes.
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-emerald-400">Files never leave your browser</span>
                </span>
                <span className="opacity-40">•</span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
                  </svg>
                  No signup
                </span>
                <span className="opacity-40">•</span>
                <span className="font-technical text-xs text-amber-400">100% Free</span>
              </div>
            </div>
          </div>

          {/* Platform Selector & File Upload in Hero */}
          {!results && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Platform Selector */}
              <div className="bg-slate-900/50 backdrop-blur-sm border-2 border-slate-700 p-6 animate-fadeInUp animation-delay-100">
                <PlatformSelector
                  selectedPlatform={platform}
                  onPlatformChange={handlePlatformChange}
                />
              </div>

              {/* File Upload */}
              <div className="bg-slate-900/50 backdrop-blur-sm border-2 border-amber-500/50 p-8 animate-fadeInUp animation-delay-200">
                <FileUpload
                  onFileUpload={handleFileUpload}
                  isAnalyzing={isAnalyzing}
                  platform={platform}
                />
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        {!results ? (
          <div className="space-y-8">
            {/* Technical Briefing - Moved Below Upload */}
            <div className="corner-accent bg-slate-900/80 backdrop-blur-md border-2 border-amber-500 p-8 relative overflow-hidden animate-fadeInUp animation-delay-300">
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl">
                    ?
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      Why use this tool?
                    </h3>
                    <div className="space-y-3 text-slate-300">
                      <p className="leading-relaxed">
                        Confused when Printify shows <strong className="font-technical bg-amber-500/20 px-2 py-0.5 text-amber-300 border border-amber-500/30">258 DPI</strong> but your file properties say <strong className="font-technical bg-amber-500/20 px-2 py-0.5 text-amber-300 border border-amber-500/30">96 DPI</strong>?
                      </p>
                      <p className="leading-relaxed">
                        This tool explains the difference between <strong className="text-white">metadata DPI</strong> (just a stored number) and <strong className="text-white">effective DPI</strong> (actual print quality based on pixel dimensions).
                      </p>
                      <p className="leading-relaxed">
                        Upload your design to see exactly how it will print at different sizes on Printful, Printify, or other POD platforms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-amber-500">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5"/>
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5"/>
                </svg>
              </div>
            </div>

          </div>
        ) : (
          /* Validation Results */
          <ValidationResults
            results={results}
            platform={platform}
            onReset={handleReset}
          />
        )}

        {/* SEO Article - Educational content for organic traffic */}
        <SEOArticle />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-400">
                <span className="text-emerald-400 font-bold">✓</span> Free tool
                <span className="mx-2 text-slate-500">|</span>
                <span className="text-emerald-400 font-bold">✓</span> No signup required
                <span className="mx-2 text-slate-500">|</span>
                <span className="text-emerald-400 font-bold">✓</span> Files never leave your browser
              </p>
              <p className="text-xs text-slate-500">
                Built for Creative Fabrica's POD sellers • Validate files for Printify, Printful & more
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-technical">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-precisePulse"></div>
              <span>SYSTEM ONLINE</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
