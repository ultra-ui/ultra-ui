import React from 'react';
import UIHtmlEditor from '../html-editor';
import { HtmlEditorProps } from '../html-editor.type';

export const HtmlEditor: React.FC<HtmlEditorProps> = (props) => {
  return (
    <div>
      <h3 style={{ marginBottom: 30 }}>@ultra-ui/html-editor</h3>
      <UIHtmlEditor {...props} />
    </div>
  );
};
