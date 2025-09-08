# List of Supported Apps

## Komodo

Follow [Guide](../src/templates/Komodo/README.md)

## Jellyfin

Follow [Guide](../src/templates/Jellyfin/README.md)

## Ntfy

> Some apps doesn't support custom url, you can use Ntfy

Apps like: [DailyCheckIn](https://github.com/Sitoi/dailycheckin)

```json
{
	"NTFY_URL": "https://GUTEN_EMAIL_NOTIFICATIOIN_HOST",
	"NTFY_TOPIC": "API_KEY"
}
```

## BiliBiliToolPro

```sh
.env
	Ray_Serilog__WriteTo__8__Args__api=https://GUTEN_EMAIL_NOTIFICATIOIN_HOST
	Ray_Serilog__WriteTo__8__Args__bodyJsonTemplate=BiliBiliToolPro\n#msg#
```