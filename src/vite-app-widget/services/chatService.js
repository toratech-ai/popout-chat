import chatConfigDefaults from '../config/chatConfig';

const CHAT_CONFIG_STORAGE_KEY = 'customChatWidgetConfig';

class ChatService {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const storedConfigString = localStorage.getItem(CHAT_CONFIG_STORAGE_KEY);
      const storedConfig = storedConfigString ? JSON.parse(storedConfigString) : {};

      // Webhook configuration is ALWAYS taken from defaults and is not overridden by localStorage.
      const finalWebhookConfig = { ...(chatConfigDefaults.webhook || {}) };

      // Branding and Style are loaded from storage and merged with defaults.
      const finalBrandingConfig = { 
        ...(chatConfigDefaults.branding || {}), 
        ...(storedConfig.branding || {}) 
      };
      const finalStyleConfig = { 
        ...(chatConfigDefaults.style || {}), 
        ...(storedConfig.style || {}) 
      };
      
      const loaded = {
        webhook: finalWebhookConfig,
        branding: finalBrandingConfig,
        style: finalStyleConfig,
      };
      
      console.log("ChatService: Loaded config:", loaded);
      this.config = loaded;
      return loaded;
    } catch (error) {
      console.error('ChatService: Error loading chat configuration from localStorage, using defaults:', error);
      // Fallback to deep copy of defaults if loading fails, ensuring webhook is from defaults.
      this.config = {
        webhook: { ...(chatConfigDefaults.webhook || {}) },
        branding: { ...(chatConfigDefaults.branding || {}) },
        style: { ...(chatConfigDefaults.style || {}) },
      };
      return this.config;
    }
  }

  saveConfig(newConfig) {
    try {
      // Only save branding and style sections to localStorage.
      // Webhook settings are fixed and come from chatConfigDefaults.
      const configToStore = {
        branding: newConfig.branding || { ...(chatConfigDefaults.branding || {}) },
        style: newConfig.style || { ...(chatConfigDefaults.style || {}) },
      };

      localStorage.setItem(CHAT_CONFIG_STORAGE_KEY, JSON.stringify(configToStore));
      console.log("ChatService: Saved config (only branding and style to localStorage):", configToStore);
      
      // Update the in-memory config, ensuring webhook is still sourced from defaults.
      this.config = {
        webhook: { ...(chatConfigDefaults.webhook || {}) }, // Ensure webhook is from defaults
        branding: configToStore.branding,
        style: configToStore.style,
      };

      // If the custom widget needs to be re-initialized or updated after config change,
      // a mechanism (e.g., event emitter or callback) would be needed here.
      // For now, window.ChatWidgetConfig will be set by CustomChatInitializer on load.
    } catch (error) {
      console.error('ChatService: Error saving chat configuration to localStorage:', error);
    }
  }

  getConfig() {
    return this.config || this.loadConfig(); // Ensure config is loaded if accessed before constructor finishes
  }
}

const chatServiceInstance = new ChatService();
export default chatServiceInstance;
