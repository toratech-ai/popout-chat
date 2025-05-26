/**
 * Toratech AI Chat Widget - Constants
 * @version 1.0.0
 * @license MIT
 */
const NAMESPACE = "ToratechAIChat";
const CONFIG_KEY = "ChatWidgetConfig";
const VERSION = "1.0.0";
const WIDGET_ID = "toratech-chat-widget";
const TOGGLE_ID = "toratech-chat-toggle";
const CONTAINER_ID = "toratech-chat-container";
const STYLES_ID = "toratech-chat-styles";
/**
 * Toratech AI Chat Widget - Default Configuration
 * @version 1.0.0
 * @license MIT
 */
const DEFAULT_CONFIG = {
  branding: {
    logo: "https://cdn.toratech.com/assets/default-logo.png",
    name: "Toratech AI Support",
    welcomeText: "Hi there! 👋 How can I assist you today?",
    responseTimeText: "We typically respond quickly.",
    poweredBy: {
      text: "Powered by Toratech AI",
      link: "https://toratech.ai"
    }
  },
  style: {
    primaryColor: "#338AFF",
    secondaryColor: "#2072E8",
    position: "right",
    backgroundColor: "#ffffff",
    fontColor: "#333333",
    userBubbleColor: "",
    // Will default to primaryColor if empty in the logic
    botBubbleColor: "#f0f0f0"
  },
  webhook_url: "",
  webhook_route: ""
};
/**
 * Toratech AI Chat Widget - Styles
 * @version 1.0.0
 * @license MIT
 */
