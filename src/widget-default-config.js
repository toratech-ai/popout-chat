/**
 * Toratech AI Chat Widget - Default Configuration
 * @version 1.0.0
 * @license MIT
 */

export const DEFAULT_CONFIG = {
  branding: {
    logo: 'https://cdn.toratech.com/assets/default-logo.png',
    name: 'Toratech AI Support',
    welcomeText: 'Hi there! 👋 How can I assist you today?',
    responseTimeText: 'We typically respond quickly.',
    poweredBy: {
      text: 'Powered by Toratech AI',
      link: 'https://toratech.ai'
    }
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
    apiVersion: 'v1',
    allowProgrammaticOpen: false // Whether to allow opening the widget programmatically
  },
  webhook: {
    url: '',
    route: ''
  }
};
