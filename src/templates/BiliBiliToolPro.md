# 🧩 Guten Email Notification for BiliBiliToolPro 🧩

> Get instant email notifications for your [BiliBiliToolPro](https://github.com/RayWangQvQ/BiliBiliToolPro) daily check-in results and automation tasks

## 🌟 Features

- **📧 Email Notifications**: Keep your daily check-in history in your email inbox - never miss important updates
- **🎯 Daily Check-ins**: Get notified about Bilibili daily check-in results and rewards
- **🤖 Automation Alerts**: Track your automated tasks and their success/failure status
- **👥 Human-friendly messages**: Clean, readable notifications with check-in details

## Getting Started

1. **[Quick Deploy](../../docs/Deployment.md)** - Deploy Guten Email Notification

2. **Configure BiliBiliToolPro Integration**

   Add the following to your BiliBiliToolPro `.env` file:

   ```bash
   # .env file
   Ray_Serilog__WriteTo__8__Args__api=https://YOUR_DOMAIN/YOUR_API_KEY
   Ray_Serilog__WriteTo__8__Args__bodyJsonTemplate=BiliBiliToolPro\n#msg#
   ```
