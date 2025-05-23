/**
 * ToRaTech Chat Widget - CDN Version
 * @version 1.0.0
 * @license MIT
 *
 * Single-file, zero-dependency chat widget for easy CDN distribution
 * Usage: <script src="https://cdn.toratech.com/chat/v1/widget.min.js"></script>
 *
 * Note: Webhook configuration is managed by ToRaTech and cannot be customized.
 * Users can only configure branding, styling, and advanced options.
 */

(function(window, document) {
  'use strict';

  // Namespace to avoid global conflicts
  const NAMESPACE = 'ToRaTechChat';
  const CONFIG_KEY = 'ChatWidgetConfig';
  const VERSION = '1.0.0';
  
  // PROTECTED: Webhook configuration is controlled by ToRaTech and cannot be overridden
  const TORATECH_WEBHOOK = {
    url: 'https://luccatora.app.n8n.cloud/webhook/e20c3a9c-8b20-4e47-82c4-61bb7207b07e/chat',
    route: 'general'
  };

  // Default configuration (webhook is always hardcoded above)
  const DEFAULT_CONFIG = {
    branding: {
      logo: 'https://cdn.toratech.com/assets/default-logo.png',
      name: 'ToRaTech Support',
      welcomeText: 'Hi there! 👋 How can I assist you today?',
      responseTimeText: 'We typically respond quickly.'
    },
    style: {
      primaryColor: '#338AFF',
      secondaryColor: '#2072E8',
      position: 'right',
      backgroundColor: '#ffffff',
      fontColor: '#333333'
    },
    advanced: {
      autoInit: true,
      debug: false,
      zIndex: 9999,
      storageKey: 'toratech_chat_prefs',
      apiVersion: 'v1'
    }
  };

  // Embedded styles as template string
  const WIDGET_STYLES = `
    /* Critical styles embedded to avoid external CSS dependencies */
    .toratech-chat-widget {
      --tt-primary: var(--toratech-primary-color, {{primaryColor}});
      --tt-secondary: var(--toratech-secondary-color, {{secondaryColor}});
      --tt-bg: var(--toratech-bg-color, {{backgroundColor}});
      --tt-text: var(--toratech-text-color, {{fontColor}});
      --tt-position: {{position}};
      
      position: fixed;
      bottom: 20px;
      {{positionStyle}}
      z-index: {{zIndex}};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .toratech-chat-widget * {
      box-sizing: border-box;
    }

    .toratech-chat-container {
      width: 380px;
      height: 600px;
      background: var(--tt-bg);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      display: none;
      flex-direction: column;
      overflow: hidden;
    }

    .toratech-chat-container.open {
      display: flex;
    }

    .toratech-chat-button {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: var(--tt-primary);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s;
    }

    .toratech-chat-button:hover {
      transform: scale(1.05);
    }

    /* Additional embedded styles... */
  `;

  // Main widget class
  class ToRaTechChatWidget {
    constructor(config = {}) {
      this.config = this.mergeConfig(config);
      this.initialized = false;
      this.container = null;
      this.sessionId = this.generateSessionId();
    }

    // Merge configurations with proper precedence
    mergeConfig(customConfig) {
      // Priority order:
      // 1. Runtime config passed to constructor
      // 2. window.ChatWidgetConfig
      // 3. Data attributes on script tag
      // 4. Default config
      // Note: Webhook settings are ALWAYS hardcoded and cannot be overridden

      const scriptConfig = this.getScriptTagConfig();
      const windowConfig = window[CONFIG_KEY] || {};

      // Remove any webhook configuration from user inputs (security measure)
      const cleanWindowConfig = this.removeWebhookConfig(windowConfig);
      const cleanCustomConfig = this.removeWebhookConfig(customConfig);

      // Merge all configurations, excluding webhook
      const mergedConfig = this.deepMerge(
        DEFAULT_CONFIG,
        scriptConfig,
        cleanWindowConfig,
        cleanCustomConfig
      );

      // ALWAYS use protected webhook configuration - cannot be overridden
      mergedConfig.webhook = TORATECH_WEBHOOK;

      return mergedConfig;
    }

    // Remove webhook configuration from user input for security
    removeWebhookConfig(config) {
      if (!config || typeof config !== 'object') return config;
      
      const cleanConfig = { ...config };
      delete cleanConfig.webhook;
      
      if (this.config?.advanced?.debug) {
        console.warn('[ToRaTech Chat] Webhook configuration is managed by ToRaTech and cannot be customized');
      }
      
      return cleanConfig;
    }

    // Extract config from script tag data attributes
    getScriptTagConfig() {
      const script = document.currentScript ||
        document.querySelector(`script[src*="toratech"][src*="widget"]`);
      
      if (!script) return {};

      const config = {
        branding: {},
        style: {},
        advanced: {}
      };

      // Map data attributes to config (webhook attributes are ignored)
      if (script.dataset.position) config.style.position = script.dataset.position;
      if (script.dataset.primaryColor) config.style.primaryColor = script.dataset.primaryColor;
      if (script.dataset.debug) config.advanced.debug = script.dataset.debug === 'true';
      
      // Warn if webhook data attributes are present (they will be ignored)
      if (script.dataset.webhook && this.config?.advanced?.debug) {
        console.warn('[ToRaTech Chat] data-webhook attribute is ignored. Webhook is managed by ToRaTech.');
      }

      return config;
    }

    // Deep merge utility
    deepMerge(...objects) {
      const result = {};
      
      for (const obj of objects) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
              result[key] = this.deepMerge(result[key] || {}, obj[key]);
            } else {
              result[key] = obj[key];
            }
          }
        }
      }
      
      return result;
    }

    // Initialize the widget
    init() {
      if (this.initialized) {
        this.log('Widget already initialized');
        return;
      }

      this.injectStyles();
      this.createWidget();
      this.attachEventListeners();
      this.loadUserPreferences();
      this.initialized = true;

      this.log('Widget initialized', this.config);
    }

    // Inject styles with template interpolation
    injectStyles() {
      const styleId = 'toratech-chat-styles';
      
      if (document.getElementById(styleId)) return;

      // Generate position-specific CSS
      const positionStyle = this.config.style.position === 'left' ? 'left: 20px;' : 'right: 20px;';

      const styles = WIDGET_STYLES
        .replace(/{{primaryColor}}/g, this.config.style.primaryColor)
        .replace(/{{secondaryColor}}/g, this.config.style.secondaryColor)
        .replace(/{{backgroundColor}}/g, this.config.style.backgroundColor)
        .replace(/{{fontColor}}/g, this.config.style.fontColor)
        .replace(/{{position}}/g, this.config.style.position)
        .replace(/{{positionStyle}}/g, positionStyle)
        .replace(/{{zIndex}}/g, this.config.advanced.zIndex);

      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }

    // Create widget DOM structure
    createWidget() {
      const widgetHTML = `
        <div class="toratech-chat-widget" id="toratech-chat-widget">
          <button class="toratech-chat-button" id="toratech-chat-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8 13C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12C9 12.55 8.55 13 8 13ZM12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13ZM16 13C15.45 13 15 12.55 15 12C15 11.45 15.45 11 16 11C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z" fill="white"/>
            </svg>
          </button>
          <div class="toratech-chat-container" id="toratech-chat-container">
            <!-- Chat interface will be dynamically loaded here -->
          </div>
        </div>
      `;

      const wrapper = document.createElement('div');
      wrapper.innerHTML = widgetHTML;
      document.body.appendChild(wrapper.firstElementChild);

      this.container = document.getElementById('toratech-chat-container');
    }

    // Public API methods
    open() {
      if (this.container) {
        this.container.classList.add('open');
        this.loadChatInterface();
      }
    }

    close() {
      if (this.container) {
        this.container.classList.remove('open');
      }
    }

    destroy() {
      const widget = document.getElementById('toratech-chat-widget');
      if (widget) {
        widget.remove();
      }
      
      const styles = document.getElementById('toratech-chat-styles');
      if (styles) {
        styles.remove();
      }

      this.initialized = false;
    }

    // Update configuration dynamically
    updateConfig(newConfig) {
      this.config = this.mergeConfig(newConfig);
      
      if (this.initialized) {
        this.destroy();
        this.init();
      }
    }

    // Utility methods
    generateSessionId() {
      return 'tt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    log(...args) {
      if (this.config.advanced.debug) {
        console.log('[ToRaTech Chat]', ...args);
      }
    }

    // Load user preferences from localStorage
    loadUserPreferences() {
      try {
        const saved = localStorage.getItem(this.config.advanced.storageKey);
        if (saved) {
          const prefs = JSON.parse(saved);
          // Apply user preferences (e.g., position, theme)
          this.log('Loaded user preferences', prefs);
        }
      } catch (e) {
        this.log('Could not load user preferences', e);
      }
    }

    // Attach event listeners
    attachEventListeners() {
      const button = document.getElementById('toratech-chat-button');
      
      button.addEventListener('click', () => {
        const isOpen = this.container.classList.contains('open');
        if (isOpen) {
          this.close();
        } else {
          this.open();
        }
      });

      // ESC key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.container.classList.contains('open')) {
          this.close();
        }
      });
    }

    // Load the actual chat interface (lazy loading)
    loadChatInterface() {
      // This is where you'd load the full chat UI
      // Could be done via dynamic imports, iframe, or embedded HTML
      this.log('Loading chat interface...');
      
      // For now, simplified version
      this.container.innerHTML = `
        <div class="toratech-chat-header">
          <img src="${this.config.branding.logo}" alt="${this.config.branding.name}" />
          <h3>${this.config.branding.name}</h3>
          <button class="toratech-chat-close">&times;</button>
        </div>
        <div class="toratech-chat-body">
          <div class="toratech-chat-welcome">
            <p>${this.config.branding.welcomeText}</p>
            <button class="toratech-chat-start">Start Chat</button>
          </div>
        </div>
      `;

      // Add close button handler
      const closeBtn = this.container.querySelector('.toratech-chat-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }
    }
  }

  // Auto-initialization and public API
  const initWidget = function() {
    // Check if widget should auto-initialize
    const config = window[CONFIG_KEY] || {};
    const shouldAutoInit = config.advanced?.autoInit !== false;

    if (shouldAutoInit) {
      const widget = new ToRaTechChatWidget();
      widget.init();

      // Expose public API
      window[NAMESPACE] = {
        version: VERSION,
        init: (config) => {
          widget.updateConfig(config);
          if (!widget.initialized) {
            widget.init();
          }
        },
        open: () => widget.open(),
        close: () => widget.close(),
        destroy: () => widget.destroy(),
        updateConfig: (config) => widget.updateConfig(config),
        getConfig: () => widget.config
      };
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

})(window, document);
