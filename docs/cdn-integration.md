# ToRaTech Chat Widget - CDN Integration Guide

## Quick Start

### 1. Basic Integration (Simplest)

Add this single line before the closing `</body>` tag:

```html
<script src="https://cdn.toratech.com/chat/v1/widget.min.js"></script>
```

That's it! The widget will auto-initialize with default settings and connect to ToRaTech's managed chat service.

### 2. Custom Configuration

For more control over branding and styling, define configuration before loading the script:

```html
<script>
  window.ChatWidgetConfig = {
    branding: {
      logo: '/path/to/logo.png',
      name: 'Your Company',
      welcomeText: 'How can we help you today?',
      responseTimeText: 'We typically respond in minutes.'
    },
    style: {
      primaryColor: '#007bff',
      secondaryColor: '#0056b3',
      position: 'right', // or 'left'
      backgroundColor: '#ffffff',
      fontColor: '#333333'
    }
  };
</script>
<script src="https://cdn.toratech.com/chat/v1/widget.min.js"></script>
```

### 3. Data Attributes Configuration

Configure via HTML attributes for simple deployments:

```html
<script src="https://cdn.toratech.com/chat/v1/widget.min.js"
        data-position="left"
        data-primary-color="#ff6b6b"
        data-debug="true"></script>
```

### 4. Programmatic Control

Access the widget API after initialization:

```javascript
// Initialize with custom config
ToRaTechChat.init({
  style: { primaryColor: '#custom-color' }
});

// Control the widget
ToRaTechChat.open();     // Open chat
ToRaTechChat.close();    // Close chat
ToRaTechChat.destroy();  // Remove widget completely

// Update configuration dynamically
ToRaTechChat.updateConfig({
  style: { position: 'left' }
});

// Get current configuration
const config = ToRaTechChat.getConfig();
```

## Configuration Options

**Note:** Webhook settings are managed by ToRaTech and cannot be configured. All chat messages are automatically routed to ToRaTech's secure chat processing service.

### Branding Options
- `branding.logo` - URL to your logo image
- `branding.name` - Your company name
- `branding.welcomeText` - Initial greeting message
- `branding.responseTimeText` - Response time expectation

### Style Options
- `style.primaryColor` - Main theme color
- `style.secondaryColor` - Secondary theme color
- `style.position` - Widget position ('left' or 'right')
- `style.backgroundColor` - Chat background color
- `style.fontColor` - Text color

### Advanced Options
- `advanced.autoInit` - Auto-initialize on load (default: true)
- `advanced.debug` - Enable debug logging (default: false)
- `advanced.zIndex` - Widget z-index (default: 9999)
- `advanced.storageKey` - LocalStorage key for preferences

## Integration Examples

### WordPress
```php
function add_toratech_chat() {
    ?>
    <script>
      window.ChatWidgetConfig = {
        branding: { name: '<?php echo get_bloginfo('name'); ?>' }
      };
    </script>
    <script src="https://cdn.toratech.com/chat/v1/widget.min.js"></script>
    <?php
}
add_action('wp_footer', 'add_toratech_chat');
```

### React/Next.js
```jsx
useEffect(() => {
  // Load widget script dynamically
  const script = document.createElement('script');
  script.src = 'https://cdn.toratech.com/chat/v1/widget.min.js';
  script.async = true;
  
  window.ChatWidgetConfig = {
    branding: { name: 'My App' }
  };
  
  document.body.appendChild(script);
  
  return () => {
    // Cleanup on unmount
    if (window.ToRaTechChat) {
      window.ToRaTechChat.destroy();
    }
  };
}, []);
```

### Vue.js
```vue
<script>
export default {
  mounted() {
    window.ChatWidgetConfig = {
      branding: { name: 'My Vue App' }
    };
    
    const script = document.createElement('script');
    script.src = 'https://cdn.toratech.com/chat/v1/widget.min.js';
    document.body.appendChild(script);
  },
  
  beforeDestroy() {
    if (window.ToRaTechChat) {
      window.ToRaTechChat.destroy();
    }
  }
}
</script>
```

## CDN URLs

### Production (Stable)
```
https://cdn.toratech.com/chat/v1/widget.min.js
https://cdn.toratech.com/chat/v1/widget.min.js.map (source map)
```

### Specific Versions
```
https://cdn.toratech.com/chat/v1.0.0/widget.min.js
https://cdn.toratech.com/chat/v1.1.0/widget.min.js
```

### Beta/Testing
```
https://cdn.toratech.com/chat/beta/widget.min.js
```

## Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions  
- Safari: Last 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## Performance

- Bundle size: ~45KB minified, ~12KB gzipped
- No external dependencies
- Lazy loads chat interface on demand
- CSS embedded to avoid render blocking

## Security

- Content Security Policy (CSP) compatible
- CORS enabled for cross-origin embedding
- XSS protection built-in
- Secure webhook communication managed by ToRaTech

## Troubleshooting

### Widget not appearing
1. Check browser console for errors
2. Ensure script is loaded after DOM ready
3. Verify no JavaScript errors are blocking execution

### Styling conflicts
Use more specific CSS selectors or increase z-index:
```css
.toratech-chat-widget {
  z-index: 999999 !important;
}
```

### Debug mode
Enable debug logging:
```javascript
window.ChatWidgetConfig = {
  advanced: { debug: true }
};
```

## Migration from Embedded Version

If migrating from the embedded version to CDN:

1. Remove all chat-related imports from your codebase
2. Delete local chat component files
3. Add the CDN script tag
4. Update configuration format if needed

## Support

- Documentation: https://docs.toratech.com/chat-widget
- Issues: https://github.com/toratech/chat-widget/issues
- Email: support@toratech.com
