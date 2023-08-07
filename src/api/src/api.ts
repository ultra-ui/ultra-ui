import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { ApiRequestConfig, ApiUploadConfig } from './api.type';
import { ApiContext } from './context/api-provider';

export const API = {
  request: (config: ApiRequestConfig) => {
    const defaultConfig = ApiContext?._currentValue || {};
    const { baseURL: defaultBaseURL, token, headers: defaultHeader = {} } = defaultConfig;

    const {
      method = 'GET',
      url,
      baseURL,
      headers = {},
      params,
      timeout = 10000,
      timeoutErrorMessage = 'Hệ thống không phản hồi. Vui lòng thử lại sau',
      transformResponse,
      transformError
    } = config;

    const configHeader: AxiosHeaders = token ? { Authorization: `Bearer ${token}`, ...defaultHeader } : defaultHeader;

    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      baseURL: baseURL || defaultBaseURL,
      headers: { 'Content-Type': 'application/json', ...configHeader, ...headers },
      timeout,
      timeoutErrorMessage
    };

    if (params) {
      method.toLowerCase().trim() === 'get' ? (requestConfig.params = params) : (requestConfig.data = params);
    }

    return axios(requestConfig)
      .then((response) => {
        const { data } = response;
        return transformResponse ? transformResponse(response) : data;
      })
      .catch((error) => {
        if (transformError) {
          return Promise.reject(transformError(error));
        }
        return Promise.reject(error?.response?.data || error);
      });
  },

  solr: (config: ApiRequestConfig) => {
    const defaultConfig = ApiContext?._currentValue || {};
    const { baseURL: defaultBaseURL, solrToken, headers: defaultHeader = {} } = defaultConfig;

    const {
      method = 'GET',
      url,
      baseURL,
      headers = {},
      params,
      timeout = 10000,
      timeoutErrorMessage = 'Hệ thống không phản hồi. Vui lòng thử lại sau',
      transformResponse,
      transformError
    } = config;

    const configHeader: AxiosHeaders = solrToken
      ? { Authorization: `Basic ${solrToken}`, ...defaultHeader }
      : defaultHeader;

    let urlRequest = url;
    if (method === 'GET') {
      urlRequest = `${url}?${params?.q ? '' : '&q=*%3A*'}&omitHeader=true`;
    }
    if (['POST', 'PUT', 'DELETE', 'POST_MULTI', 'PUT_MULTI'].includes(method)) {
      urlRequest = `${url}?commit=true`;
    }

    const requestConfig: AxiosRequestConfig = {
      method: method === 'GET' ? 'GET' : 'POST',
      url: urlRequest,
      baseURL: baseURL || defaultBaseURL,
      headers: { 'Content-Type': 'application/json', ...configHeader, ...headers },
      timeout,
      timeoutErrorMessage
    };

    if (method === 'GET' && params) {
      requestConfig.params = params;
    } else {
      let requestData: Record<string, unknown> | null = null;
      if (method === 'POST') {
        requestData = { add: [params] };
      }
      if (['POST_MULTI', 'PUT_MULTI'].includes(method)) {
        requestData = { add: params };
      }
      if (method === 'PUT') {
        const { id, ...rest } = params;
        const dataTransform = Object.entries(rest).reduce((prev, curr) => {
          const [field, value] = curr;
          const obj: Record<string, unknown> = {};
          obj[field] = { set: value };
          return { ...prev, ...obj };
        }, {});
        requestData = { add: [{ id, ...dataTransform }] };
      }
      if (method === 'DELETE') {
        let deleteIds: string[] = [];
        if (Array.isArray(params.id) && params.id.length) {
          deleteIds = params.id;
        } else {
          deleteIds = [params.id];
        }
        requestData = { delete: deleteIds };
      }
      requestConfig.data = requestData;
    }

    return axios(requestConfig)
      .then((response) => {
        const { data } = response;
        return transformResponse ? transformResponse(response) : data?.response?.docs;
      })
      .catch((error) => {
        if (transformError) {
          return Promise.reject(transformError(error));
        }
        const errorResponse = error?.response?.data?.error || error;
        return Promise.reject({ ...errorResponse, message: errorResponse?.msg });
      });
  },

  upload: (config: ApiUploadConfig) => {
    const defaultConfig = ApiContext?._currentValue || {};
    const { cdnURL: defaultCdnURL, token, headers: defaultHeader = {} } = defaultConfig;
    const configHeader: AxiosHeaders = token ? { Authorization: `Bearer ${token}`, ...defaultHeader } : defaultHeader;

    const {
      file,
      uploadFileType = 'form-data',
      url,
      headers = {},
      params,
      timeout = 10000,
      timeoutErrorMessage = 'Hệ thống không phản hồi. Vui lòng thử lại sau',
      transformError,
      transformResponse,
      method = 'POST'
    } = config;

    if (!file) {
      return Promise.resolve(null);
    }

    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...configHeader,
        ...headers
      },
      method,
      params,
      timeout,
      timeoutErrorMessage,
      baseURL: defaultCdnURL,
      url
    };

    if (uploadFileType === 'binary') {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const blob = new Blob([reader.result as BlobPart]);
        const uploadConfig: AxiosRequestConfig = {
          ...requestConfig,
          data: blob
        };
        return axios(uploadConfig)
          .then((response) => {
            const { data } = response;
            return transformResponse ? transformResponse(response) : data;
          })
          .catch((error) => {
            if (transformError) {
              return Promise.reject(transformError(error));
            }
            return Promise.reject(error?.response?.data || error);
          });
      };
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const uploadConfig: AxiosRequestConfig = {
      ...requestConfig,
      data: formData
    };

    return axios(uploadConfig)
      .then((response) => {
        const { data } = response;
        return transformResponse ? transformResponse(response) : data;
      })
      .catch((error) => {
        if (transformError) {
          return Promise.reject(transformError(error));
        }
        return Promise.reject(error?.response?.data || error);
      });
  }
};
