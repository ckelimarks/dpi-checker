import { trackTrialClicked, trackBrowseClicked } from '../utils/analytics'

/**
 * CreativeFabricaCTA Component
 *
 * Call-to-action linking to Creative Fabrica marketplace.
 * Different messaging based on validation pass/fail state.
 *
 * Pass state: Upsell more designs
 * Fail state: Offer professionally-designed files
 */

export default function CreativeFabricaCTA({ overallPass, platform = 'general' }) {
  const state = overallPass ? 'pass' : 'fail'

  const handleTrialClick = () => {
    trackTrialClicked(state, platform)
  }

  const handleBrowseClick = () => {
    trackBrowseClicked(state, platform)
  }

  const primaryUrl = `https://www.creativefabrica.com/subscribe/?utm_source=dpi_validator&utm_medium=cta&utm_campaign=free_trial&utm_content=${state}`
  const browseUrl = 'https://www.creativefabrica.com/print-on-demand/?license=commercial&utm_source=dpi_validator&utm_campaign=browse_first'

  return (
    <div className={`rounded-lg shadow-md p-6 ${
      overallPass ? 'bg-green-50 border-2 border-green-200' : 'bg-orange-50 border-2 border-orange-200'
    }`}>
      {overallPass ? (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Your file is ready! 🎉
          </h3>
          <p className="text-gray-700 mb-4">
            Scale your shop faster. Get 10 free downloads of winning designs with Creative Fabrica's trial.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Launch 10+ products today - unlimited downloads during trial</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Zero design headaches - all files guaranteed print-ready</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Keep your margins - only $3.99/mo after trial</span>
            </li>
          </ul>
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTrialClick}
            className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-lg"
          >
            Start Free Trial - Get 10 Downloads
          </a>
          <p className="text-sm text-gray-600 text-center mt-3">
            Try free now • or{' '}
            <a
              href={browseUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBrowseClick}
              className="text-green-700 hover:text-green-800 underline"
            >
              browse the POD library first
            </a>
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Need print-ready files that just work?
          </h3>
          <p className="text-gray-700 mb-4">
            Skip the frustration. Get files that are guaranteed to work with 10 free downloads from Creative Fabrica's trial.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">No more failed prints - every file validated for POD</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Launch products faster - 12M+ ready-to-use designs</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Start free, scale cheap - 10 downloads free, then $3.99/mo</span>
            </li>
          </ul>
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTrialClick}
            className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all font-semibold shadow-lg"
          >
            Start Free Trial - Get 10 Downloads
          </a>
          <p className="text-sm text-gray-600 text-center mt-3">
            Try free now • or{' '}
            <a
              href={browseUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBrowseClick}
              className="text-orange-700 hover:text-orange-800 underline"
            >
              browse print-ready designs first
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
