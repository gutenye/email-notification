# 🧩 GoBackup Email Notification 🧩

> Get instant email notifications for your [GoBackup](https://github.com/gobackup/gobackup) databases backup status

## 🌟 Features

- **📧 Email Notifications**: Keep your deployment history in your email inbox - never miss important updates
- **👥 Human-friendly messages**: Clean, readable notifications that anyone can understand

## Getting Started

1. Follow [Quick Deploy](../../../docs/Deployment.md) guide, deploy Guten Email Notification

2. Configure GoBackup Integration

   Edit `~/.gobackup/gobackup.yml` file

   ```yml
   models:
     my_app:
       notifiers:
       webhook:
         type: webhook
         url: https://YOUR_DOMAIN/YOUR_API_KEY?_template=Generic
         method: POST
   ```
