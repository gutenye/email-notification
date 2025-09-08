## 🚀 Deploy

- You must have a domain in Cloudflare
- You can only send emails to your own email addresses

1. Enable Cloudflare Email Routing 

2. click [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/gutenye/email-notification)

3. Configure Variables

```sh
API_KEYS: x  # use `openssl rand -base64 32 | tr '+/' '-_' | tr -d '='` commadn to generate a secure random api key
DEFAULT_FROM: ANY@DOMAIN  # Use the domain in the cloudflare
DEFAULT_TO: YOUR_EMAIL_ADDRESS  # from Dashboard - DOMAIN - Email - Destination address
```

4. Configure Gmail


```
Gmail - create filter
	From: sender email
	Never send it to Spam
```

4. Test it

```sh
curl works.dev/API_KEY -d $'title\nmessage'
```