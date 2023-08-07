---
to: src/<%= name %>/src/stories/<%= name %>.tsx
---

import React from 'react';
import UI<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %> from '../<%= name %>';
import { <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>Props } from '../<%= name %>.type';

export const <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>: React.FC<<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>Props> = (props) => {
  return (
    <div>
      <h3 style={{ marginBottom: 30 }}>@ultra-ui/<%= name %></h3>
      <UI<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %> {...props} />
    </div>
  );
};
