/**
 * PlatformSelector Component
 *
 * Allows users to select the POD platform they're validating for.
 * Each platform has different DPI requirements and file size limits.
 *
 * Platforms:
 * - Printful: 150+ DPI acceptable (warns <300), 200 MB max
 * - Printify: 300+ DPI required, 100 MB max
 * - General: 300+ DPI standard print-ready requirement
 */

const PLATFORMS = [
  {
    id: 'printful',
    name: 'Printful',
    description: '150+ DPI acceptable, 200 MB max',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFUR3iLuh9QlvP5fURlY9Fxj1U4GAz2PiZ0w&s'
  },
  {
    id: 'printify',
    name: 'Printify',
    description: '300+ DPI required, SVG supported, 100 MB max',
    logo: 'https://images.seeklogo.com/logo-png/62/2/printify-logo-png_seeklogo-622549.png'
  },
  {
    id: 'general',
    name: 'General Print-Ready',
    description: '300+ DPI standard requirement',
    logo: null // Will use a custom icon
  }
]

export default function PlatformSelector({ selectedPlatform, onPlatformChange }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">
        Select Your Platform
      </h2>
      <p className="text-slate-300 mb-4">
        Choose the POD service you're validating for. Each platform has different requirements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="group" aria-label="Platform selection">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            aria-pressed={selectedPlatform === platform.id}
            aria-label={`Select ${platform.name}: ${platform.description}`}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              selectedPlatform === platform.id
                ? 'border-amber-500 bg-white shadow-lg scale-105'
                : 'border-slate-700 bg-white hover:border-amber-500/50 hover:shadow-md'
            }`}
          >
            <div className="h-32 mb-4 flex items-center justify-center">
              {platform.logo ? (
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className="h-28 max-w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
              ) : (
                <svg className="w-24 h-24 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {platform.logo && (
                <span style={{ display: 'none' }} className="text-2xl">{platform.id === 'printful' ? '🖨️' : '🎨'}</span>
              )}
            </div>
            <div className="font-semibold text-slate-900 mb-2">
              {platform.name}
            </div>
            <div className="text-sm text-slate-600">
              {platform.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
