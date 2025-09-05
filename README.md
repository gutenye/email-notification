# Email Notification

> Free, unlimited, ntfy like email notification

- You must have a domain in Cloudflare
- You can only send emails to your own email addresses

## Usage

- Simple, minial to use, like ntfy

```sh
curl DOMAIN/API_KEY -d 'title\nbody'
```

### Custom Title

```sh
curl DOMAIN/API_KEY?title=TITLE -d 'body'
```


### Debug mode

```sh
curl DOMAIN/API_KEY?debug=TITLE -d 'body'   # output url, headers, body
```

### Use Template

```sh
curl DOMAIN/API_KEY?template=TEMPLATE -d 'json'
```

## List of Templates

- [Komodo](./src/templates/komodo)


## Development

```sh
.env
	API_KEYS=a:a
```

## Deploy

1. Generate secure random API key

```sh
openssl rand -base64 32 | tr '+/' '-_' | tr -d '=' 
```

```sh
bun run deploy

Cloudflare Dashboard - WORKER - Settings - Variables
	API_KEYS="name:API_KEY\n.."
	FROM="ANY@DASHBOARD_DOMAIN"
	TO="Dashboard - DOMAIN - Email - Destination address"
```

3. Gmail skip spam

```
Gmail - create filter
	From: sender email
	Never send it to Spam
```

