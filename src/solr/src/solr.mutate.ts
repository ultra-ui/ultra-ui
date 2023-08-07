import { API } from '@ultra-ui/api';
import { Toast } from '@ultra-ui/toast';
import { useMutation } from '@tanstack/react-query';

interface CreateVariables {
  url: string;
  params: Record<string, unknown>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  method?: 'POST' | 'POST_MULTI';
}

interface UpdateVariables {
  url: string;
  params: Record<string, unknown>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  method?: 'PUT' | 'PUT_MULTI';
}

interface DeleteVariables {
  url: string;
  id: string | string[];
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Custom hook to create data with react-query useMutation.
 */
export const useCreate = () => {
  const { mutate, isLoading, error, mutateAsync } = useMutation(
    (variables: CreateVariables) => {
      const { url, params, method = 'POST' } = variables;
      return API.solr({
        method,
        url,
        params
      });
    },
    {
      onSuccess: (_, variables) => {
        const { onSuccess, showToast = true, successMessage = 'Xoá dữ liệu thành công!' } = variables;
        if (showToast) {
          Toast.show({
            message: successMessage,
            type: 'success'
          });
        }
        onSuccess && onSuccess();
      },
      onError: (e, variables) => {
        const { onError, showToast = true, errorMessage = 'Xoá dữ liệu thất bại' } = variables;
        if (showToast) {
          Toast.show({ message: errorMessage, type: 'error' });
        }
        onError && onError(e);
      }
    }
  );
  return { mutate, isLoading, error, mutateAsync };
};

/**
 * Custom hook to update data with react-query useMutation.
 */
export const useUpdate = () => {
  const { mutate, isLoading, error, mutateAsync } = useMutation(
    (variables: UpdateVariables) => {
      const { url, params } = variables;
      return API.solr({
        method: 'PUT',
        url,
        params
      });
    },
    {
      onSuccess: (_, variables) => {
        const { onSuccess, showToast = true, successMessage = 'Xoá dữ liệu thành công!' } = variables;
        if (showToast) {
          Toast.show({
            message: successMessage,
            type: 'success'
          });
        }
        onSuccess && onSuccess();
      },
      onError: (e, variables) => {
        const { onError, showToast = true, errorMessage = 'Xoá dữ liệu thất bại' } = variables;
        if (showToast) {
          Toast.show({ message: errorMessage, type: 'error' });
        }
        onError && onError(e);
      }
    }
  );
  return { mutate, isLoading, error, mutateAsync };
};

/**
 * Custom hook to delete data with react-query useMutation.
 */
export const useDelete = () => {
  const { mutate, isLoading, error, mutateAsync } = useMutation(
    (variables: DeleteVariables) => {
      const { url, id } = variables;
      return API.solr({
        method: 'DELETE',
        url,
        params: { id }
      });
    },
    {
      onSuccess: (_, variables) => {
        const { onSuccess, showToast = true, successMessage = 'Xoá dữ liệu thành công!' } = variables;
        if (showToast) {
          Toast.show({
            message: successMessage,
            type: 'success'
          });
        }
        onSuccess && onSuccess();
      },
      onError: (e, variables) => {
        const { onError, showToast = true, errorMessage = 'Xoá dữ liệu thất bại' } = variables;
        if (showToast) {
          Toast.show({ message: errorMessage, type: 'error' });
        }
        onError && onError(e);
      }
    }
  );
  return { mutate, isLoading, error, mutateAsync };
};
