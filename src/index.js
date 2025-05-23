console.log('[DEBUG] src/index.js started');

/**
 * Toratech AI Pop-out Chat Widget - Main Entry Point
 * @version 1.0.0
 * @license MIT
 */

// Import the widget API
import { MyPopoutWidget } from './toratech-widget.js';
import { NAMESPACE, VERSION } from './widget-constants.js';

// Initialize widget when DOM is ready
function initializeWidget() {
  console.log('[Toratech AI] Initializing widget...');
  
  // Initialize the widget with any config from the window
  if (window.ChatWidgetConfig) {
    MyPopoutWidget.init(window.ChatWidgetConfig);
  } else {
    MyPopoutWidget.init({});
  }
  
  // Ensure the widget is exposed globally
  window.MyPopoutWidget = MyPopoutWidget;
  window[NAMESPACE] = MyPopoutWidget;
  
  console.log('[Toratech AI] Widget initialized and API exposed globally');
  return MyPopoutWidget;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWidget);
} else {
  initializeWidget();
}

// Export for module systems
export default window.MyPopoutWidget;
