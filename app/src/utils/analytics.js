/**
 * Analytics Tracking Utility
 *
 * Tracks key user interactions for the Print-Ready Validator:
 * - Unique visitors (localStorage-based)
 * - Platform selection
 * - Upload engagement
 * - File validations
 * - Free trial clicks
 *
 * Integrates with Google Analytics (gtag) if available
 */

// Generate a simple unique visitor ID
const getVisitorId = () => {
  const VISITOR_ID_KEY = 'print_validator_visitor_id'
  let visitorId = localStorage.getItem(VISITOR_ID_KEY)

  if (!visitorId) {
    // Generate simple ID: timestamp + random
    visitorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem(VISITOR_ID_KEY, visitorId)
  }

  return visitorId
}

// Check if this is a new visitor (first session)
const isNewVisitor = () => {
  const FIRST_VISIT_KEY = 'print_validator_first_visit'
  const firstVisit = localStorage.getItem(FIRST_VISIT_KEY)

  if (!firstVisit) {
    localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString())
    return true
  }

  return false
}

// Track session start
const trackSessionStart = () => {
  const SESSION_KEY = 'print_validator_session_start'
  const sessionStart = sessionStorage.getItem(SESSION_KEY)

  if (!sessionStart) {
    sessionStorage.setItem(SESSION_KEY, new Date().toISOString())

    // Track to GA if available
    if (window.gtag) {
      window.gtag('event', 'session_start', {
        event_category: 'engagement',
        visitor_id: getVisitorId(),
        is_new_visitor: isNewVisitor()
      })
    }

    // Console log for debugging
    console.log('[Analytics] Session started', {
      visitorId: getVisitorId(),
      isNew: isNewVisitor()
    })
  }
}

// Generic event tracking
export const trackEvent = (eventName, properties = {}) => {
  const eventData = {
    ...properties,
    visitor_id: getVisitorId(),
    timestamp: new Date().toISOString()
  }

  // Send to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', eventName, eventData)
  }

  // Console log for debugging (remove in production)
  console.log(`[Analytics] ${eventName}`, eventData)

  // Future: Could send to custom analytics endpoint
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(eventData) })
}

// Platform selection
export const trackPlatformSelected = (platform) => {
  trackEvent('platform_selected', {
    event_category: 'engagement',
    platform: platform,
    event_label: platform
  })
}

// Upload initiated (user clicked upload or started drag/drop)
export const trackUploadInitiated = (method = 'click') => {
  trackEvent('upload_initiated', {
    event_category: 'engagement',
    method: method, // 'click' or 'drag_drop'
    event_label: method
  })
}

// File validated (validation completed successfully)
export const trackFileValidated = (validationData) => {
  const {
    platform,
    fileFormat,
    fileSizeMB,
    overallPass,
    validationScore,
    imageWidth,
    imageHeight
  } = validationData

  trackEvent('file_validated', {
    event_category: 'activation',
    platform: platform,
    file_format: fileFormat,
    file_size_mb: fileSizeMB,
    result: overallPass ? 'pass' : 'fail',
    validation_score: validationScore,
    image_width: imageWidth,
    image_height: imageHeight,
    event_label: `${platform}_${overallPass ? 'pass' : 'fail'}`
  })
}

// Free trial CTA clicked
export const trackTrialClicked = (validationState, platform) => {
  trackEvent('trial_clicked', {
    event_category: 'conversion',
    validation_state: validationState, // 'pass' or 'fail'
    platform: platform,
    event_label: `${platform}_${validationState}`,
    value: 1 // Value for conversion tracking
  })
}

// Browse designs link clicked (secondary CTA)
export const trackBrowseClicked = (validationState, platform) => {
  trackEvent('browse_clicked', {
    event_category: 'conversion',
    validation_state: validationState,
    platform: platform,
    event_label: `${platform}_${validationState}`
  })
}

// Reset/validate another file
export const trackReset = () => {
  trackEvent('reset_clicked', {
    event_category: 'engagement',
    event_label: 'validate_another'
  })
}

// Share results
export const trackShare = (validationState) => {
  trackEvent('share_clicked', {
    event_category: 'engagement',
    validation_state: validationState,
    event_label: validationState
  })
}

// Initialize analytics on app load
export const initAnalytics = () => {
  // Track session start
  trackSessionStart()

  // Track page view
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      visitor_id: getVisitorId()
    })
  }

  console.log('[Analytics] Initialized', {
    visitorId: getVisitorId(),
    isNewVisitor: isNewVisitor()
  })
}

// Get visitor stats (for debugging/admin)
export const getVisitorStats = () => {
  return {
    visitorId: getVisitorId(),
    isNewVisitor: isNewVisitor(),
    firstVisit: localStorage.getItem('print_validator_first_visit'),
    sessionStart: sessionStorage.getItem('print_validator_session_start')
  }
}
