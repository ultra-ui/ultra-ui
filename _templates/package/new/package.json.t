---
to: src/<%= name %>/package.json
---
{
  "name": "@ultra-ui/<%= name %>",
  "version": "0.0.1",
  "description": "Ultra UI <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>",
  "author": "Nguyen Hong Duc",
  "type": "module",
  "license": "MIT",
  "main": "lib/index.js",
  "module": "lib/index.esm.js",
  "types": "lib/index.d.ts",
  "files": [
    "lib"
  ],
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ultra-ui/ultra-ui"
  },
  "bugs": {
    "url": "https://github.com/ultra-ui/ultra-ui"
  },
  "scripts": {
    "build": "rollup -c"
  },
  "peerDependencies": {
    "antd": "^5.6.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