const WIDGET_STYLES = `.toratech-chat-widget {
    --chat-color-primary: var(--toratech-chat-primary-color, #0066cc);
    --chat-color-secondary: var(--toratech-chat-secondary-color, #004d99);
    --chat-color-background: var(--toratech-chat-background-color, #ffffff);
    --chat-color-font: var(--toratech-chat-font-color, #333333);
    --chat-color-user-bubble: var(--toratech-chat-user-bubble-color, var(--chat-color-primary));
    --chat-color-bot-bubble: var(--toratech-chat-bot-bubble-color, #f0f0f0);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .toratech-chat-widget .chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    display: none;
    flex-direction: column;
    width: 520px;
    height: 715px;
    max-height: 80vh;
    background-color: var(--chat-color-background);
    border-radius: 10px;
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
  }

  .toratech-chat-widget .chat-container.position-left {
    right: auto;
    left: 20px;
  }

  .toratech-chat-widget .chat-container.open {
    display: flex;
    opacity: 1;
    transform: translateY(0);
  }

  .toratech-chat-widget .brand-header {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--chat-color-primary);
    color: white;
  }

  .toratech-chat-widget .brand-header img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border-radius: 50%;
  }

  .toratech-chat-widget .brand-header span {
    flex-grow: 1;
    font-weight: 600;
  }

  .toratech-chat-widget .close-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }

  .toratech-chat-widget .close-button:hover {
    transform: scale(1.1);
  }

  .toratech-chat-widget .new-conversation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    flex-grow: 1;
    text-align: center;
  }

  .toratech-chat-widget .welcome-text {
    font-size: 18px;
    margin-bottom: 20px;
    color: var(--chat-color-font);
  }

  .toratech-chat-widget .new-chat-btn {
    background-color: var(--chat-color-primary);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
  }

  .toratech-chat-widget .new-chat-btn:hover {
    background-color: var(--chat-color-secondary);
  }

  .toratech-chat-widget .message-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  .toratech-chat-widget .response-text {
    margin-top: 15px;
    font-size: 13px;
    color: #666;
  }

  .toratech-chat-widget .chat-interface {
    display: none;
    flex-direction: column;
    height: 100%;
  }

  .toratech-chat-widget .chat-interface.active {
    display: flex;
  }

  .toratech-chat-widget .chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  .toratech-chat-widget .chat-message {
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 18px;
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 1.4;
  }

  .toratech-chat-widget .chat-message.user {
    align-self: flex-end;
    background-color: var(--chat-color-user-bubble);
    color: white;
    border-bottom-right-radius: 5px;
  }

  .toratech-chat-widget .chat-message.bot {
    align-self: flex-start;
    background-color: var(--chat-color-bot-bubble);
    color: var(--chat-color-font);
    border-bottom-left-radius: 5px;
  }

  .toratech-chat-widget .bot-typing {
    align-self: flex-start;
    background-color: var(--chat-color-bot-bubble);
    color: var(--chat-color-font);
    border-radius: 18px;
    border-bottom-left-radius: 5px;
    padding: 10px 15px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .toratech-chat-widget .loading-indicator {
    width: 20px;
    height: 10px;
    margin-right: 10px;
    position: relative;
  }

  .toratech-chat-widget .loading-indicator:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #888;
    animation: typing 1s infinite;
  }

  @keyframes typing {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
  }

  .toratech-chat-widget .chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #eee;
    align-items: center;
  }

  .toratech-chat-widget .chat-input textarea {
    flex-grow: 1;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 1.4;
    box-sizing: border-box;
    height: 50px;
    min-height: 50px;
    min-width: 0;
    resize: none;
    font-family: inherit;
    overflow-y: hidden;
  }

  .toratech-chat-widget .chat-input textarea:focus {
    border-color: var(--chat-color-primary);
    outline: none;
  }

  .toratech-chat-widget .chat-input button {
    background-color: var(--chat-color-primary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding: 0;
    margin-left: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toratech-chat-widget .chat-input button:hover {
    background-color: var(--chat-color-secondary);
  }

  .toratech-chat-widget .chat-footer {
    padding: 5px 10px;
    text-align: center;
    font-size: 11px;
    color: #999;
    border-top: 1px solid #eee;
  }

  .toratech-chat-widget .chat-footer a {
    color: var(--chat-color-primary);
    text-decoration: none;
  }

  .toratech-chat-widget .chat-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: var(--chat-color-primary);
    color: white;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s, background-color 0.3s;
    z-index: 9998;
  }

  .toratech-chat-widget .chat-toggle.position-left {
    right: auto;
    left: 20px;
  }

  .toratech-chat-widget .chat-toggle:hover {
    transform: scale(1.05);
    background-color: var(--chat-color-secondary);
  }

  .toratech-chat-widget .chat-toggle svg {
    width: 28px;
    height: 28px;
    fill: currentColor;
  }

  @media (max-width: 480px) {
    .toratech-chat-widget .chat-container {
      width: 100%;
      height: 100%;
      max-height: 100vh;
      bottom: 0;
      right: 0;
      border-radius: 0;
    }
    
    .toratech-chat-widget .chat-container.position-left {
      left: 0;
    }
  }`;
