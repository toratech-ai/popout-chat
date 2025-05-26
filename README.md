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

### Via jsDelivr CDN (Recommended)

Use these links to embed the widget directly from jsDelivr, sourcing from the GitHub repository.

```html
<!-- UMD version - Recommended for most websites -->
<!-- To get the latest version from the 'main' branch -->
<script src="https://cdn.jsdelivr.net/gh/toratech-ai/popout-chat@main/dist/widget.umd.js"></script>

<!-- To get a specific version (replace @<version-tag> with a git tag like @1.0.0 or @v1.0.0) -->
<script src="https://cdn.jsdelivr.net/gh/toratech-ai/popout-chat@<version-tag>/dist/widget.umd.js"></script>
```

### Via ES Module (For modern applications)

```html
<script type="module">
  // Import from the 'main' branch (latest)
  import MyPopoutWidget from 'https://cdn.jsdelivr.net/gh/toratech-ai/popout-chat@main/dist/widget.es.js';
  
  // Or import from a specific version/tag
  // import MyPopoutWidget from 'https://cdn.jsdelivr.net/gh/toratech-ai/popout-chat@<version-tag>/dist/widget.es.js';

  // Initialize the widget
  MyPopoutWidget.init({
    branding: {
      name: 'Toratech AI Support'
    }
  });
</script>
```

### Via npm

If you prefer to manage the package through npm:
```bash
npm install toratech-popout-widget
```
Then you would typically import it into your project's build process.

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Load the widget (latest from 'main' branch) -->
    <script src="https://cdn.jsdelivr.net/gh/toratech-ai/popout-chat@main/dist/widget.umd.js"></script>
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
git clone https://github.com/toratech-ai/popout-chat.git
cd popout-chat

# Install dependencies
npm install

# To run the local example page (index.html in the project root):
# This page is configured to use your local build from the /dist folder.
npm run serve 
# Or, to use Vite's development server (may require different example setup):
# npm run dev
```

### Build Scripts

```bash
npm run build        # Production build (uses Vite)
npm run build:dev    # Development build (uses Vite)
# npm run build:watch  # (Consider adding if you have a Vite watch script)
npm run dev          # Starts Vite development server
npm run serve        # Serves the project root with live-server (opens index.html by default)
npm run clean        # Clean dist folder
```

### Project Structure

```
├── src/                      # Source files
│   ├── index.js              # Main entry point, exports MyPopoutWidget
│   ├── toratech-widget.js    # Core widget class and logic
│   ├── widget-chat-operations.js # Handles chat message sending/receiving
│   ├── widget-constants.js   # Constant values
│   ├── widget-default-config.js # Default configuration for the widget
│   ├── widget-dom.js         # DOM manipulation and element creation
│   ├── widget-styles.js      # CSS styles injected by the widget
│   ├── widget-utils.js       # Utility functions
│   └── debug.js              # Debugging utilities
├── dist/                     # Built files (generated by Vite)
│   ├── widget.umd.js         # UMD bundle
│   ├── widget.es.js          # ES module bundle
│   └── *.map                 # Source maps
├── public/                   # Static assets (e.g., images)
│   └── img/
│       └── toratech-logo.png # Example logo
├── .github/workflows/        # CI/CD configuration
├── index.html                # Example HTML page for local development
├── package.json
└── README.md
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
   - Automatic failover and load balancing
   - Examples:
     - Specific version: `https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.umd.js`
     - Latest version: `https://cdn.jsdelivr.net/npm/toratech-popout-widget@latest/dist/widget.umd.js`
     - ES Module: `https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.es.js`

2. **unpkg** (Alternative)
   - Automatic via npm publish
   - Alternative CDN option
   - Example: `https://unpkg.com/toratech-popout-widget@1.0.0/dist/widget.umd.js`

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
<script src="https://cdn.jsdelivr.net/gh/toratech-ai/popout-chat@main/dist/widget.min.js"></script>
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
