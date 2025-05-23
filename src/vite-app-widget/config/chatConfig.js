/**
 * Default configuration for the Custom Chat Widget
 * This structure is expected by src/lib/customChatWidget.js
 */

const chatConfig = {
  // Webhook settings for n8n
  webhook: {
    url: "https://luccatora.app.n8n.cloud/webhook/e20c3a9c-8b20-4e47-82c4-61bb7207b07e/chat", // Mapped from old integration.webhookUrl
    route: 'general', // Default value, as seen in template
  },
  
  // Branding elements for the chat interface
  branding: {
    logo: "/lovable-uploads/d340a3d9-13cf-475e-baef-3b3b8b98db94.png", // Mapped from old client.logoUrl
    name: "ToRaTech", // Mapped from old client.name
    welcomeText: "Hi there! 👋 How can I assist you today?", // Mapped from old behavior.welcomeMessage
    responseTimeText: 'We typically respond quickly.', // New default
  },
  
  // Style and appearance settings
  style: {
    primaryColor: "#338AFF", // Mapped from old appearance.primaryColor
    secondaryColor: "#2072E8", // New: A slightly darker shade of primaryColor, adjust as needed
    position: 'right', // New default: 'left' or 'right'
    backgroundColor: '#FFFFFF', // New default: widget background color
    fontColor: '#333333', // New default: text color
  },
};

export default chatConfig;
