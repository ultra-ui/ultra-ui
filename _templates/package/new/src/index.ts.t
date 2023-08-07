---
to: src/<%= name %>/src/index.ts
---
import <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %> from './<%= name %>';

export { <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %> };
