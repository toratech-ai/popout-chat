import React, { useEffect, useState } from 'react';
import chatService from '../services/chatService';
import chatConfigDefaults from '../config/chatConfig'; // For fallback if needed
import '../../css/chat-toratech-overrides.css'; // Import CSS overrides

const CUSTOM_CHAT_WIDGET_SCRIPT_PATH = '/js/customChatWidget.js'; // Path relative to public for script tag

const CustomChatInitializer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        console.log('CustomChatInitializer: Loading configuration...');
        let config = await chatService.loadConfig();

        if (!config) {
          console.warn('CustomChatInitializer: No configuration loaded, using defaults.');
          config = JSON.parse(JSON.stringify(chatConfigDefaults));
        }
        
        // Ensure the structure is what customChatWidget.js expects
        window.ChatWidgetConfig = {
          webhook: { ...(chatConfigDefaults.webhook || {}), ...(config.webhook || {}) },
          branding: { ...(chatConfigDefaults.branding || {}), ...(config.branding || {}) },
          style: { ...(chatConfigDefaults.style || {}), ...(config.style || {}) },
        };

        console.log('CustomChatInitializer: Configuration set on window.ChatWidgetConfig:', window.ChatWidgetConfig);

        // Check if script is already loaded to prevent multiple injections
        if (document.querySelector(`script[src="${CUSTOM_CHAT_WIDGET_SCRIPT_PATH}"]`)) {
          console.log('CustomChatInitializer: Custom chat widget script already loaded.');
          // If the script is already there, it might have self-executed.
          // Re-setting window.ChatWidgetConfig might require a re-init function in the widget if it doesn't re-read automatically.
          // For now, assuming it reads on load or we handle re-init if needed later.
          setIsLoading(false);
          return;
        }

        console.log('CustomChatInitializer: Loading custom chat widget script...');
        const script = document.createElement('script');
        script.src = CUSTOM_CHAT_WIDGET_SCRIPT_PATH;
        script.async = true;
        script.onload = () => {
          console.log('CustomChatInitializer: Custom chat widget script loaded successfully.');
          setIsLoading(false);
        };
        script.onerror = () => {
          console.error('CustomChatInitializer: Failed to load custom chat widget script.');
          setError('Failed to load the custom chat widget script.');
          setIsLoading(false);
        };
        document.body.appendChild(script);

      } catch (err) {
        console.error('CustomChatInitializer: Error during initialization:', err);
        setError('Failed to initialize custom chat widget.');
        setIsLoading(false);
      }
    };

    initializeChat();

    // Cleanup function (optional, if the script adds global listeners or needs explicit teardown)
    return () => {
      // If the customChatWidget.js needs specific cleanup when this component unmounts,
      // for example, removing its UI or event listeners, that logic would go here.
      // For now, we assume the script manages its own lifecycle or doesn't need explicit cleanup on component unmount.
      // const existingScript = document.querySelector(`script[src="${CUSTOM_CHAT_WIDGET_SCRIPT_PATH}"]`);
      // if (existingScript) {
      //   // document.body.removeChild(existingScript); // Be cautious with removing scripts if they modify global state
      // }
      // Potentially remove window.ChatWidgetConfig if it's only for this instance
      // delete window.ChatWidgetConfig;
    };
  }, []);

  if (isLoading) {
    // Optionally render a loading indicator, but it's a background task, so null is fine.
    return null; 
  }

  if (error) {
    console.error('CustomChatInitializer Render Error:', error);
    // Optionally render an error message, or just log it.
    return <div style={{ display: 'none' }}>Error initializing chat: {error}</div>;
  }

  return null; // This component does not render any visible UI itself
};

export default CustomChatInitializer;
