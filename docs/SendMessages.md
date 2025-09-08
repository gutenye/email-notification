# 📤 Send Messages

Simple, minimal API that works just like ntfy - but with email delivery!

## 🚀 Basic Usage

Send a notification with title and body:

```bash
# Just a title and a body
curl https://your-domain.workers.dev/YOUR_API_KEY -d $'Title\nBody'

# Provide title in URL
curl https://your-domain.workers.dev/YOUR_API_KEY?title=Title -d 'Body'
```

## 🎯 Advanced Features

### 📧 Custom From/To Addresses

Send from/to specific email addresses:

```bash
https://your-domain.workers.dev/YOUR_API_KEY?from=alerts@company.com&to=admin@company.com
```

### 🔍 Debug Mode

See full request details for troubleshooting:

```bash
https://your-domain.workers.dev/YOUR_API_KEY?debug=Title
```

**Debug output includes:**

- Full request URL
- Request headers
- Request body
- Response details

### 🎨 Use a Template

Use pre-built templates for rich formatting:

```bash
curl https://your-domain.workers.dev/YOUR_API_KEY?template=Jellyfin -d 'DATA'
```

**Available templates:** See our [Supported Apps](../src/templates/README.md) guide

## 🔗 Integration Examples

**GitHub Actions:**

```yaml
- name: Notify on failure
  run: curl ${{ secrets.NOTIFICATION_URL }} -d "Build failed: ${{ github.workflow }}"
```

**Cron Job:**

```bash
#!/usr/bin/env bash

curl https://your-domain.workers.dev/YOUR_API_KEY -d $'Daily Backup\n$(date): Backup completed successfully'
```
