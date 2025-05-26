/**
 * Injects the widget's CSS styles into the document head.
 * @param {Object} config - The widget configuration object.
 * @param {string} baseStyles - The base WIDGET_STYLES string.
 * @param {string} stylesId - The ID to use for the style element.
 * @param {Function} logFunc - Optional logging function.
 */
export function injectStyles(config, baseStyles, stylesId, logFunc) {
  if (document.getElementById(stylesId)) return;

  const styleElement = document.createElement('style');
  styleElement.id = stylesId;
  styleElement.textContent = baseStyles;
  document.head.appendChild(styleElement);
  
  if (logFunc) logFunc('Styles injected');
}

/**
 * Creates the main widget HTML structure, appends it to the body,
 * and returns references to key elements.
 * @param {Object} config - The widget configuration object.
 * @param {string} widgetId - The ID for the widget container.
 * @param {string} toggleId - The ID for the toggle button.
 * @param {string} containerId - The ID for the chat container.
 * @param {Function} logFunc - Optional logging function.
 * @returns {Object} An object containing references to key elements.
 */
export function createWidgetElements(config, widgetId, toggleId, containerId, logFunc) {
  // Create widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.className = widgetId;
  widgetContainer.id = widgetId;
  
  // Set CSS variables for colors
  widgetContainer.style.setProperty('--toratech-chat-primary-color', config.style.primaryColor);
  widgetContainer.style.setProperty('--toratech-chat-secondary-color', config.style.secondaryColor);
  widgetContainer.style.setProperty('--toratech-chat-background-color', config.style.backgroundColor);
  widgetContainer.style.setProperty('--toratech-chat-font-color', config.style.fontColor);
  widgetContainer.style.setProperty('--toratech-chat-user-bubble-color', config.style.userBubbleColor || config.style.primaryColor);
  widgetContainer.style.setProperty('--toratech-chat-bot-bubble-color', config.style.botBubbleColor);

  const chatContainer = document.createElement('div');
  chatContainer.id = containerId;
  chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
  
  // Create a single brand header that will be shared
  const brandHeaderHTML = `
    <div class="brand-header">
      <img src="${config.branding.logo}" alt="${config.branding.name}">
      <span>${config.branding.name}</span>
      <button class="close-button" aria-label="Close chat" title="Close chat" tabindex="0">×</button>
    </div>
  `;

  const newConversationHTML = `
    <div class="new-conversation">
      <h2 class="welcome-text">${config.branding.welcomeText}</h2>
      <button class="new-chat-btn">
        <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        </svg>
        Send us a message
      </button>
      <p class="response-text">${config.branding.responseTimeText}</p>
    </div>
  `;

  const chatInterfaceHTML = `
    <div class="chat-interface">
      <div class="chat-messages"></div>
      <div class="chat-input">
        <textarea 
          placeholder="Type your message here..." 
          rows="1"
          aria-label="Message input"
          tabindex="0"
        ></textarea>
        <button 
          type="submit"
          aria-label="Send message"
          title="Send message"
          tabindex="0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="display: block; margin: auto;">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
      <div class="chat-footer">
        <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
      </div>
    </div>
  `;
  
  chatContainer.innerHTML = brandHeaderHTML + newConversationHTML + chatInterfaceHTML;
  
  const toggleButton = document.createElement('button');
  toggleButton.id = toggleId;
  toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
  toggleButton.setAttribute('aria-label', 'Open chat');
  toggleButton.setAttribute('title', 'Chat with Toratech AI Support');
  toggleButton.setAttribute('role', 'button');
  toggleButton.setAttribute('tabindex', '0');
  toggleButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>`;
  
  widgetContainer.appendChild(chatContainer);
  widgetContainer.appendChild(toggleButton);
  document.body.appendChild(widgetContainer);
  
  if (logFunc) logFunc('Widget elements created');
  
  return {
    widgetContainer,
    chatContainer,
    toggleButton,
    newChatBtn: chatContainer.querySelector('.new-chat-btn'),
    chatInterface: chatContainer.querySelector('.chat-interface'),
    messagesContainer: chatContainer.querySelector('.chat-messages'),
    textarea: chatContainer.querySelector('textarea'),
    sendButton: chatContainer.querySelector('button[type="submit"]'),
    closeButtons: chatContainer.querySelectorAll('.close-button')
  };
}

/**
 * Adds a message to the chat display.
 * @param {HTMLElement} messagesContainer - The DOM element that contains chat messages.
 * @param {string} messageText - The text of the message.
 * @param {string} senderClass - The class to apply to the message element ('user' or 'bot').
 * @param {Function} logFunc - Optional logging function.
 */
export function addMessageToDisplay(messagesContainer, messageText, senderClass, logFunc) {
  if (!messagesContainer) {
    if (logFunc) logFunc('Messages container not found for addMessageToDisplay', 'error');
    return;
  }
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', senderClass);
  messageElement.textContent = messageText;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
  if (logFunc) logFunc(`Message added to UI: "${messageText}" as ${senderClass}`);
}
