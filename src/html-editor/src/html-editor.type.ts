import { UploadBeforeHandler, UploadBeforeReturn } from 'suneditor-react/dist/types/upload';

export interface EditorProps {
  height?: string;
  wrapperClassName?: string;
  defaultHtml?: string;
  defaultStyle?: string;
  buttonList?: string[] | string[][];
  onChange?: (html: string) => void;
  onChangeContent?: (content: string) => void;
  onImageUploadBefore?: (files: File[], info: object, uploadHandler: UploadBeforeHandler) => UploadBeforeReturn;
}

export interface EditorRef {
  getHtml?: () => string;
  getContent?: () => string;
  setHtml?: (html: string) => void;
}