function deepMerge(...objects) {
  const result = {};
  for (const obj of objects) {
    if (obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
            result[key] = deepMerge(result[key] || {}, obj[key]);
          } else {
            result[key] = obj[key];
          }
        }
      }
    }
  }
  return result;
}
function log$1(message, type = "info", config2) {
  var _a;
  if ((_a = config2 == null ? void 0 : config2.advanced) == null ? void 0 : _a.debug) {
    console[type === "error" ? "error" : "log"](`[Toratech AI Chat] ${message}`);
  }
}
function generateSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "tt_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}
function injectStyles(config2, baseStyles, stylesId, logFunc) {
  if (document.getElementById(stylesId)) return;
  const styleElement = document.createElement("style");
  styleElement.id = stylesId;
  styleElement.textContent = baseStyles;
  document.head.appendChild(styleElement);
  if (logFunc) logFunc("Styles injected");
}
function createWidgetElements(config2, widgetId, toggleId, containerId, logFunc) {
  const widgetContainer = document.createElement("div");
  widgetContainer.className = widgetId;
  widgetContainer.id = widgetId;
  widgetContainer.style.setProperty("--toratech-chat-primary-color", config2.style.primaryColor);
  widgetContainer.style.setProperty("--toratech-chat-secondary-color", config2.style.secondaryColor);
  widgetContainer.style.setProperty("--toratech-chat-background-color", config2.style.backgroundColor);
  widgetContainer.style.setProperty("--toratech-chat-font-color", config2.style.fontColor);
  widgetContainer.style.setProperty("--toratech-chat-user-bubble-color", config2.style.userBubbleColor || config2.style.primaryColor);
  widgetContainer.style.setProperty("--toratech-chat-bot-bubble-color", config2.style.botBubbleColor);
  const chatContainer = document.createElement("div");
  chatContainer.id = containerId;
  chatContainer.className = `chat-container${config2.style.position === "left" ? " position-left" : ""}`;
  const brandHeaderHTML = `
    <div class="brand-header">
      <img src="${config2.branding.logo}" alt="${config2.branding.name}">
      <span>${config2.branding.name}</span>
      <button class="close-button" aria-label="Close chat" title="Close chat" tabindex="0">×</button>
    </div>
  `;
  const newConversationHTML = `
    <div class="new-conversation">
      <h2 class="welcome-text">${config2.branding.welcomeText}</h2>
      <button class="new-chat-btn">
        <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        </svg>
        Send us a message
      </button>
      <p class="response-text">${config2.branding.responseTimeText}</p>
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
        <a href="${config2.branding.poweredBy.link}" target="_blank">${config2.branding.poweredBy.text}</a>
      </div>
    </div>
  `;
  chatContainer.innerHTML = brandHeaderHTML + newConversationHTML + chatInterfaceHTML;
  const toggleButton = document.createElement("button");
  toggleButton.id = toggleId;
  toggleButton.className = `chat-toggle${config2.style.position === "left" ? " position-left" : ""}`;
  toggleButton.setAttribute("aria-label", "Open chat");
  toggleButton.setAttribute("title", "Chat with Toratech AI Support");
  toggleButton.setAttribute("role", "button");
  toggleButton.setAttribute("tabindex", "0");
  toggleButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>`;
  widgetContainer.appendChild(chatContainer);
  widgetContainer.appendChild(toggleButton);
  document.body.appendChild(widgetContainer);
  if (logFunc) logFunc("Widget elements created");
  return {
    widgetContainer,
    chatContainer,
    toggleButton,
    newChatBtn: chatContainer.querySelector(".new-chat-btn"),
    chatInterface: chatContainer.querySelector(".chat-interface"),
    messagesContainer: chatContainer.querySelector(".chat-messages"),
    textarea: chatContainer.querySelector("textarea"),
    sendButton: chatContainer.querySelector('button[type="submit"]'),
    closeButtons: chatContainer.querySelectorAll(".close-button")
  };
}
function addMessageToDisplay(messagesContainer, messageText, senderClass, logFunc) {
  if (!messagesContainer) {
    if (logFunc) logFunc("Messages container not found for addMessageToDisplay", "error");
    return;
  }
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", senderClass);
  messageElement.textContent = messageText;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  if (logFunc) logFunc(`Message added to UI: "${messageText}" as ${senderClass}`);
}
async function startNewConversation(elements, generateSessionIdFunc, setSessionId, addMessageFunc, logFunc) {
  const sessionId = generateSessionIdFunc();
  if (logFunc) logFunc(`Starting new conversation with session ID: ${sessionId}`);
  elements.chatContainer.querySelector(".brand-header").style.display = "flex";
  elements.chatContainer.querySelector(".new-conversation").style.display = "none";
  elements.chatInterface.classList.add("active");
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "bot-typing";
  typingIndicator.innerHTML = `
    <span class="loading-indicator"></span>
    <span>Toratech AI is typing...</span>
  `;
  elements.messagesContainer.appendChild(typingIndicator);
  setTimeout(() => {
    elements.messagesContainer.removeChild(typingIndicator);
    addMessageFunc(
      elements.messagesContainer,
      "Hello! I'm your Toratech AI Assistant. How can I help you today? Feel free to ask me any questions.",
      "bot",
      logFunc
    );
    elements.textarea.focus();
  }, 1e3);
}
async function sendMessage(elements, message, addMessageFunc, logFunc, config2) {
  if (!message.trim()) return;
  if (logFunc) logFunc(`Sending message: ${message}`);
  addMessageFunc(elements.messagesContainer, message, "user", logFunc);
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "bot-typing";
  typingIndicator.innerHTML = `
    <span class="loading-indicator"></span>
    <span>Toratech AI is typing...</span>
  `;
  elements.messagesContainer.appendChild(typingIndicator);
  elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
  if (config2 && config2.webhook_url) {
    if (logFunc) logFunc("Sending message to webhook: " + config2.webhook_url);
    try {
      const requestData = {
        action: "sendMessage",
        sessionId: config2.sessionId || "default-session",
        route: config2.webhook_route || "general",
        chatInput: message,
        metadata: {
          userId: ""
        }
      };
      const response = await fetch(config2.webhook_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
      if (elements.messagesContainer.contains(typingIndicator)) {
        elements.messagesContainer.removeChild(typingIndicator);
      }
      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status}`);
      }
      const responseData = await response.json();
      let botMessage = "";
      if (Array.isArray(responseData) && responseData.length > 0) {
        botMessage = responseData[0].output;
      } else if (responseData.output) {
        botMessage = responseData.output;
      } else if (typeof responseData === "string") {
        botMessage = responseData;
      } else {
        botMessage = responseData.message || responseData.response || responseData.text || responseData.content || JSON.stringify(responseData);
      }
      addMessageFunc(elements.messagesContainer, botMessage, "bot", logFunc);
      if (logFunc) logFunc("Received response from webhook");
    } catch (error) {
      if (elements.messagesContainer.contains(typingIndicator)) {
        elements.messagesContainer.removeChild(typingIndicator);
      }
      if (logFunc) logFunc("Error sending message to webhook: " + error.message, "error");
      addMessageFunc(
        elements.messagesContainer,
        "Sorry, I couldn't connect to the chat service. Please try again later.",
        "bot",
        logFunc
      );
    }
  } else {
    setTimeout(() => {
      if (elements.messagesContainer.contains(typingIndicator)) {
        elements.messagesContainer.removeChild(typingIndicator);
      }
      addMessageFunc(
        elements.messagesContainer,
        `You said: "${message}". This is a demo response from Toratech AI.`,
        "bot",
        logFunc
      );
    }, 1500);
  }
}
/**
 * Toratech AI Chat Widget
 * A lightweight, embeddable chat widget for customer support
 * @version 1.0.0
 * @license MIT
 */
