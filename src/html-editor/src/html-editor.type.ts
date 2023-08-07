import { UploadBeforeHandler, UploadBeforeReturn } from 'suneditor-react/dist/types/upload';

export interface HtmlEditorProps {
  height?: string;
  wrapperClassName?: string;
  defaultHtml?: string;
  defaultStyle?: string;
  buttonList?: string[] | string[][];
  onChange?: (html: string) => void;
  onChangeContent?: (content: string) => void;
  onImageUploadBefore?: (files: File[], info: object, uploadHandler: UploadBeforeHandler) => UploadBeforeReturn;
}

export interface HtmlEditorRef {
  getHtml?: () => string;
  getContent?: () => string;
  setHtml?: (html: string) => void;
}
