# GitHub Pages CDN for Toratech AI Pop-out Chat Widget

This document explains how to use and deploy the Toratech AI Pop-out Chat Widget via GitHub Pages CDN.

## CDN URLs

The widget is available at the following URLs:

### Latest Version
- UMD (Universal Module Definition): `https://tora-carl.github.io/popout-chat/latest/widget.umd.js`
- ES Module: `https://tora-carl.github.io/popout-chat/latest/widget.es.js`

### Specific Version
- UMD (v1.0.0): `https://tora-carl.github.io/popout-chat/v1.0.0/widget.umd.js`
- ES Module (v1.0.0): `https://tora-carl.github.io/popout-chat/v1.0.0/widget.es.js`

## Integration

### Basic Integration

Add the following script tag to your HTML:

```html
<script src="https://tora-carl.github.io/popout-chat/latest/widget.umd.js"></script>
<script>
  // Initialize with default settings
  MyPopoutWidget.init();
</script>
```

### With Custom Configuration

```html
<script src="https://tora-carl.github.io/popout-chat/latest/widget.umd.js"></script>
<script>
  MyPopoutWidget.init({
    branding: {
      logo: 'https://your-domain.com/logo.png',
      name: 'Toratech AI Support',
      welcomeText: 'Hi there! 👋 How can we help you today?'
    },
    style: {
      primaryColor: '#338AFF',
      position: 'right'
    },
    webhook_url: 'https://your-backend.com/webhook/chat'
  });
</script>
```

### Using ES Modules

```html
<script type="module">
  import MyPopoutWidget from 'https://tora-carl.github.io/popout-chat/latest/widget.es.js';
  
  MyPopoutWidget.init({
    // Your configuration here
  });
</script>
```

## Deployment Process

The widget is automatically deployed to GitHub Pages when:

1. Changes are pushed to the `main` branch
2. The `dist/` directory contains updated files
3. The GitHub Actions workflow runs successfully

The deployment process:
1. Takes the built files from the `dist/` directory
2. Creates a versioned structure in the `cdn/` directory
3. Deploys to GitHub Pages

## Versioning Strategy

- `latest/` - Always points to the most recent stable build
- `v1.0.0/` - Points to specific versions (follows semantic versioning)

## Troubleshooting

If the CDN URLs are not working:

1. Ensure GitHub Pages is enabled in the repository settings
2. Check the GitHub Actions workflow runs successfully
3. Verify the correct branch is being deployed (usually `gh-pages`)
4. Clear your browser cache to ensure you're getting the latest version

## CORS Considerations

The GitHub Pages CDN has CORS enabled by default, allowing the widget to be used on any website.
