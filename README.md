# Toratech AI Pop-out Chat Widget

A lightweight, customizable, and embeddable pop-out chat widget for websites.

## Features

-   **Lightweight:** Optimized for performance.
-   **Customizable:** Adapt appearance and behavior via configuration.
-   **CDN Ready:** Supports integration via CDN for efficient delivery.
-   **Responsive Design:** Adapts to various screen sizes, including desktop and mobile.
-   **Zero Dependencies:** Self-contained.
-   **Developer Friendly:** Provides a clear API and configuration options.

## Installation & Usage via CDN (Recommended)

To add the Toratech AI Pop-out Chat Widget to a website, use a Content Delivery Network (CDN) such as jsDelivr or unpkg for efficient asset loading.

You'll need to include the widget's CSS file in the `<head>` of your HTML and the JavaScript file typically before the closing `</body>` tag.

### 1. Include CSS & JavaScript

**Option A: Using jsDelivr**

```html
<head>
    <!-- ... other head elements ... -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.css">
</head>
<body>
    <!-- ... your website content ... -->
    <script src="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.min.js"></script>
    <!-- For ES Module support, use widget.es.js instead of widget.min.js -->
    <!-- <script type="module" src="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.es.js"></script> -->
</body>
```

**Option B: Using unpkg**

```html
<head>
    <!-- ... other head elements ... -->
    <link rel="stylesheet" href="https://unpkg.com/toratech-popout-widget@1.0.0/dist/widget.css">
</head>
<body>
    <!-- ... your website content ... -->
    <script src="https://unpkg.com/toratech-popout-widget@1.0.0/dist/widget.min.js"></script>
    <!-- For ES Module support, use widget.es.js instead of widget.min.js -->
    <!-- <script type="module" src="https://unpkg.com/toratech-popout-widget@1.0.0/dist/widget.es.js"></script> -->
</body>
```

### 2. Initialize the Widget

After including the script, you need to initialize the widget. You can do this with default settings or provide a custom configuration object.

```html
<script>
    // Initialize with default settings
    // MyPopoutWidget.init();

    // Or, initialize with your custom configuration (see Configuration section below)
    MyPopoutWidget.init({
        branding: {
            name: "My Company Support",
            logo: "https://example.com/my-logo.png"
        },
        style: {
            primaryColor: "#007bff"
        },
        webhook_url: "https://api.mycompany.com/chat", // Required for chat functionality
        webhook_route: "/messages" // Optional: if your webhook_url doesn't include the full path
    });
</script>
```

## Quick Start Example (`index.html`)

Here's a complete basic example for your `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website with Toratech AI Chat</title>
    <!-- 1. Include Widget CSS (using jsDelivr, replace @1.0.0 with desired version or @latest) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.css">
</head>
<body>
    <h1>Website Main Content</h1>
    <p>This page includes the Toratech AI Chat Widget.</p>

    <!-- Your other website content -->

    <!-- 2. Include Widget JavaScript (using jsDelivr, replace @1.0.0 with desired version or @latest) -->
    <script src="https://cdn.jsdelivr.net/npm/toratech-popout-widget@1.0.0/dist/widget.min.js"></script>

    <!-- 3. Initialize the Widget -->
    <script>
        MyPopoutWidget.init({
            branding: {
                name: "Help Desk",
                welcomeText: "Hi! How can we assist you today?"
            },
            style: {
                primaryColor: "#5A3E8E" // Example color
            },
            // IMPORTANT: Configure your backend webhook URL for the chat to function
            webhook_url: "YOUR_BACKEND_WEBHOOK_URL_HERE",
            // webhook_route: "/chat-endpoint" // Optional: if your webhook_url is just the base
        });
    </script>
