/**
 * @fileoverview Chat operations for the Toratech AI Widget.
 */

/**
 * Adds a message to the chat display.
 * @param {HTMLElement} messagesContainer - The DOM element that contains chat messages.
 * @param {string} messageText - The text of the message.
 * @param {string} senderClass - The class to apply to the message element ('user' or 'bot').
 * @param {Function} logFunc - Logging function.
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

/**
 * Loads the initial HTML structure for the chat interface into the container
 * and sets up event listeners for its internal elements.
 * @param {HTMLElement} container - The main widget container element.
 * @param {Object} config - The widget configuration object.
 * @param {Function} logFunc - Logging function.
 * @param {Object} callbacks - Callbacks for UI interactions.
 * @param {Function} callbacks.onCloseRequest - Called when an internal close button is clicked.
 * @param {Function} callbacks.onStartNewConversationRequest - Called when the 'New Conversation' button is clicked.
 * @param {Function} callbacks.onSendMessageRequest - Called with message text when send is triggered.
 * @returns {Object|null} An object containing references to key UI elements, or null if container is not found.
 */
export function loadInitialChatInterface(container, config, logFunc, callbacks) {
  if (!container) {
    if (logFunc) logFunc('Container not found for loadInitialChatInterface', 'error');
    return null;
  }

  if (logFunc) logFunc('Loading initial chat interface HTML...');

  // Combined HTML for both new conversation view and chat interface structure
  // The chat interface part will be initially hidden or shown as needed.
  const initialHTML = `
    <div class="brand-header" style="display: flex;"> <!-- Common header -->
      <img src="${config.branding.logo}" alt="${config.branding.name}">
      <span>${config.branding.name}</span>
      <button class="close-button internal-close-button" aria-label="Close chat">&times;</button>
    </div>
    <div class="new-conversation-screen">
      <h2 class="welcome-text">${config.branding.welcomeText}</h2>
      <button class="new-chat-btn">
        <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="margin-right: 8px; fill: currentColor;">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        </svg>
        Send us a message
      </button>
      <p class="response-text">${config.branding.responseTimeText}</p>
    </div>
    <div class="chat-interface-screen" style="display: none;"> <!-- Initially hidden -->
      <div class="chat-messages"></div>
      <div class="chat-input">
        <textarea placeholder="Type your message here..." rows="1"></textarea>
        <button type="submit" class="send-message-btn">Send</button>
      </div>
    </div>
  `;

  container.innerHTML = initialHTML;

  // Cache DOM elements
  const newConversationScreen = container.querySelector('.new-conversation-screen');
  const chatInterfaceScreen = container.querySelector('.chat-interface-screen');
  const messagesContainerElement = container.querySelector('.chat-messages');
  const messageInputElement = container.querySelector('.chat-input textarea');
  const sendButtonElement = container.querySelector('.send-message-btn');
  const newChatButton = container.querySelector('.new-chat-btn');
  const internalCloseButtons = container.querySelectorAll('.internal-close-button'); // Could be multiple if header is duplicated

  // Attach event listeners using callbacks
  internalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (callbacks.onCloseRequest) callbacks.onCloseRequest();
    });
  });

  if (newChatButton && callbacks.onStartNewConversationRequest) {
    newChatButton.addEventListener('click', () => callbacks.onStartNewConversationRequest());
  }

  function handleSendMessage() {
    if (messageInputElement && callbacks.onSendMessageRequest) {
      const message = messageInputElement.value.trim();
      if (message) {
        callbacks.onSendMessageRequest(message);
        messageInputElement.value = ''; // Clear textarea
        messageInputElement.style.height = 'auto'; // Reset height after sending
      }
    }
  }

  if (sendButtonElement) {
    sendButtonElement.addEventListener('click', handleSendMessage);
  }

  if (messageInputElement) {
    messageInputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });
    // Auto-resize textarea
    messageInputElement.addEventListener('input', () => {
        messageInputElement.style.height = 'auto';
        messageInputElement.style.height = (messageInputElement.scrollHeight) + 'px';
    });
  }

  if (logFunc) logFunc('Initial chat interface loaded and listeners attached.');

  return {
    newConversationScreen,
    chatInterfaceScreen,
    messagesContainerElement,
    messageInputElement,
    sendButtonElement
  };
}

/**
 * Initiates a new conversation session.
 * Makes an API call to the webhook, updates UI, and displays initial bot message.
 * @param {Object} config - The widget configuration object.
 * @param {Function} logFunc - Logging function.
 * @param {Function} generateSessionIdFunc - Function to generate a new session ID.
 * @param {Function} newSessionIdSetter - Callback to set the new session ID in the parent scope.
 * @param {Object} uiElements - Object containing references to UI elements (newConversationScreen, chatInterfaceScreen, messagesContainerElement).
 * @param {Function} addMessageFunc - Function to add a message to the display.
 */
