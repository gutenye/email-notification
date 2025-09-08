# 🧩 Komodo Email Notification 🧩

> Send [Komodo](https://github.com/moghtech/komodo) notifications to your email

## 🌠️ Screenshots

![Screenshot](./screenshot.png)

## 🌟 Features

- **Human friendly messages**: easy to read message
- **Email Notiifcations**: keep your notification and history in your email inbox

## Getting Started

```sh
template=komodo
sererName=MyServer
komodoHost=https://my-server.com
--
skip=StackStateChange,..  # skip sending notification for these types.
```

Use it in Komodo

```sh
Komodo - settings - alerts

- Url: https://HOST/API_KEY?template=Komodo&serverName=MyServer&komodoHost=https://my-server.com
```