# Send Messages

## Usage

- Simple, minial to use, like ntfy

```sh
curl HOST/API_KEY -d $'title\nmessage'
```

### Custom Title

```sh
curl HOST/API_KEY?title=TITLE -d 'message'
```

### Custom From/To

```sh
curl DOMAIN/API_KEY?from=EMAIL&to=EMAIL -d 'body'
```

### Debug mode

```sh
curl HOST/API_KEY?debug=TITLE -d 'body'   # display debug information include  url, request headers and body
```

### Use Template

```sh
curl HOST/API_KEY?template=TEMPLATE -d 'body'
```

see [a list of templates](./SupportedApps.md)
