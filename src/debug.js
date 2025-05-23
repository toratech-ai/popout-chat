/**
 * Debug utility for Toratech AI Chat Widget
 */

export function debugWidget() {
  console.log('=== TORATECH AI CHAT WIDGET DEBUG ===');
  
  // Check if global objects are available
  console.log('MyPopoutWidget available:', !!window.MyPopoutWidget);
  console.log('ToratechAICHat available:', !!window.ToratechAICHat);
  console.log('ChatWidgetConfig:', window.ChatWidgetConfig);
  
  // Check DOM elements
  const button = document.getElementById('toratech-chat-button');
  const container = document.getElementById('toratech-chat-container');
  const widget = document.getElementById('toratech-chat-widget');
  
  console.log('Widget element found:', !!widget);
  console.log('Button element found:', !!button);
  console.log('Container element found:', !!container);
  
  if (button) {
    console.log('Button styles:', window.getComputedStyle(button));
    console.log('Button click handler attached:', !!button.onclick);
  }
  
  if (container) {
    console.log('Container has open class:', container.classList.contains('open'));
  }
  
  // Log any errors that might have occurred
  console.log('Any errors in console?', 'Check browser console');
  
  return {
    widget,
    button,
    container,
    MyPopoutWidget: window.MyPopoutWidget,
    ToratechAICHat: window.ToratechAICHat
  };
}
