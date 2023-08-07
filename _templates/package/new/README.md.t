---
to: src/<%= name %>/README.md
---
## `Ultra UI <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>`

### Install

`npm i @ultra-ui/<%= name %>` or `yarn add @ultra-ui/<%= name %>`

### Usage

```
import { <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %> } from "@ultra-ui/<%= name %>"

<<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %> />

```

### Documentation

See full docs at: https://ultra-ui.com
