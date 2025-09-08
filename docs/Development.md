
# 🛠️ Development Guide

Get started with local development and contribute to Guten Email Notification.

## 🚀 Quick Start

**Setup:**
```bash
# Clone the repository
git clone https://github.com/gutenye/email-notification.git
cd email-notification

# Install dependencies
bun install

# Copy environment template
cp .env.example .env

# Edit your environment variables
edit .env

# Start the server
bun run dev
```

**Your local server will be available at:** `http://localhost:8787`

## 🧪 Testing

**Send a test notification:**

```bash
curl http://localhost:8787/YOUR_API_KEY -d $'Test Notification\nHello from local development!'
```

## 🏗️ Project Structure

```sh
src/
├── index.ts              # Main Cloudflare Worker entry point
├── sendEmail.ts          # Email sending logic
├── messages/             # Message builders
│   ├── buildSimpleMessage.ts
│   ├── buildTemplateMessage.ts
│   └── buildDebugMessage.ts
├── templates/            # App-specific templates
│   ├── Jellyfin/
│   ├── Komodo/
│   └── _template_/       # Template for new integrations
└── utils/                # Utility functions
```

## 🎨 Creating Custom Template

```bash
cp src/tempaltes/_template_ src/templates/YourApp
```

## 🧪 Running Tests

```bash
# Run all tests
bun test
```

## 📦 Deployment

```bash
# Deploy to Cloudflare
bun run deploy
```
