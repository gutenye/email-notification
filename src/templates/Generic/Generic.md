# 🧩 Generic Email Notification 🧩

> Get instant email notifications for generic json data

## 🌟 Features

- **📧 Email Notifications**: Keep your deployment history in your email inbox - never miss important updates
- **👥 Human-friendly messages**: Clean, readable notifications that anyone can understand

## Getting Started

```sh
curl 'https://HOST/API_KEY?template=Generic' -d '{"title": "MyTitle", "message": "MyMessage"}'
```

### Custom keys

```sh
curl 'https://HOST/API_KEY?template=Generic&titleKey=a&messageKey=b' -d '{"a": "MyTitle", "b": "MyMessage"}'
```
