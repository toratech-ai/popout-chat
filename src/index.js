/**
 * ToRaTech Pop-out Chat Widget - Main Entry Point
 * @version 1.0.0
 * @license MIT
 */

// Import CSS styles
import './widget.css';

// Execute the widget code directly (since it's an IIFE, not a module)
require('./toratech-widget-cdn.js');

// The widget is already exposed as window.ToRaTechChat by the CDN script
// We'll create an alias for the requested API format
function initWidget(config) {
  if (window.ToRaTechChat && window.ToRaTechChat.init) {
    return window.ToRaTechChat.init(config);
  } else {
    console.error('ToRaTech Chat Widget not properly loaded');
  }
}

// Expose the global API as requested
window.MyPopoutWidget = {
  init: initWidget,
  // Also expose other useful methods
  open: () => window.ToRaTechChat?.open(),
  close: () => window.ToRaTechChat?.close(),
  destroy: () => window.ToRaTechChat?.destroy(),
  updateConfig: (config) => window.ToRaTechChat?.updateConfig(config),
  getConfig: () => window.ToRaTechChat?.getConfig(),
  version: window.ToRaTechChat?.version || '1.0.0'
};

// Export for module systems (but the main API is on window.MyPopoutWidget)
export default window.MyPopoutWidget;
