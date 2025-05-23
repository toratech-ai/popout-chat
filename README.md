# 🚀 Toratech AI Pop-out Chat Widget

A lightweight, embeddable chat widget that provides seamless customer support integration for any website.

## ✨ Features

- **Zero Dependencies** - Self-contained widget with embedded styles
- **Lightweight** - Minified bundle under 12KB
- **Customizable** - Flexible branding and styling options
- **Responsive** - Works on desktop and mobile devices
- **CDN Ready** - Optimized for global content delivery
- **Easy Integration** - Simple one-line installation

## 📦 Installation

### Via CDN (Recommended)

```html
<!-- Include CSS (optional, styles are also embedded in JS) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.css">

<!-- Include JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.min.js"></script>
```

### Via npm

```bash
npm install toratech-popout-widget
```

## 🎯 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Load the widget -->
    <script src="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.min.js"></script>
    <script>
        // Initialize with default settings
        MyPopoutWidget.init();
    </script>
</body>
</html>
```

## ⚙️ Configuration

```javascript
MyPopoutWidget.init({
  branding: {
    logo: 'https://your-domain.com/logo.png',
    name: 'Toratech AI Support Team',
    welcomeText: 'Hi there! 👋 How can we help you today?',
    responseTimeText: 'We typically respond within minutes.'
  },
  style: {
    primaryColor: '#338AFF',
    secondaryColor: '#2072E8',
    position: 'right', // 'left' or 'right'
    backgroundColor: '#ffffff',
    fontColor: '#333333'
  },
  advanced: {
    autoInit: true,
    debug: false,
    zIndex: 9999,
    storageKey: 'toratech_chat_prefs',
    apiVersion: 'v1'
  },
  webhook_url: 'https://your-backend.com/webhook/chat'
});
```

## 📋 API Reference

### Methods

| Method | Description |
|--------|-------------|
| `MyPopoutWidget.init(config)` | Initialize the widget with optional configuration |
| `MyPopoutWidget.open()` | Open the chat panel |
| `MyPopoutWidget.close()` | Close the chat panel |
| `MyPopoutWidget.destroy()` | Remove the widget completely |
| `MyPopoutWidget.updateConfig(config)` | Update widget configuration |
| `MyPopoutWidget.getConfig()` | Get current configuration |
| `MyPopoutWidget.version` | Get widget version |

### Events

```javascript
// Listen for widget events (if needed)
window.addEventListener('toratech-widget-opened', function() {
    console.log('Chat widget opened');
});

window.addEventListener('toratech-widget-closed', function() {
    console.log('Chat widget closed');
});
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/toratech/popout-chat-widget.git
cd popout-chat-widget

# Install dependencies
npm install

# Build the widget
npm run build
```

### Build Scripts

```bash
npm run build        # Production build
npm run build:dev    # Development build
npm run build:watch  # Watch mode for development
npm run dev          # Development server
npm run clean        # Clean dist folder
```

### Project Structure

```
├── src/
│   ├── index.js              # Main entry point
│   ├── toratech-widget-cdn.js # Core widget implementation
│   └── widget.css            # Widget styles
├── dist/                     # Built files
│   ├── widget.min.js         # Minified JavaScript
│   ├── widget.css            # Extracted CSS
│   └── *.map                 # Source maps
├── examples/
│   └── index.html            # Usage examples
├── .github/workflows/        # CI/CD configuration
└── webpack.widget.config.js  # Build configuration
```

## 🚀 Deployment

### Automatic Deployment

The widget uses GitHub Actions for automated deployment:

1. **Staging**: Every push to `main` branch deploys to staging
2. **Production**: Creating a tag like `v1.2.3` deploys to production

### Manual Deployment

```bash
# Build the widget
npm run build

# Publish to npm (requires npm login)
npm publish

# The package will be automatically available on:
# - jsDelivr: https://cdn.jsdelivr.net/npm/toratech-popout-widget@latest/dist/widget.min.js
# - unpkg: https://unpkg.com/toratech-popout-widget@latest/dist/widget.min.js
```

### CDN Hosting Options

1. **jsDelivr** (Recommended)
   - Automatic via npm publish
   - Global CDN with excellent performance
   - Version-specific URLs

2. **unpkg**
   - Automatic via npm publish
   - Alternative CDN option

3. **Custom S3 + CloudFront**
   - Configure AWS credentials in GitHub secrets
   - Uncomment S3 deployment steps in `.github/workflows/build-and-deploy.yml`

## 📊 Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions  
- **PATCH** version for backwards-compatible bug fixes

### Creating a Release

```bash
# Create and push a new tag
git tag v1.2.3
git push origin v1.2.3

# GitHub Actions will automatically:
# 1. Build the widget
# 2. Publish to npm
# 3. Create a GitHub release
# 4. Deploy to CDN
```

## 🔧 Configuration for Different CDNs

### jsDelivr (Default)
```html
<script src="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.min.js"></script>
```

### unpkg
```html
<script src="https://unpkg.com/toratech-popout-widget@1.0.0/dist/widget.min.js"></script>
```

### Custom CDN
```html
<script src="https://your-cdn.com/widget/v1.0.0/widget.min.js"></script>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@toratech.com
- 📖 Documentation: https://docs.toratech.com/popout-widget
- 🐛 Issues: https://github.com/toratech/popout-chat-widget/issues
