# 🧩 Sonarr / Radarr like 🧩

> Get instant email notifications for your [Sonarr](https://github.com/Sonarr/Sonarr) and [Radarr](https://github.com/Radarr/Radarr) downloads, library updates, and automation events

## 🌠️ Screenshots

![Screenshot](./screenshot.png)

## 🌟 Features

- **📧 Email Notifications**: Keep your deployment history in your email inbox - never miss important updates
- **👥 Human-friendly messages**: Clean, readable notifications that anyone can understand

## Getting Started

1. Follow the [Quick Deploy](../../docs/Deployment.md) guide, deploy Guten Email Notification service.

2. Configure Sonarr / Radarr Integration

   Go to Sonarr / Radarr Settings -> Connect -> Add -> Select ntfy.sh

   ```sh
    Server URL: https://YOUR_DOMAIN
    Topics: YOUR_API_KEY?_template=Ntfy
   ```

   > Note: use `_template` key instead of `template` key, as it supports its own template