export async function initiateNewConversationSession(config, logFunc, generateSessionIdFunc, newSessionIdSetter, uiElements, addMessageFunc) {
  if (!config.webhook_url) {
    if (logFunc) logFunc('Error: webhook_url not configured for new conversation.', 'error');
    // Optionally, still show chat interface but with an error or different message.
    if (uiElements.newConversationScreen) uiElements.newConversationScreen.style.display = 'none';
    if (uiElements.chatInterfaceScreen) uiElements.chatInterfaceScreen.style.display = 'flex'; // Or 'block'
    if (addMessageFunc && uiElements.messagesContainerElement) {
      addMessageFunc(uiElements.messagesContainerElement, 'Chat service is currently unavailable (webhook not configured).', 'bot', logFunc);
    }
    return;
  }

  const newSessionId = generateSessionIdFunc();
  newSessionIdSetter(newSessionId);
  if (logFunc) logFunc('Attempting to start new conversation session:', newSessionId);

  const requestData = [{
    action: "loadPreviousSession", // Or a specific 'startNewSession' action if API supports
    sessionId: newSessionId,
    route: config.webhook_route || "general", // Use configured route or fallback
    metadata: {
      userId: "" // Or a user identifier if available
    }
  }];

  try {
    const response = await fetch(config.webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    const botMessage = Array.isArray(responseData) && responseData.length > 0 ? responseData[0].output : responseData.output;

    if (uiElements.newConversationScreen) uiElements.newConversationScreen.style.display = 'none';
    if (uiElements.chatInterfaceScreen) uiElements.chatInterfaceScreen.style.display = 'flex'; // Or 'block'
    
    if (botMessage && addMessageFunc && uiElements.messagesContainerElement) {
      addMessageFunc(uiElements.messagesContainerElement, botMessage, 'bot', logFunc);
    }
    if (logFunc) logFunc('New conversation started successfully. Session ID:', newSessionId);

  } catch (error) {
    if (logFunc) logFunc('Error starting new conversation session:', error, 'error');
    // Fallback: show chat interface and an error message
    if (uiElements.newConversationScreen) uiElements.newConversationScreen.style.display = 'none';
    if (uiElements.chatInterfaceScreen) uiElements.chatInterfaceScreen.style.display = 'flex';
    if (addMessageFunc && uiElements.messagesContainerElement) {
      addMessageFunc(uiElements.messagesContainerElement, 'Sorry, I could not start a new conversation. Please try again later.', 'bot', logFunc);
    }
  }
}

/**
 * Submits a message from the user to the server and displays the response.
 * @param {Object} config - The widget configuration object.
 * @param {Function} logFunc - Logging function.
 * @param {string} currentSessionId - The active session ID.
 * @param {string} messageText - The text of the message to send.
 * @param {Object} uiElements - Object containing references to UI elements (messagesContainerElement).
 * @param {Function} addMessageFunc - Function to add a message to the display.
 */
export async function submitMessageToServer(config, logFunc, currentSessionId, messageText, uiElements, addMessageFunc) {
  if (!config.webhook_url) {
    if (logFunc) logFunc('Error: webhook_url not configured for sending message.', 'error');
    if (addMessageFunc && uiElements.messagesContainerElement) {
      addMessageFunc(uiElements.messagesContainerElement, 'Cannot send message: Chat service is not configured.', 'bot', logFunc);
    }
    return;
  }
  if (!currentSessionId) {
    if (logFunc) logFunc('Error: No active session ID for sending message.', 'error');
    if (addMessageFunc && uiElements.messagesContainerElement) {
      addMessageFunc(uiElements.messagesContainerElement, 'Cannot send message: No active session. Please start a new conversation.', 'bot', logFunc);
    }
    return;
  }

  if (logFunc) logFunc(`Sending message: "${messageText}" for session ID: ${currentSessionId}`);

  // Display user's message immediately
  if (addMessageFunc && uiElements.messagesContainerElement) {
    addMessageFunc(uiElements.messagesContainerElement, messageText, 'user', logFunc);
  }

  const requestData = {
    action: "sendMessage",
    sessionId: currentSessionId,
    route: "general", // Or as per config
    chatInput: messageText,
    metadata: {
      userId: "" // Or a user identifier if available
    }
  };

  try {
    const response = await fetch(config.webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    const botMessage = Array.isArray(responseData) && responseData.length > 0 ? responseData[0].output : responseData.output;

    if (botMessage && addMessageFunc && uiElements.messagesContainerElement) {
      addMessageFunc(uiElements.messagesContainerElement, botMessage, 'bot', logFunc);
    }
    if (logFunc) logFunc('Message sent and response received.');

  } catch (error) {
    if (logFunc) logFunc('Error sending message or processing response:', error, 'error');
    if (addMessageFunc && uiElements.messagesContainerElement) {
      addMessageFunc(uiElements.messagesContainerElement, 'Sorry, I encountered an error sending your message. Please try again.', 'bot', logFunc);
    }
  }
}

/**
 * Starts a new conversation in the chat widget.
 * @param {Object} elements - Object containing references to UI elements.
 * @param {Function} generateSessionIdFunc - Function to generate a new session ID.
 * @param {Function} setSessionId - Function to set the current session ID.
 * @param {Function} addMessageFunc - Function to add a message to the display.
 * @param {Function} logFunc - Optional logging function.
 * @returns {Promise<void>}
 */
export async function startNewConversation(elements, generateSessionIdFunc, setSessionId, addMessageFunc, logFunc) {
  const sessionId = generateSessionIdFunc();
  setSessionId(sessionId);
  if (logFunc) logFunc(`Starting new conversation with session ID: ${sessionId}`);
  
  // Switch to chat interface
  elements.chatContainer.querySelector('.brand-header').style.display = 'flex';
  elements.chatContainer.querySelector('.new-conversation').style.display = 'none';
  elements.chatInterface.classList.add('active');
  
  // Show typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'bot-typing';
  typingIndicator.innerHTML = `
    <span class="loading-indicator"></span>
    <span>Toratech AI is typing...</span>
  `;
  elements.messagesContainer.appendChild(typingIndicator);
  
  // Simulate a delay before showing the welcome message
  setTimeout(() => {
    // Remove typing indicator
    elements.messagesContainer.removeChild(typingIndicator);
    
    // Add welcome message
    addMessageFunc(
      elements.messagesContainer, 
      "Hello! I'm your Toratech AI Assistant. How can I help you today? Feel free to ask me any questions.", 
      'bot',
      logFunc
    );
    
    // Focus on the textarea for immediate input
    elements.textarea.focus();
  }, 1000);
}

/**
 * Sends a message from the user and handles the bot response.
 * @param {Object} elements - Object containing references to UI elements.
 * @param {string} message - The message text to send.
 * @param {Function} addMessageFunc - Function to add a message to the display.
 * @param {Function} logFunc - Optional logging function.
 * @param {Object} config - The widget configuration object.
 * @returns {Promise<void>}
 */
export async function sendMessage(elements, message, addMessageFunc, logFunc, config) {
  if (!message.trim()) return;
  
  if (logFunc) logFunc(`Sending message: ${message}`);
  addMessageFunc(elements.messagesContainer, message, 'user', logFunc);
  
  // Show typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'bot-typing';
  typingIndicator.innerHTML = `
    <span class="loading-indicator"></span>
    <span>Toratech AI is typing...</span>
  `;
  elements.messagesContainer.appendChild(typingIndicator);
  elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
  
  // If webhook_url is configured, send the message to the webhook
  if (config && config.webhook_url) {
    if (logFunc) logFunc('Sending message to webhook: ' + config.webhook_url);
    
    try {
      // Format the request data to match the example in examples/chat-widget.js
      const requestData = {
        action: "sendMessage",
        sessionId: config.sessionId || 'default-session',
        route: config.webhook_route || "general",
        chatInput: message,
        metadata: {
          userId: ""
        }
      };
      
      const response = await fetch(config.webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      // Remove typing indicator
      if (elements.messagesContainer.contains(typingIndicator)) {
        elements.messagesContainer.removeChild(typingIndicator);
      }
      
      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      // Extract the bot message from the response using the format from the example
      let botMessage = '';
      if (Array.isArray(responseData) && responseData.length > 0) {
        botMessage = responseData[0].output;
      } else if (responseData.output) {
        botMessage = responseData.output;
      } else if (typeof responseData === 'string') {
        botMessage = responseData;
      } else {
        // Fallback options if the expected format isn't found
        botMessage = responseData.message || responseData.response || responseData.text || 
                    responseData.content || JSON.stringify(responseData);
      }
      
      // Display the bot response
      addMessageFunc(elements.messagesContainer, botMessage, 'bot', logFunc);
      if (logFunc) logFunc('Received response from webhook');
      
    } catch (error) {
      // Remove typing indicator if still present
      if (elements.messagesContainer.contains(typingIndicator)) {
        elements.messagesContainer.removeChild(typingIndicator);
      }
      
      if (logFunc) logFunc('Error sending message to webhook: ' + error.message, 'error');
      
      // Display error message to user
      addMessageFunc(
        elements.messagesContainer,
        'Sorry, I couldn\'t connect to the chat service. Please try again later.',
        'bot',
        logFunc
      );
    }
  } else {
    // Fallback to demo response if no webhook_url is configured
    setTimeout(() => {
      // Remove typing indicator
      if (elements.messagesContainer.contains(typingIndicator)) {
        elements.messagesContainer.removeChild(typingIndicator);
      }
      
      // Add demo bot response
      addMessageFunc(
        elements.messagesContainer, 
        `You said: "${message}". This is a demo response from Toratech AI.`, 
        'bot',
        logFunc
      );
    }, 1500);
  }
}
