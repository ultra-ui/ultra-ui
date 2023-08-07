---
to: src/<%= name %>/src/<%= name %>.tsx
---

import React, { memo } from 'react';
import { <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>Props } from './<%= name %>.type';

const <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>: React.FC<<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>Props> = (props) => {
  const { test } = props;

  return (
    <div><%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %></div>
  );
};

export default memo(<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>);
