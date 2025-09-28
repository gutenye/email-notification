# 🧩 Generic Email Notification 🧩

> Get instant email notifications for generic json data

## 🌟 Features

- **📧 Email Notifications**: Keep your deployment history in your email inbox - never miss important updates
- **👥 Human-friendly messages**: Clean, readable notifications that anyone can understand

## Getting Started

```sh
curl 'https://YOUR_DOMAIN/YOUR_API_KEY?_template=Generic' -d '{"title": "MyTitle", "message": "MyMessage"}'
```

### Custom keys

```sh
curl 'https://YOUR_DOMAIN/YOUR_API_KEY?_template=Generic&_titleKey=a&_messageKey=b' -d '{"a": "MyTitle", "b": "MyMessage"}'
```