</body>
</html>
```

## Configuration

You can customize the widget by passing a configuration object to `MyPopoutWidget.init(config)`. Here are the available options and their default values (as defined in `src/widget-default-config.js`):

```javascript
MyPopoutWidget.init({
  // Branding options
  branding: {
    logo: 'https://cdn.toratech.com/assets/default-logo.png', // URL for your logo
    name: 'Toratech AI Support',                             // Name displayed in the widget header
    welcomeText: 'Hi there! How can I assist you today?', // Initial greeting message
    responseTimeText: 'We typically respond quickly.',       // Text indicating typical response time
    poweredBy: {
      text: 'Powered by Toratech AI',
      link: 'https://toratech.ai'
    }
  },

  // Style customization
  style: {
    primaryColor: '#338AFF',    // Main theme color (buttons, highlights)
    secondaryColor: '#2072E8',  // Secondary theme color
    position: 'right',          // Widget position on page ('left' or 'right')
    backgroundColor: '#ffffff', // Widget background color
    fontColor: '#333333',       // Widget text color
    userBubbleColor: '',        // User's chat bubble background (defaults to primaryColor if empty)
    botBubbleColor: '#f0f0f0'   // Bot/Agent's chat bubble background
  },

  // Webhook configuration (REQUIRED for chat functionality)
  webhook_url: '', // Base URL for your backend API that handles chat messages
  webhook_route: ''  // Specific endpoint/route on your webhook_url (e.g., '/messages', '/chat')
                     // If your webhook_url already includes the full path, this can be empty.
});
```

**Important:** The `webhook_url` (and optionally `webhook_route`) is crucial for the chat functionality. The widget will send messages to and receive messages from this backend endpoint. You must implement a backend service at this URL to handle chat interactions.

## API Reference

The widget exposes the following methods on the global `MyPopoutWidget` object:

| Method                      | Description                                                                 |
| --------------------------- | --------------------------------------------------------------------------- |
| `MyPopoutWidget.init(config)` | Initializes the widget with an optional configuration object.             |
| `MyPopoutWidget.open()`       | Programmatically opens the chat widget. (Note: Default behavior is user-click initiated) |
| `MyPopoutWidget.close()`      | Programmatically closes the chat widget.                                    |
| `MyPopoutWidget.destroy()`    | Removes the widget from the page and cleans up resources.                   |
| `MyPopoutWidget.version`      | Returns the current version string of the widget.                         |

*(Note: The `open()` and `toggle()` methods may be restricted to user interaction based on the current implementation. Refer to `src/toratech-widget.js` for specific API behavior.)*

## For Developers (Contributing & Building Locally)

If you want to contribute to the development of this widget or build it locally:

### Prerequisites

-   Node.js (version 18+ recommended)
-   npm or yarn

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/toratech-popout-widget.git
    cd toratech-popout-widget
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Build Scripts

-   `npm run build`: Creates a production-ready build in the `dist` folder.
-   `npm run build:dev`: Creates a development build (unminified, with source maps).
-   `npm run build:watch`: Watches for file changes and rebuilds automatically for development.

### Project Structure

-   `src/`: Contains the source code for the widget.
    -   `index.js`: Main entry point, handles initialization and global API.
    -   `toratech-widget.js`: Core widget logic and API implementation.
    -   `widget-default-config.js`: Default configuration values.
    -   `widget.css`: Styles for the widget.
    -   `widget-constants.js`, `widget-utils.js`, `widget-dom.js`, `widget-chat-operations.js`: Helper modules.
-   `dist/`: Contains the built files (`widget.min.js`, `widget.es.js`, `widget.css`).
-   `examples/`: Contains an `index.html` for testing and demonstration.
-   `webpack.config.js`: Webpack configuration for the build process.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-amazing-feature`).
3.  Make your changes and commit them (`git commit -m 'feat: Add amazing feature'`).
4.  Push to your branch (`git push origin feature/your-amazing-feature`).
5.  Open a Pull Request.

Please ensure your code follows the existing style and all tests pass.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

-   Check the [GitHub Issues](https://github.com/your-username/toratech-popout-widget/issues) page.
-   For direct support, contact: `support@toratech.ai` (Update with actual support email if different).