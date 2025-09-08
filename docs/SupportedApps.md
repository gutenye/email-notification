# List of Supported Apps

## Komodo

Follow [Guide](../src/templates/Komodo/README.md)

## Jellyfin

Follow [Guide](../src/templates/Jellyfin/README.md)

## Ntfy

```sh
curl GUTEN_EMAIL_NOTIFICATIOIN_HOST/API_KEY?title=x -d 'message'
```

## BiliBiliToolPro

[BiliBiliToolPro](https://github.com/RayWangQvQ/BiliBiliToolPro)

```sh
.env
	Ray_Serilog__WriteTo__8__Args__api=https://GUTEN_EMAIL_NOTIFICATIOIN_HOST
	Ray_Serilog__WriteTo__8__Args__bodyJsonTemplate=BiliBiliToolPro\n#msg#
```

## DailyCheckIn

[DailyCheckIn](https://github.com/Sitoi/dailycheckin)

```json
{
	"NTFY_URL": "GUTEN_EMAIL_NOTIFICATIOIN_HOST",
	"NTFY_TOPIC": "API_KEY?title=DailyCheckIn"
}