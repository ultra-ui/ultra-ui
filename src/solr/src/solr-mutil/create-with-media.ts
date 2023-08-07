import { Toast } from '@ultra-ui/toast';
import { useEffect, useState } from 'react';
import { useCreate } from '../solr.mutate';
import { getParentId, getUrlCdn, isEmpty, uploadFilesCdn } from './helper';

interface CreateSuccessVariables {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<unknown>;
}

interface CreateSuccessParams {
  fileNames: string[];
  core: string;
  fileData: { file: File; description?: string }[];
  timestamp: number;
  onSuccess?: (data?: { urlFileAdds?: string[] }) => void;
  onError?: (error: unknown) => void;
  isCamelCase?: boolean;
}

const useCreateSuccess = (data: CreateSuccessVariables) => {
  const { setIsLoading, setError } = data;
  const { mutateAsync: createMediaMutate, isLoading: loadingCreateMedia, error: errorCreateMedia } = useCreate();

  useEffect(() => setIsLoading(loadingCreateMedia), [loadingCreateMedia, setIsLoading]);
  useEffect(() => setError(errorCreateMedia), [errorCreateMedia, setError]);

  return async (values: CreateSuccessParams) => {
    const { fileData, timestamp, fileNames, core, onSuccess, onError, isCamelCase } = values;
    const parentId = await getParentId(`/solr/${core}/select`, timestamp);

    await Promise.all(
      fileData.map((item, index) => {
        const { file, description } = item;
        const params = isCamelCase
          ? {
              url: getUrlCdn(fileNames[index]),
              parentId: parentId,
              title: file.name,
              description,
              createdDate: new Date().getTime()
            }
          : {
              url: getUrlCdn(fileNames[index]),
              parent_id: parentId,
              title: file.name,
              description,
              created_date: new Date().getTime()
            };
        return createMediaMutate({
          params,
          url: '/solr/media/update',
          onError
        });
      })
    )
      .then(() => {
        const urlFileAdds = fileData.map((_, index) => getUrlCdn(fileNames[index]));
        onSuccess && onSuccess({ urlFileAdds });
      })
      .catch((e) => {
        setError(e);
        onError && onError(e);
        Toast.show({
          type: 'error',
          message: 'Không thể thêm dữ liệu media'
        });
      });
  };
};

interface CreateParams {
  params: any;
  core: string;
  fileData: { file: File; description?: string }[];
  timestamp: number;
  onSuccess?: (data?: { urlFileAdds?: string[] }) => void;
  onError?: (error: unknown) => void;
  method?: 'POST' | 'POST_MULTI';
  showToast?: boolean;
  isCamelCase?: boolean;
}

/**
 * Custom hook to create data including media with react-query useMutation.
 */
export const useCreateWithMedia = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const onCreateSuccess = useCreateSuccess({ setIsLoading, setError });
  const { mutateAsync: createMutate, isLoading: loadingCreate, error: errorCreate } = useCreate();

  useEffect(() => setIsLoading(loadingCreate), [loadingCreate]);
  useEffect(() => setError(errorCreate), [errorCreate]);

  return {
    error,
    isLoading,
    mutate: (values: CreateParams) => {
      const { params, core, timestamp, fileData, onSuccess, onError, method, showToast, isCamelCase } = values;
      const files = fileData.map((item) => item.file);

      if (isEmpty(files)) {
        const data = {
          url: `/solr/${core}/update`,
          params,
          onSuccess,
          onError,
          method,
          showToast
        };
        createMutate(data);
        return;
      }

      uploadFilesCdn(files)
        .then((fileNames) => {
          if (Array.isArray(fileNames) && fileNames.length) {
            const data = {
              url: `/solr/${core}/update`,
              params,
              onSuccess: () =>
                onCreateSuccess({ fileData, timestamp, fileNames, core, onSuccess, onError, isCamelCase }),
              onError,
              method,
              showToast
            };
            createMutate(data);
          }
        })
        .catch((error) => {
          setError(error);
          onError && onError(error);
        });
    }
  };
};
