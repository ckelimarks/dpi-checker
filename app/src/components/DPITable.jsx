/**
 * DPITable Component - Technical Precision Design
 *
 * Displays effective DPI at multiple print sizes.
 * This is the KEY DIFFERENTIATOR from calculator competitors.
 *
 * Shows users how their file will perform at common POD sizes with
 * precise, technical presentation.
 */

export default function DPITable({ dpiResults }) {
  return (
    <div className="relative">
      {/* Measurement marks decoration */}
      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-slate-200">
        {[0, 25, 50, 75, 100].map((pos) => (
          <div
            key={pos}
            className="absolute w-3 h-px bg-amber-500"
            style={{ top: `${pos}%`, left: 0 }}
          />
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-2 border-slate-900">
          <thead>
            <tr className="bg-slate-950 text-slate-100">
              <th className="text-left py-4 px-6 font-bold text-sm tracking-wide font-technical border-r border-slate-700">
                PRINT SIZE
              </th>
              <th className="text-left py-4 px-6 font-bold text-sm tracking-wide font-technical border-r border-slate-700">
                EFFECTIVE DPI
              </th>
              <th className="text-left py-4 px-6 font-bold text-sm tracking-wide font-technical">
                QUALITY STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {dpiResults.map((result, index) => (
              <tr
                key={result.label}
                className={`border-b border-slate-300 transition-colors hover:bg-slate-100 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <td className="py-4 px-6 font-technical font-bold text-slate-950 border-r border-slate-200">
                  {result.label}
                </td>
                <td className="py-4 px-6 font-technical text-lg text-slate-900 border-r border-slate-200">
                  <span className="inline-flex items-center gap-2">
                    <span className="font-bold">{result.dpi}</span>
                    <span className="text-sm text-slate-600">DPI</span>
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-2 font-medium ${
                    result.status === 'fail' ? 'text-rose-700' :
                    result.status === 'warning' ? 'text-amber-700' :
                    'text-emerald-700'
                  }`}>
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      result.status === 'fail' ? 'bg-rose-500' :
                      result.status === 'warning' ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}></span>
                    <span className="font-bold tracking-wide">{result.statusText.toUpperCase()}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technical grid overlay effect */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </div>
  )
}
