/**
 * CheckResult Component - Technical Precision Design
 *
 * Displays individual validation check results with technical styling.
 * Pass/fail status with prescriptive explanations in a blueprint-inspired layout.
 */

export default function CheckResult({ title, pass, allPass, children }) {
  const status = pass ? (allPass === false ? 'warning' : 'pass') : 'fail'

  const statusConfig = {
    pass: {
      border: 'border-emerald-600',
      bg: 'bg-emerald-50',
      indicator: 'bg-emerald-500',
      label: 'VERIFIED',
      labelBg: 'bg-emerald-600'
    },
    warning: {
      border: 'border-amber-600',
      bg: 'bg-amber-50',
      indicator: 'bg-amber-500',
      label: 'CAUTION',
      labelBg: 'bg-amber-600'
    },
    fail: {
      border: 'border-rose-600',
      bg: 'bg-rose-50',
      indicator: 'bg-rose-500',
      label: 'REJECTED',
      labelBg: 'bg-rose-600'
    }
  }

  const config = statusConfig[status]

  return (
    <div className={`relative border-2 ${config.border} ${config.bg} overflow-hidden`}>
      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] ${config.labelBg}`}></div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Status indicator */}
          <div className="flex-shrink-0 pt-1">
            <div className={`w-6 h-6 rounded-full ${config.indicator} flex items-center justify-center`}>
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
          </div>

          <div className="flex-1">
            {/* Title with status badge */}
            <div className="flex items-center gap-3 mb-4">
              <h4 className="font-bold text-slate-950 text-lg tracking-tight">
                {title}
              </h4>
              <span className={`px-3 py-1 ${config.labelBg} text-white text-xs font-technical font-bold tracking-wider`}>
                {config.label}
              </span>
            </div>

            {/* Content */}
            <div className="text-slate-700 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom measurement line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-slate-300"></div>
    </div>
  )
}
