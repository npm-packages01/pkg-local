# pkg-local

Generate package.json for local package

## usage

pkg-local targetPath

## example

- Original state

[pakage.json]

```json
{
  "name": "example",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

- Execute command
**pkg-local** dist

[dist/package.json]

```json
{
  "name": "example",
  "version": "1.0.0",
  "main": "index.js",
  "types": "index.d.ts"
}
```

## Install local module

- You can install packages that do not include **node_modules**

```sh
npm install ../example/dist
```
