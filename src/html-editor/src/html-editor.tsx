import React, { Ref, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import { UploadBeforeHandler } from 'suneditor-react/dist/types/upload';
import 'suneditor/dist/css/suneditor.min.css';
import SunEditorRef from 'suneditor/src/lib/core';
import { BUTTON_LIST } from './html-editor.data';
import { HtmlEditorProps, HtmlEditorRef } from './html-editor.type';

const HtmlEditor: React.FC = forwardRef((props: HtmlEditorProps, ref: Ref<HtmlEditorRef>) => {
  const {
    onChange,
    onChangeContent,
    defaultHtml = '',
    height = '600px',
    defaultStyle,
    buttonList = BUTTON_LIST,
    onImageUploadBefore,
    wrapperClassName
  } = props;
  const [html, setHtml] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<SunEditorRef>();

  const getContentHtml = useCallback((html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || '';
  }, []);

  const onChangeHtml = useCallback(
    (html: string) => {
      setHtml(html);
      const content = getContentHtml(html);
      setContent(content);
      onChangeContent && onChangeContent(content);
      onChange && onChange(html);
    },
    [getContentHtml, onChange, onChangeContent]
  );

  const onUploadImage = useCallback(
    (files: File[], info: object, uploadHandler: UploadBeforeHandler) => {
      if (!onImageUploadBefore) {
        return undefined;
      }
      return onImageUploadBefore(files, info, uploadHandler);
    },
    [onImageUploadBefore]
  );

  useImperativeHandle(ref, () => ({
    getHtml: () => {
      if (!content && !html.includes('<img')) {
        return '';
      }
      return html;
    },
    setHtml: (value) => {
      setHtml(value);
      setContent(getContentHtml(value));
    },
    getContent: () => content
  }));

  useEffect(() => {
    if (defaultHtml) {
      setHtml(defaultHtml);
    }
  }, [defaultHtml]);

  return (
    <div className={wrapperClassName}>
      <SunEditor
        onChange={onChangeHtml}
        setContents={html}
        setOptions={{
          buttonList,
          defaultTag: 'div',
          minHeight: height,
          showPathLabel: false
        }}
        getSunEditorInstance={(ref) => (editorRef.current = ref)}
        setDefaultStyle={defaultStyle}
        onInput={(e: any) => {
          const content = e.target?.innerText || '';
          setContent(content);
          onChangeContent && onChangeContent(content);
        }}
        onImageUploadBefore={onUploadImage}
      />
    </div>
  );
});

export default memo(HtmlEditor);
