/**
 * SEOArticle Component
 *
 * Educational content below the tool to drive organic traffic.
 * Targets keywords: "300 dpi converter", "dpi checker tool", "printify dpi",
 * "printful dpi", "metadata dpi vs effective dpi", "print ready checker"
 */

export default function SEOArticle() {
  return (
    <article className="mt-16 pt-16 border-t-2 border-slate-700">
      {/* Article Header */}
      <header className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Complete Guide to DPI for Print-on-Demand
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Everything POD sellers need to know about resolution, DPI, and getting print-ready files for Printify, Printful, and other platforms.
        </p>
      </header>

      <div className="prose prose-invert prose-lg max-w-4xl mx-auto">
        {/* Section 1: The DPI Confusion */}
        <section className="mb-12 bg-slate-900/50 border-2 border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-950 flex items-center justify-center text-sm font-bold">1</span>
            Why Does Printify Show Different DPI Than My File Properties?
          </h3>

          <p className="text-slate-300 mb-4">
            This is the most common question from POD sellers. You check your image properties on your computer and see <strong className="text-white">96 DPI</strong>, but Printify shows <strong className="text-white">258 DPI</strong>. Which is correct?
          </p>

          <p className="text-slate-300 mb-4">
            <strong className="text-white">Both are correct</strong> — they're just measuring different things:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-slate-800 p-6 border border-slate-600">
              <h4 className="font-bold text-amber-300 mb-2">Metadata DPI</h4>
              <p className="text-slate-400 text-sm mb-2">
                The number stored in your file's properties (often 72 or 96 DPI). This is just a tag — it doesn't affect image quality.
              </p>
              <p className="text-slate-500 text-xs font-technical">
                WHERE: File Properties → Details → Resolution
              </p>
            </div>

            <div className="bg-slate-800 p-6 border border-amber-500">
              <h4 className="font-bold text-amber-300 mb-2">Effective DPI</h4>
              <p className="text-slate-400 text-sm mb-2">
                The actual print quality, calculated from your pixel dimensions and print size. This is what matters for sharp prints.
              </p>
              <p className="text-emerald-400 text-xs font-technical">
                FORMULA: Pixels ÷ Print Inches = Effective DPI
              </p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded">
            <p className="text-amber-200 text-sm">
              <strong>Example:</strong> A 3000×3000 pixel image at metadata DPI of 72 will print at 300 DPI when printed at 10×10 inches (3000 ÷ 10 = 300). The metadata doesn't matter — only your pixel dimensions do.
            </p>
          </div>
        </section>

        {/* Section 2: What DPI Do You Need */}
        <section className="mb-12 bg-slate-900/50 border-2 border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-950 flex items-center justify-center text-sm font-bold">2</span>
            What DPI Do You Actually Need for Print-on-Demand?
          </h3>

          <p className="text-slate-300 mb-4">
            The industry standard for high-quality prints is <strong className="text-white">300 DPI</strong>. But here's what that means in practice:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-amber-400 font-technical">Print Size</th>
                  <th className="text-left py-3 px-4 text-amber-400 font-technical">Minimum Pixels (300 DPI)</th>
                  <th className="text-left py-3 px-4 text-amber-400 font-technical">Common Use</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4">4×6"</td>
                  <td className="py-3 px-4 font-technical">1200×1800px</td>
                  <td className="py-3 px-4">Postcards, small prints</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4">8×10"</td>
                  <td className="py-3 px-4 font-technical">2400×3000px</td>
                  <td className="py-3 px-4">Standard prints, t-shirt designs</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4">11×14"</td>
                  <td className="py-3 px-4 font-technical">3300×4200px</td>
                  <td className="py-3 px-4">Posters, wall art</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4">16×20"</td>
                  <td className="py-3 px-4 font-technical">4800×6000px</td>
                  <td className="py-3 px-4">Large posters</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">24×36"</td>
                  <td className="py-3 px-4 font-technical">7200×10800px</td>
                  <td className="py-3 px-4">Large format prints</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded">
            <p className="text-emerald-200 text-sm">
              <strong>Pro tip:</strong> For t-shirts and apparel, many POD sellers use 4500×5400px as a safe default. This gives 300 DPI at 15×18" — larger than most print areas.
            </p>
          </div>
        </section>

        {/* Section 3: Platform Requirements */}
        <section className="mb-12 bg-slate-900/50 border-2 border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-950 flex items-center justify-center text-sm font-bold">3</span>
            Printify vs Printful: DPI Requirements Compared
          </h3>

          <p className="text-slate-300 mb-6">
            Different print-on-demand platforms have slightly different requirements. Here's what you need to know:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 border border-slate-600">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Printify Requirements
              </h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><strong className="text-slate-200">Minimum DPI:</strong> 300 DPI recommended</li>
                <li><strong className="text-slate-200">File Formats:</strong> PNG, JPG</li>
                <li><strong className="text-slate-200">Max File Size:</strong> 100 MB</li>
                <li><strong className="text-slate-200">Color Mode:</strong> RGB (sRGB preferred)</li>
                <li><strong className="text-slate-200">Transparency:</strong> PNG with transparency supported</li>
              </ul>
            </div>

            <div className="bg-slate-800 p-6 border border-slate-600">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Printful Requirements
              </h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><strong className="text-slate-200">Minimum DPI:</strong> 150 DPI (300 recommended)</li>
                <li><strong className="text-slate-200">File Formats:</strong> PNG, JPG, SVG</li>
                <li><strong className="text-slate-200">Max File Size:</strong> 200 MB</li>
                <li><strong className="text-slate-200">Color Mode:</strong> RGB</li>
                <li><strong className="text-slate-200">Transparency:</strong> PNG with transparency supported</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 p-4 rounded">
            <p className="text-blue-200 text-sm">
              <strong>Note:</strong> While Printful accepts 150 DPI, we recommend always designing at 300 DPI. This gives you flexibility to use your designs across multiple platforms and product sizes.
            </p>
          </div>
        </section>

        {/* Section 4: Common Mistakes */}
        <section className="mb-12 bg-slate-900/50 border-2 border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-950 flex items-center justify-center text-sm font-bold">4</span>
            5 Common DPI Mistakes POD Sellers Make
          </h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white flex items-center justify-center text-sm font-bold rounded-full">✗</div>
              <div>
                <h4 className="font-bold text-white mb-1">Upscaling Low-Resolution Images</h4>
                <p className="text-slate-400 text-sm">
                  You can't add detail that isn't there. Scaling a 500×500px image to 3000×3000px just makes the pixels bigger — it doesn't improve quality. Always start with high-resolution source files.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white flex items-center justify-center text-sm font-bold rounded-full">✗</div>
              <div>
                <h4 className="font-bold text-white mb-1">Trusting Metadata DPI</h4>
                <p className="text-slate-400 text-sm">
                  Checking "Image Properties" and seeing "300 DPI" doesn't mean your file will print at 300 DPI. That number is just metadata. Calculate effective DPI using: Pixels ÷ Print Inches.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white flex items-center justify-center text-sm font-bold rounded-full">✗</div>
              <div>
                <h4 className="font-bold text-white mb-1">Using CMYK Color Mode</h4>
                <p className="text-slate-400 text-sm">
                  Most POD platforms require RGB color mode, not CMYK. If your file is CMYK, colors may shift unexpectedly. Most design tools (Canva, Figma, Photoshop web) export RGB by default.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white flex items-center justify-center text-sm font-bold rounded-full">✗</div>
              <div>
                <h4 className="font-bold text-white mb-1">Ignoring Print Area vs Canvas Size</h4>
                <p className="text-slate-400 text-sm">
                  A t-shirt might have a 15×18" print area, but your design might only use 10×12" of that. Calculate DPI based on your actual design dimensions, not the maximum print area.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white flex items-center justify-center text-sm font-bold rounded-full">✗</div>
              <div>
                <h4 className="font-bold text-white mb-1">Designing at Screen Resolution</h4>
                <p className="text-slate-400 text-sm">
                  Screens display at 72-96 DPI. Designing something that "looks good on screen" doesn't mean it's print-ready. Always set your canvas to the final pixel dimensions needed for print.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: How to Check */}
        <section className="mb-12 bg-slate-900/50 border-2 border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-950 flex items-center justify-center text-sm font-bold">5</span>
            How to Check If Your Design Is Print-Ready
          </h3>

          <p className="text-slate-300 mb-6">
            Before uploading to Printify, Printful, or any POD platform, verify your file meets these requirements:
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-slate-300">
              <span className="w-6 h-6 bg-emerald-500 text-white flex items-center justify-center text-xs font-bold rounded-full">✓</span>
              <span><strong className="text-white">Resolution:</strong> Minimum 2400×3000px for standard products (8×10" at 300 DPI)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="w-6 h-6 bg-emerald-500 text-white flex items-center justify-center text-xs font-bold rounded-full">✓</span>
              <span><strong className="text-white">File Format:</strong> PNG for transparency, JPG for photos, SVG for vectors</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="w-6 h-6 bg-emerald-500 text-white flex items-center justify-center text-xs font-bold rounded-full">✓</span>
              <span><strong className="text-white">Color Mode:</strong> RGB (sRGB color profile for best results)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="w-6 h-6 bg-emerald-500 text-white flex items-center justify-center text-xs font-bold rounded-full">✓</span>
              <span><strong className="text-white">File Size:</strong> Under 100 MB for most platforms</span>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded">
            <p className="text-amber-200 text-sm">
              <strong>Use our free tool above</strong> to instantly check all these requirements. Just upload your file and get a detailed report showing exactly what passes and what needs fixing.
            </p>
          </div>
        </section>

        {/* Section 6: SVG Files */}
        <section className="mb-12 bg-slate-900/50 border-2 border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-950 flex items-center justify-center text-sm font-bold">6</span>
            What About SVG Files? Do They Have DPI?
          </h3>

          <p className="text-slate-300 mb-4">
            SVG (Scalable Vector Graphics) files are different. They're made of mathematical shapes, not pixels, which means:
          </p>

          <ul className="text-slate-300 space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">→</span>
              <span><strong className="text-white">No DPI limit:</strong> SVGs can scale to any size without losing quality</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">→</span>
              <span><strong className="text-white">Always print-ready:</strong> A properly made SVG will look sharp at any print size</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">→</span>
              <span><strong className="text-white">Smaller file sizes:</strong> Usually much smaller than equivalent PNG files</span>
            </li>
          </ul>

          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded">
            <p className="text-blue-200 text-sm">
              <strong>Caveat:</strong> Not all SVGs are truly vector. Some contain embedded raster images, which defeats the purpose. Our validator will check if your SVG has proper viewBox dimensions for print.
            </p>
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section className="mb-12 bg-slate-900/50 border-2 border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-950 flex items-center justify-center text-sm font-bold">?</span>
            Frequently Asked Questions
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-white mb-2">Can I convert a 72 DPI image to 300 DPI?</h4>
              <p className="text-slate-400 text-sm">
                Not really. Changing the metadata DPI in Photoshop doesn't add pixels. To truly have 300 DPI at a given print size, you need the corresponding pixel dimensions. A 1000×1000px image will print at 300 DPI at 3.33" — no amount of metadata changes can make it print sharply at 10".
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2">Why does my image look fine on screen but blurry when printed?</h4>
              <p className="text-slate-400 text-sm">
                Screens display at 72-96 pixels per inch. Prints need 300 pixels per inch. An image that looks great on a screen might have 3-4x fewer pixels than needed for a sharp print at the same physical size.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2">What's the minimum acceptable DPI for print-on-demand?</h4>
              <p className="text-slate-400 text-sm">
                While 300 DPI is the gold standard, 150-200 DPI can be acceptable for products viewed from a distance (large posters, blankets). For t-shirts, mugs, and items viewed up close, stick to 300 DPI minimum.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2">Do I need to worry about DPI for sublimation printing?</h4>
              <p className="text-slate-400 text-sm">
                Yes! Sublimation (used for mugs, mousepads, all-over print apparel) follows the same DPI rules. The resolution requirements may vary by provider, but 300 DPI remains the safe standard.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2">How do I create higher resolution designs from scratch?</h4>
              <p className="text-slate-400 text-sm">
                Set your canvas size to the final pixel dimensions before you start designing. In Photoshop, create a new document at 4500×5400px for apparel. In Canva, use "Custom Size" and enter pixel dimensions. Design at full resolution from the start.
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-2 border-amber-500 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Validate Your Design?
          </h3>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Use our free print-ready checker above to instantly validate your files for Printify, Printful, and other POD platforms. No signup required.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-technical px-8 py-4 bg-amber-500 text-slate-950 font-technical font-bold tracking-wide hover:bg-amber-400 transition-all border-2 border-slate-950"
          >
            ↑ CHECK YOUR FILE NOW
          </button>
        </section>
      </div>
    </article>
  )
}
