# Email Notification

> A Rest Api to send email, for email notification

## Design

- Simple, minial to use, like ntfy

```sh
curl DOMAIN/UUID -d 'title\nbody'
curl DOMAIN/UUID?debug&title=x -d ANY   # output all debug info
```

## Development

```sh
.env
	API_KEYS=a:a
```

## Deploy

```sh
bun run deploy

Cloudflare Dashboard - WORKER - Settings - Variables
	API_KEYS="name:UUID\n.."
	FROM="ANY@DASHBOARD_DOMAIN"
	TO="Dashboard - DOMAIN - Email - Destination address"
```