import { useEffect, useState } from 'react';
import { useCreate, useDelete, useUpdate } from '../solr.mutate';
import { deleteFilesCdn, getUrlCdn, isEmpty, uploadFilesCdn } from './helper';

interface UpdateParams {
  params: any;
  core: string;
  fileData: {
    add?: { file: File; description?: string }[];
    delete?: { file: { url: string; id: string }; description?: string }[];
  };
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  method?: 'PUT' | 'PUT_MULTI';
  showToast?: boolean;
  isCamelCase?: boolean;
  mediaParentId?: string;
}

/**
 * Custom hook to update data including media with react-query useMutation.
 */
export const useUpdateWithMedia = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const { mutateAsync: updateMutate, isLoading: loadingUpdate, error: errorUpdate } = useUpdate();
  const { mutateAsync: deleteMediaMutate, isLoading: loadingDeleteMedia, error: errorDeleteMedia } = useDelete();
  const { mutateAsync: createMediaMutate, isLoading: loadingCreateMedia, error: errorCreateMedia } = useCreate();

  useEffect(
    () => setIsLoading(loadingUpdate || loadingCreateMedia || loadingDeleteMedia),
    [loadingCreateMedia, loadingDeleteMedia, loadingUpdate]
  );

  useEffect(
    () => setError(errorUpdate || errorCreateMedia || errorDeleteMedia),
    [errorCreateMedia, errorDeleteMedia, errorUpdate]
  );

  return {
    error,
    isLoading,
    mutate: (values: UpdateParams) => {
      const { core, params, fileData, onSuccess, onError, method, showToast, mediaParentId, isCamelCase } =
        values || {};
      const { add: filesAdd = [], delete: filesDelete = [] } = fileData;
      const allFileAdd = filesAdd.map((item) => item.file);
      const allFileDelete = filesDelete.map((item) => item.file);
      const noFileAdd = !Array.isArray(allFileAdd) || !allFileAdd.length || allFileAdd.every((i) => !i);

      new Promise((resolve) => {
        if (!Array.isArray(allFileDelete) || !allFileDelete.length || allFileDelete.every((i) => !i)) {
          resolve(null);
          return;
        } else {
          const urlDelete = allFileDelete.map((item) => item?.url?.replace('/upload/', '/imgview'));
          const idDelete = allFileDelete.map((item) => item.id);
          if (!isEmpty(urlDelete) && urlDelete[0]) {
            deleteFilesCdn(urlDelete).then(() =>
              deleteMediaMutate({ id: idDelete, url: '/solr/media/update', onSuccess: () => resolve(null), onError })
            );
          } else {
            resolve(null);
          }
        }
      })
        .then(async () => {
          if (noFileAdd) {
            return;
          }
          await uploadFilesCdn(allFileAdd).then(async (filesName) => {
            if (Array.isArray(filesName)) {
              await Promise.all(
                filesAdd.map(async (item, index) => {
                  const { file, description } = item;
                  const fileName = filesName[index];

                  const paramsRequest = isCamelCase
                    ? {
                        url: getUrlCdn(fileName),
                        parentId: mediaParentId || params.id,
                        title: file.name,
                        description,
                        createdDate: new Date().getTime()
                      }
                    : {
                        url: getUrlCdn(fileName),
                        parent_id: mediaParentId || params.id,
                        title: file.name,
                        description,
                        created_date: new Date().getTime()
                      };

                  await createMediaMutate({
                    url: '/solr/media/update',
                    params: paramsRequest,
                    onError
                  });
                })
              ).catch((error) => {
                setError(error);
                onError && onError(error);
              });
            }
          });
        })
        .then(() => {
          const data = {
            url: `/solr/${core}/update`,
            params,
            onSuccess,
            onError,
            method,
            showToast
          };

          updateMutate(data);
        })
        .catch((error) => {
          setError(error);
          onError && onError(error);
        });
    }
  };
};