let widgetElements = null;
let config = { ...DEFAULT_CONFIG };
let isInitialized = false;
if (typeof window !== "undefined" && window[CONFIG_KEY]) {
  config = deepMerge({}, DEFAULT_CONFIG, window[CONFIG_KEY]);
}
function log(message, type = "info") {
  log$1(message, type, config);
}
function setCurrentSessionId(sessionId) {
}
function init(customConfig) {
  if (isInitialized) {
    log("Widget already initialized");
    return widgetElements;
  }
  if (customConfig) {
    config = deepMerge({}, config, customConfig);
  }
  log("Initializing widget");
  injectStyles(config, WIDGET_STYLES, STYLES_ID, log);
  widgetElements = createWidgetElements(config, WIDGET_ID, TOGGLE_ID, CONTAINER_ID, log);
  widgetElements.toggleButton.addEventListener("click", () => {
    const isOpening = !widgetElements.chatContainer.classList.contains("open");
    widgetElements.chatContainer.classList.toggle("open");
    if (isOpening) {
      if (widgetElements.chatInterface.classList.contains("active")) {
        widgetElements.textarea.focus();
      } else {
        widgetElements.newChatBtn.focus();
      }
    }
    log("Widget toggled via click");
  });
  widgetElements.toggleButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const isOpening = !widgetElements.chatContainer.classList.contains("open");
      widgetElements.chatContainer.classList.toggle("open");
      if (isOpening) {
        if (widgetElements.chatInterface.classList.contains("active")) {
          widgetElements.textarea.focus();
        } else {
          widgetElements.newChatBtn.focus();
        }
      }
      log("Widget toggled via keyboard");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && widgetElements.chatContainer.classList.contains("open")) {
      widgetElements.chatContainer.classList.remove("open");
      widgetElements.toggleButton.focus();
      log("Widget closed via ESC key");
    }
  });
  widgetElements.newChatBtn.addEventListener("click", () => {
    startNewConversation(widgetElements, generateSessionId, setCurrentSessionId, addMessageToDisplay, log);
  });
  widgetElements.sendButton.addEventListener("click", () => {
    const message = widgetElements.textarea.value.trim();
    if (message) {
      sendMessage(widgetElements, message, addMessageToDisplay, log, config);
      widgetElements.textarea.value = "";
    }
  });
  widgetElements.textarea.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const message = widgetElements.textarea.value.trim();
      if (message) {
        sendMessage(widgetElements, message, addMessageToDisplay, log, config);
        widgetElements.textarea.value = "";
      }
    }
  });
  widgetElements.closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      widgetElements.chatContainer.classList.remove("open");
      widgetElements.toggleButton.focus();
      log("Widget closed via click");
    });
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        widgetElements.chatContainer.classList.remove("open");
        widgetElements.toggleButton.focus();
        log("Widget closed via keyboard");
      }
    });
  });
  isInitialized = true;
  log("Widget initialized");
  return widgetElements;
}
function close() {
  if (!isInitialized || !widgetElements) {
    log("Cannot close: widget not initialized", "error");
    return false;
  }
  widgetElements.chatContainer.classList.remove("open");
  log("Widget closed via API");
  return true;
}
function destroy() {
  if (!isInitialized) {
    log("Cannot destroy: widget not initialized", "error");
    return false;
  }
  const widget = document.querySelector(`.${WIDGET_ID}`);
  if (widget) {
    widget.remove();
    isInitialized = false;
    widgetElements = null;
    log("Widget destroyed");
    return true;
  }
  return false;
}
const MyPopoutWidget = {
  init: (customConfig) => {
    return init(customConfig);
  },
  // These methods are intentionally disabled to ensure the widget
  // can only be opened by clicking the popout button
  open: () => {
    log("Widget.open() is disabled - widget can only be opened via the popout button", "error");
    return false;
  },
  close: () => close(),
  toggle: () => {
    log("Widget.toggle() is disabled - widget can only be toggled via the popout button", "error");
    return false;
  },
  destroy: () => destroy(),
  version: VERSION
};
if (typeof window !== "undefined") {
  window.MyPopoutWidget = MyPopoutWidget;
  window[NAMESPACE] = MyPopoutWidget;
  if (config.advanced.autoInit) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => init());
    } else {
      init();
    }
  }
}
console.log("[DEBUG] src/index.js started");
function initializeWidget() {
  console.log("[Toratech AI] Initializing widget...");
  if (window.ChatWidgetConfig) {
    MyPopoutWidget.init(window.ChatWidgetConfig);
  } else {
    MyPopoutWidget.init({});
  }
  window.MyPopoutWidget = MyPopoutWidget;
  window[NAMESPACE] = MyPopoutWidget;
  console.log("[Toratech AI] Widget initialized and API exposed globally");
  return MyPopoutWidget;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeWidget);
} else {
  initializeWidget();
}
const index = window.MyPopoutWidget;
export {
  index as default
};
