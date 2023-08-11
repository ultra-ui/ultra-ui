import { AxiosError, AxiosHeaders, AxiosResponse, Method } from 'axios';

export interface ApiRequestConfig {
  url: string;
  method?: Method | 'POST_MULTI' | 'PUT_MULTI';
  baseURL?: string;
  headers?: AxiosHeaders;
  params?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  transformResponse?: (response: AxiosResponse) => any;
  transformError?: (error: AxiosError) => any;
  internal?: boolean;
}

export interface ApiUploadConfig {
  file: File;
  method?: Method;
  url?: string;
  headers?: AxiosHeaders;
  params?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  uploadFileType?: 'form-data' | 'binary';
  transformResponse?: (response: AxiosResponse) => any;
  transformError?: (error: AxiosError) => any;
  internal?: boolean;
}

export interface ApiContextType {
  baseURL?: string;
  token?: string;
  solrToken?: string;
  headers?: AxiosHeaders;
  cdnURL?: string;
}

export interface ApiProviderProps {
  config: {
    baseURL?: string;
    token?: string;
    solrToken?: string;
    headers?: AxiosHeaders;
  };
  children: React.ReactNode;
}

export interface SolrRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'PUT_MULTI' | 'POST_MULTI';
  baseURL?: string;
  headers?: AxiosHeaders;
  params?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  transformResponse?: (response: AxiosResponse) => any;
  transformError?: (error: AxiosError) => any;
}
