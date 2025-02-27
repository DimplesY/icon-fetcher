# icon-fetcher

Be inspired by [favicon-stealer](https://github.com/iAmCorey/favicon-stealer)

A vue component to get clear and consistent favicon of a website easily.


# installation
## npm
```shell
npm install icon-fetcher
```
## pnpm
```shell
pnpm add icon-fetcher
```

# usage
```typescript
import { Favicon } from 'icon-fetcher'

<Favicon url="https://example.com" />
```

## props
| Name | Type | Description |
| ---- | ---- | ----------- |
| `url` | `string` | The URL of the website to fetch the favicon for. |
| `size` | `number` | The size of the favicon in pixels. Default is 32. |
| `className` | `string` | A class name to apply to the element. |
| `timeout` | `number` | The timeout in milliseconds for fetching the favicon. Default is 3000 (3 seconds). |
| `lazy` | `boolean` | Whether to load the favicon lazily. Default is false. |
| `border` | `boolean` | Whether to show a border around the favicon. Default is false. |
| `padding` | `number` | The padding in pixels.(px) Default is 0. |
| `background` | `string` | The background color of the favicon. Default is transparent.(in hex) |
| `borderRadius` | `number` | The border radius in pixels.(px) Default is 0. |
| `preferFallback` | `boolean` | Whether to prefer fallback service (e.g.Google's favicon service) over the website's own favicon. Default is false. |


# npm package
[icon-fetcher - npm](https://www.npmjs.com/package/icon-fetcher)


# github repository
[icon-fetcher - github](https://github.com/DimplesY/icon-fetcher)


# license
MIT License


# Changelog
- v0.0.1: Initial release (2025.2.27)
