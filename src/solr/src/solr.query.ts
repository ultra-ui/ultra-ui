import { API } from '@ultra-ui/api';
import { Toast } from '@ultra-ui/toast';
import { useQuery } from '@tanstack/react-query';

interface QueryDetailParams {
  queryKey: any[];
  url: string;
  id: string;
  errorMessage?: string;
  showErrorToast?: boolean;
  params?: Record<string, unknown>;
  enabled?: boolean;
}

/**
 * Custom hook to get data detail (use filter query fq) with react-query useQuery.
 */
export const useQueryDetail = (params: QueryDetailParams) => {
  const {
    queryKey,
    url,
    id,
    errorMessage = 'Lấy dữ liệu chi tiết thất bại',
    showErrorToast = true,
    enabled,
    params: queryParams = {}
  } = params;

  const { isInitialLoading, data, error } = useQuery(
    queryKey,
    () =>
      API.solr({
        url,
        params: { fq: `id:(${id})`, ...queryParams }
      }).then((response) => {
        if (!Array.isArray(response)) {
          throw new Error(errorMessage);
        }
        if (!response.length) {
          return null;
        }
        return response[0];
      }),
    {
      onError: (e) => {
        if (showErrorToast) {
          Toast.show({
            type: 'error',
            message: errorMessage
          });
        }
        return Promise.reject(e);
      },
      enabled: enabled || !!id
    }
  );

  return { isLoading: isInitialLoading, data, error };
};

interface QueryMediaParams {
  queryKey: any[];
  parentId: string;
  parentField?: string;
  errorMessage?: string;
  showErrorToast?: boolean;
  getAll?: boolean;
  url?: string;
  params?: Record<string, unknown>;
  enabled?: boolean;
}

/**
 * Custom hook to get media by parent id (use filter query fq) with react-query useQuery.
 */
export const useQueryMedia = (params: QueryMediaParams) => {
  const {
    queryKey,
    parentId,
    parentField = 'parent_id',
    showErrorToast = true,
    errorMessage = 'Lấy thông tin media thất bại',
    getAll = true,
    url = '/solr/media/select',
    params: queryParams = {},
    enabled
  } = params;

  const { isInitialLoading, data, error } = useQuery(
    queryKey,
    () => {
      return API.request({
        url,
        params: {
          fq: `${parentField}:(${parentId})`,
          start: 0,
          rows: getAll ? 1000 : 1,
          ...queryParams
        }
      }).then((response) => {
        if (!Array.isArray(response)) {
          throw new Error(errorMessage);
        }
        return response;
      });
    },
    {
      onError: (e) => {
        if (showErrorToast) {
          Toast.show({
            type: 'error',
            message: errorMessage
          });
        }
        return Promise.reject(e);
      },
      enabled: enabled || !!parentId
    }
  );

  return { isLoading: isInitialLoading, data, error };
};

interface QueryListParams {
  queryKey: any[];
  url: string;
  errorMessage?: string;
  showErrorToast?: boolean;
  params?: Record<string, unknown>;
  enabled?: boolean;
}
/**
 * Custom hook to get data list with react-query useQuery.
 */
export const useQueryList = (params: QueryListParams) => {
  const {
    queryKey,
    url,
    errorMessage = 'Lấy dữ liệu chi tiết thất bại',
    showErrorToast = true,
    params: queryParams = {},
    enabled
  } = params;

  const { isInitialLoading, data, error } = useQuery(
    queryKey,
    () =>
      API.solr({
        url,
        params: queryParams
      }).then((response) => {
        if (!Array.isArray(response)) {
          throw new Error(errorMessage);
        }
        return response;
      }),
    {
      onError: (e) => {
        if (showErrorToast) {
          Toast.show({
            type: 'error',
            message: errorMessage
          });
        }
        return Promise.reject(e);
      },
      enabled
    }
  );

  return { isLoading: isInitialLoading, data, error };
};
