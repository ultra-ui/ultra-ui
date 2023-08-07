---
to: src/<%= name %>/src/<%= name %>.type.ts
---

export interface <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>Props {
  test?: string;
}
