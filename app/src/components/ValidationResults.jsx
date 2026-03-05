import { useState } from 'react'
import { generateShareableURL } from '../utils/validation'
import DPITable from './DPITable'
import CheckResult from './CheckResult'
import CreativeFabricaCTA from './CreativeFabricaCTA'

/**
 * ValidationResults Component
 *
 * Displays comprehensive validation results with:
 * - Multi-size DPI table
 * - Prescriptive explanations for each check
 * - Creative Fabrica CTA
 * - Share functionality
 */

export default function ValidationResults({ results, platform, onReset }) {
  const [shareSuccess, setShareSuccess] = useState(false)

  if (results.error) {
    return (
      <div className="bg-white border-4 border-rose-600 p-12 animate-fadeInUp">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-rose-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✗
          </div>
          <div className="inline-block px-4 py-1 bg-rose-600 text-white font-technical text-xs font-bold tracking-widest mb-4">
            VALIDATION ERROR
          </div>
          <h2 className="text-3xl font-bold text-slate-950 mb-6">Processing Failed</h2>
          <p className="text-slate-700 mb-8 leading-relaxed">{results.error}</p>
          <button
            onClick={onReset}
            className="btn-technical px-8 py-4 bg-slate-950 text-white font-technical font-bold tracking-wide hover:bg-slate-800 transition-all border-2 border-slate-950 hover:border-amber-500"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              TRY ANOTHER FILE
            </span>
          </button>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    const url = generateShareableURL(results)

    try {
      await navigator.clipboard.writeText(url)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 3000)

      // Analytics tracking for share
      if (window.gtag) {
        window.gtag('event', 'share', {
          event_category: 'engagement',
          event_label: results.overallPass ? 'pass' : 'fail',
          value: 1
        })
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Calculate score - use allPass for resolution to be strict
  const checksStatus = [
    results.checks.resolution.allPass || false,
    results.checks.format.pass || false,
    results.checks.fileSize.pass || false,
    results.checks.colorMode.pass || false
  ]
  const passedChecks = checksStatus.filter(check => check === true).length
  const totalChecks = checksStatus.length

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Consolidated Header: Score + Status + File Info */}
      <div className={`relative border-4 ${
        results.overallPass
          ? 'border-emerald-600 bg-emerald-50'
          : 'border-rose-600 bg-rose-50'
      }`}>
        {/* Diagonal stripe pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            currentColor,
            currentColor 10px,
            transparent 10px,
            transparent 20px
          )`
        }}></div>

        <div className="relative z-10">
          {/* Top: Score Banner */}
          <div className={`${
            results.overallPass ? 'bg-emerald-600' : 'bg-rose-600'
          } px-8 py-4 flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <div className="text-4xl font-bold font-technical">{passedChecks}</div>
                <div className="text-2xl font-technical opacity-75">/</div>
                <div className="text-4xl font-bold font-technical">{totalChecks}</div>
              </div>
              <div className="text-white font-technical text-sm">
                {passedChecks === totalChecks ? 'ALL CHECKS PASSED' : `${passedChecks} OF ${totalChecks} CHECKS PASSED`}
              </div>
            </div>
            <div className="px-4 py-1 bg-white/20 text-white font-technical text-xs font-bold tracking-widest">
              {results.overallPass ? 'PRINT-READY' : 'NEEDS FIXES'}
            </div>
          </div>

          {/* Bottom: Status + File Info */}
          <div className="p-8">
            <div className="flex items-start gap-6">
              {/* Large status indicator */}
              <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                results.overallPass ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {results.overallPass ? '✓' : '✗'}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-950 mb-3">
                  {results.overallPass ? 'File Verified Print-Ready' : 'Corrections Required'}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700 font-technical">
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500">FILE:</span>
                    <span className="font-bold">{results.fileName}</span>
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500">DIMENSIONS:</span>
                    <span className="font-bold">{results.imageWidth}×{results.imageHeight}px</span>
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500">PLATFORM:</span>
                    <span className="font-bold">{results.platformName}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Size DPI Display - KEY DIFFERENTIATOR */}
      <div className="bg-white border-2 border-slate-900 animation-delay-100 animate-fadeInUp">
        {/* Header Banner */}
        <div className="bg-slate-950 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-amber-400 font-technical text-2xl font-bold">DPI</div>
            <div className="text-white font-bold text-lg">Multi-Size Print Analysis</div>
          </div>
          {!results.isSVG && (
            <div className="text-amber-400 text-sm font-technical">
              Effective DPI = pixels ÷ print size
            </div>
          )}
        </div>

        {/* DPI Table */}
        <div className="p-8">
          <DPITable dpiResults={results.dpiResults} />
        </div>
      </div>

      {/* Detailed Validation Checks with Prescriptive Explanations */}
      <div className="bg-white border-2 border-slate-900 animation-delay-200 animate-fadeInUp">
        {/* Header Banner */}
        <div className="bg-slate-950 px-8 py-4">
          <h3 className="text-white font-bold text-lg">
            Detailed Validation Report
          </h3>
        </div>

        <div className="p-8 space-y-6">
          {/* Resolution Check */}
          <CheckResult
            title="Resolution"
            pass={results.checks.resolution.pass}
            allPass={results.checks.resolution.allPass}
          >
            {results.checks.resolution.pass ? (
              <div>
                <p className="text-gray-700 mb-2">
                  Your file is {results.imageWidth}x{results.imageHeight} pixels.
                </p>
                {results.isSVG ? (
                  <div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-sm text-blue-900">
                        <strong>SVG Note:</strong> Vector files scale infinitely without losing quality.
                        Your SVG will look sharp at any print size.
                      </p>
                    </div>
                    {results.svgDimensionWarning && (
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mt-2">
                        <p className="text-sm text-yellow-900">
                          <strong>⚠️ Dimension Warning:</strong> {results.svgDimensionWarning}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {results.bestSize && (
                      <p className="text-gray-700 mb-2">
                        <strong>Recommended maximum print size:</strong> Up to {results.bestSize.label} at {results.bestSize.dpi} DPI
                      </p>
                    )}
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-sm text-blue-900 mb-2">
                        <strong>Why this works:</strong> Effective DPI = pixels ÷ print dimensions
                      </p>
                      <p className="text-sm text-blue-900 mb-2">
                        For 10" width: {results.imageWidth}px ÷ 10" = {Math.round(results.imageWidth / 10)} DPI
                      </p>
                      <p className="text-sm text-blue-900">
                        <strong>Important:</strong> The metadata DPI in file properties is just a stored number and doesn't affect actual print quality. What matters is your pixel dimensions relative to the print size.
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                <p className="text-gray-700 mb-2">
                  Your file is {results.imageWidth}x{results.imageHeight} pixels.
                </p>
                <p className="text-red-700 font-medium mb-3">
                  This resolution is too low for quality prints at standard sizes.
                </p>
                <div className="bg-red-50 p-4 rounded border border-red-200">
                  <p className="text-sm font-semibold text-red-900 mb-2">How to fix:</p>
                  <ul className="text-sm text-red-900 space-y-2 ml-4 list-disc">
                    <li>
                      <strong>Recreate your design at higher resolution:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>For 8x10" prints: minimum 2400x3000px (300 DPI)</li>
                        <li>For 11x14" prints: minimum 3300x4200px (300 DPI)</li>
                        <li>For 16x20" prints: minimum 4800x6000px (300 DPI)</li>
                      </ul>
                    </li>
                    <li><strong>Or print at a smaller size:</strong> Check the table above to find the largest size that passes for your current dimensions</li>
                  </ul>
                  <p className="text-sm text-red-900 mt-3 font-semibold">
                    ⚠️ Important: You cannot simply "upscale" a low-resolution image using editing software. This doesn't add real detail - you must recreate your design at the proper pixel dimensions from the start to get sharp prints.
                  </p>
                </div>
              </div>
            )}
          </CheckResult>

          {/* Format Check */}
          <CheckResult
            title="File Format"
            pass={results.checks.format.pass}
          >
            {results.checks.format.pass ? (
              <div>
                <p className="text-gray-700 mb-2">
                  Your file is {results.checks.format.actual} format.
                </p>
                <p className="text-green-700">
                  ✓ Accepted by {results.platformName}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-red-700 mb-2">
                  Your file is {results.checks.format.actual}, but {results.platformName} requires:
                  {' '}{results.checks.format.expected}
                </p>
                <div className="bg-red-50 p-4 rounded border border-red-200">
                  <p className="text-sm font-semibold text-red-900 mb-2">How to fix:</p>
                  <p className="text-sm text-red-900">
                    Export your design in one of these formats: {results.checks.format.expected}
                  </p>
                </div>
              </div>
            )}
          </CheckResult>

          {/* File Size Check */}
          <CheckResult
            title="File Size"
            pass={results.checks.fileSize.pass}
          >
            {results.checks.fileSize.pass ? (
              <div>
                <p className="text-gray-700 mb-2">
                  Your file is {results.fileSizeMB} MB.
                </p>
                <p className="text-green-700">
                  ✓ Well within {results.platformName}'s {results.checks.fileSize.maxMB} MB limit
                </p>
              </div>
            ) : (
              <div>
                <p className="text-red-700 mb-2">
                  Your file is {results.fileSizeMB} MB, which exceeds {results.platformName}'s{' '}
                  {results.checks.fileSize.maxMB} MB limit.
                </p>
                <div className="bg-red-50 p-4 rounded border border-red-200">
                  <p className="text-sm font-semibold text-red-900 mb-2">How to fix:</p>
                  <ul className="text-sm text-red-900 space-y-1 ml-4 list-disc">
                    <li>Compress your image using tools like TinyPNG or Photoshop's "Save for Web"</li>
                    <li>Reduce image dimensions if they're larger than necessary</li>
                    <li>For PNG files, try converting to JPG (if transparency isn't needed)</li>
                  </ul>
                </div>
              </div>
            )}
          </CheckResult>

          {/* Color Mode Check */}
          <CheckResult
            title="Color Mode"
            pass={results.checks.colorMode.pass}
          >
            <div>
              <p className="text-gray-700 mb-2">
                Your file is in {results.checks.colorMode.actual} color space.
              </p>
              <p className="text-green-700">
                ✓ Perfect for {results.platformName} and most POD services
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-2">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> If your file was in CMYK, you'd need to convert to RGB first.
                  Most design tools (Canva, Figma) export RGB by default.
                </p>
              </div>
            </div>
          </CheckResult>
        </div>
      </div>

      {/* Creative Fabrica CTA */}
      <CreativeFabricaCTA overallPass={results.overallPass} platform={results.platform} />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animation-delay-300 animate-fadeInUp">
        <button
          onClick={handleShare}
          aria-label="Share validation results"
          className="btn-technical flex-1 px-8 py-4 bg-slate-800 text-white font-technical font-bold tracking-wide hover:bg-slate-950 transition-all border-2 border-slate-950 hover:border-amber-500"
        >
          {shareSuccess ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              LINK COPIED
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              SHARE VALIDATION
            </span>
          )}
        </button>
        <button
          onClick={onReset}
          aria-label="Validate another file"
          className="btn-technical flex-1 px-8 py-4 bg-amber-500 text-slate-950 font-technical font-bold tracking-wide hover:bg-amber-400 transition-all border-2 border-slate-950"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            VALIDATE ANOTHER FILE
          </span>
        </button>
      </div>
    </div>
  )
}
