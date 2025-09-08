# 🧩 Guten Email Notification for DailyCheckIn 🧩

> Get instant email notifications for your [DailyCheckIn](https://github.com/Sitoi/dailycheckin) automated daily check-in results and rewards

## 🌟 Features

- **📧 Email Notifications**: Keep your daily check-in history in your email inbox - never miss important updates
- **🎯 Daily Check-ins**: Get notified about various platform daily check-in results and rewards
- **🤖 Automation Alerts**: Track your automated check-in tasks and their success/failure status
- **👥 Human-friendly messages**: Clean, readable notifications with check-in details

## Getting Started

1. **[Quick Deploy](../../docs/Deployment.md)** - Deploy Guten Email Notification

2. **Configure DailyCheckIn Integration**

	Add the following to your DailyCheckIn configuration:

	```json
	{
	  "NTFY_URL": "https://HOST",
	  "NTFY_TOPIC": "YOUR_API_KEY?title=DailyCheckIn"
	}
	```
