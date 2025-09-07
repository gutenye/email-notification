# Guten Email Notification

> Zero configuration, ntfy like email notification. 
> Supports various services like Jellyfin, Komodo, BilibiliToolPro, etc

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

## List of parameters

| Name | Description|
|--|--|
| from | email adderss, Name <email> |
| to | email address |
| debug | title, log debug info |
| 

## List of Templates

- [Komodo](./src/templates/komodo)



## Deploy

1. Generate secure random API key

```sh
openssl rand -base64 32 | tr '+/' '-_' | tr -d '=' 
```

2. [Click to deploy Cloudflare]

```sh
bun run deploy

Cloudflare Dashboard - WORKER - Settings - Variables
	API_KEYS: Secret, "API_KEY\n.."
	FROM: Text, "ANY@DASHBOARD_DOMAIN"
	TO: Text, "Dashboard - DOMAIN - Email - Destination address"
```

3. Enable Cloudflare Email Routing 

3. Gmail skip spam

```
Gmail - create filter
	From: sender email
	Never send it to Spam
```


## Development

```sh
.env
	API_KEYS=a
```

