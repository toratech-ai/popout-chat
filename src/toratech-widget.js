/**
 * Toratech AI Chat Widget
 * A lightweight, embeddable chat widget for customer support
 * @version 1.0.0
 * @license MIT
 */

import { NAMESPACE, CONFIG_KEY, VERSION, WIDGET_ID, TOGGLE_ID, CONTAINER_ID, STYLES_ID } from './widget-constants.js';
import { DEFAULT_CONFIG } from './widget-default-config.js';
import { WIDGET_STYLES } from './widget-styles.js';
import { deepMerge, isObject, log as logUtil, generateSessionId } from './widget-utils.js';
import { injectStyles, createWidgetElements, addMessageToDisplay } from './widget-dom.js';
import { startNewConversation, sendMessage } from './widget-chat-operations.js';

// Use strict mode
'use strict';

// Module-level variables
let currentSessionId = '';
let widgetElements = null;
let config = { ...DEFAULT_CONFIG };
let isInitialized = false;

// Initialize config if in browser environment
if (typeof window !== 'undefined' && window[CONFIG_KEY]) {
  config = deepMerge({}, DEFAULT_CONFIG, window[CONFIG_KEY]);
}

// Wrapper for the log function to include config
function log(message, type = 'info') {
  logUtil(message, type, config);
}

// Wrapper for setting the current session ID
function setCurrentSessionId(sessionId) {
  currentSessionId = sessionId;
}

// Initialize the widget
function init(customConfig) {
  if (isInitialized) {
    log('Widget already initialized');
    return widgetElements;
  }
  
  // Apply custom config if provided
  if (customConfig) {
    config = deepMerge({}, config, customConfig);
  }
  
  log('Initializing widget');
  injectStyles(config, WIDGET_STYLES, STYLES_ID, log);
  widgetElements = createWidgetElements(config, WIDGET_ID, TOGGLE_ID, CONTAINER_ID, log);
  
  // Attach event listeners
  widgetElements.toggleButton.addEventListener('click', () => {
    const isOpening = !widgetElements.chatContainer.classList.contains('open');
    widgetElements.chatContainer.classList.toggle('open');
    
    // If opening, focus on the first interactive element
    if (isOpening) {
      // Focus on new chat button or textarea depending on which view is active
      if (widgetElements.chatInterface.classList.contains('active')) {
        widgetElements.textarea.focus();
      } else {
        widgetElements.newChatBtn.focus();
      }
    }
    
    log('Widget toggled via click');
  });
  
  // Add keyboard support for toggle button
  widgetElements.toggleButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isOpening = !widgetElements.chatContainer.classList.contains('open');
      widgetElements.chatContainer.classList.toggle('open');
      
      // If opening, focus on the first interactive element
      if (isOpening) {
        // Focus on new chat button or textarea depending on which view is active
        if (widgetElements.chatInterface.classList.contains('active')) {
          widgetElements.textarea.focus();
        } else {
          widgetElements.newChatBtn.focus();
        }
      }
      
      log('Widget toggled via keyboard');
    }
  });
  
  // Add ESC key support to close the widget
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widgetElements.chatContainer.classList.contains('open')) {
      widgetElements.chatContainer.classList.remove('open');
      widgetElements.toggleButton.focus();
      log('Widget closed via ESC key');
    }
  });
  
  widgetElements.newChatBtn.addEventListener('click', () => {
    startNewConversation(widgetElements, generateSessionId, setCurrentSessionId, addMessageToDisplay, log);
  });
  
  widgetElements.sendButton.addEventListener('click', () => {
    const message = widgetElements.textarea.value.trim();
    if (message) {
      sendMessage(widgetElements, message, addMessageToDisplay, log, config);
      widgetElements.textarea.value = '';
    }
  });
  
  widgetElements.textarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const message = widgetElements.textarea.value.trim();
      if (message) {
        sendMessage(widgetElements, message, addMessageToDisplay, log, config);
        widgetElements.textarea.value = '';
      }
    }
  });
  
  // Add close button handlers
  widgetElements.closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      widgetElements.chatContainer.classList.remove('open');
      // Return focus to toggle button when closing the chat
      widgetElements.toggleButton.focus();
      log('Widget closed via click');
    });
    
    // Add keyboard support for close buttons
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        widgetElements.chatContainer.classList.remove('open');
        // Return focus to toggle button when closing the chat
        widgetElements.toggleButton.focus();
        log('Widget closed via keyboard');
      }
    });
  });
  
  isInitialized = true;
  log('Widget initialized');
  return widgetElements;
}

// Close the widget programmatically
function close() {
  if (!isInitialized || !widgetElements) {
    log('Cannot close: widget not initialized', 'error');
    return false;
  }
  
  widgetElements.chatContainer.classList.remove('open');
  log('Widget closed via API');
  return true;
}

// Destroy the widget completely
function destroy() {
  if (!isInitialized) {
    log('Cannot destroy: widget not initialized', 'error');
    return false;
  }
  
  const widget = document.querySelector(`.${WIDGET_ID}`);
  if (widget) {
    widget.remove();
    isInitialized = false;
    widgetElements = null;
    log('Widget destroyed');
    return true;
  }
  
  return false;
}

// Public API object
const MyPopoutWidget = {
  init: (customConfig) => {
    return init(customConfig);
  },
  // These methods are intentionally disabled to ensure the widget
  // can only be opened by clicking the popout button
  open: () => {
    log('Widget.open() is disabled - widget can only be opened via the popout button', 'error');
    return false;
  },
  close: () => close(),
  toggle: () => {
    log('Widget.toggle() is disabled - widget can only be toggled via the popout button', 'error');
    return false;
  },
  destroy: () => destroy(),
  version: VERSION
};

// Auto-initialize if configured
if (typeof window !== 'undefined') {
  // Expose the API globally
  window.MyPopoutWidget = MyPopoutWidget;
  window[NAMESPACE] = MyPopoutWidget;
  
  // Auto-initialize if configured
  if (config.advanced.autoInit) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => init());
    } else {
      init();
    }
  }
}

// Export for ES modules
export { MyPopoutWidget };
