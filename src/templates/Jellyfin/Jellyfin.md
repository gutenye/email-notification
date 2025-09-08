# 🧩 Guten Email Notification for Jellyfin 🧩

> Get instant email notifications for your [Jellyfin](https://jellyfin.org) media server - new movies, shows, music, and more

## 🌟 Features

- **📧 Email Notifications**: Keep your media library history in your email inbox - never miss new content
- **🎬 Media Alerts**: Get notified when new movies, TV shows, music, or books are added
- **👥 Human-friendly messages**: Clean, readable notifications with media details and artwork
- **🚀 Real-time updates**: Instant notifications as soon as content is scanned

## Getting Started

1. **[Quick Deploy](../../../docs/Deployment.md)** - Deploy Guten Email Notification

2. **Configure Jellyfin Integration**

	Navigate to **Jellyfin Dashboard → My Plugins → Webhook** and Add Generic Destination

	```sh
	Server Url: https://my-server.com
	Webhook Url: https://YOUR_DOMAIN.workers.dev/YOUR_API_KEY?template=Jellyfin
	Send All Properties: yes
	```
