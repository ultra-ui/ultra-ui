---
to: src/<%= name %>/src/stories/<%= name %>.stories.tsx
---

import { Meta } from '@storybook/react';
import { <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %> } from './<%= name %>';

export default {
  title: 'Ultra UI/<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>/<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>',
  component: <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>,
  tags: ['Ultra UI', '<%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>']
} as Meta;

export const <%= name.split('-').map(i => i.replace(i[0], i[0].toUpperCase())).join('') %>Default = {
  args: {}
};
