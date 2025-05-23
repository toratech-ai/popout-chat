/**
 * Toratech AI Chat Widget - Styles
 * @version 1.0.0
 * @license MIT
 */

export const WIDGET_STYLES = 
  `.toratech-chat-widget {
    --chat-color-primary: var(--toratech-chat-primary-color, #0066cc);
    --chat-color-secondary: var(--toratech-chat-secondary-color, #004d99);
    --chat-color-background: var(--toratech-chat-background-color, #ffffff);
    --chat-color-font: var(--toratech-chat-font-color, #333333);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .toratech-chat-widget .chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    display: none;
    flex-direction: column;
    width: 350px;
    height: 500px;
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
    background-color: var(--chat-color-primary);
    color: white;
    border-bottom-right-radius: 5px;
  }

  .toratech-chat-widget .chat-message.bot {
    align-self: flex-start;
    background-color: #f0f0f0;
    color: var(--chat-color-font);
    border-bottom-left-radius: 5px;
  }

  .toratech-chat-widget .bot-typing {
    align-self: flex-start;
    background-color: #f0f0f0;
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
  }

  .toratech-chat-widget textarea {
    flex-grow: 1;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px 15px;
    resize: none;
    font-family: inherit;
    font-size: 14px;
    outline: none;
    max-height: 100px;
    min-height: 40px;
  }

  .toratech-chat-widget textarea:focus {
    border-color: var(--chat-color-primary);
  }

  .toratech-chat-widget .chat-input button {
    background-color: var(--chat-color-primary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
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
