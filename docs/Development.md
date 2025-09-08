
# Development

```sh
cp .env.example .env

edit .env

bun install

bun start
	served at http://localhost:8787
```

Test

```sh
curl http://localhost:8787/API_KEY -d $'title\nmessage'
```

Read more at [Deployment](./Deployment.md)
