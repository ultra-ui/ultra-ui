import { API } from '@ultra-ui/api';
import { useCallback, useEffect, useState } from 'react';
import { useDelete } from '../solr.mutate';
import { deleteFilesCdn, isEmpty } from './helper';

const getMediaWithParent = (parentId: string) =>
  API.request({
    url: '/solr/media/select',
    params: {
      q: `parent_id:(${parentId})`
    }
  });

interface DeleteSuccessVariables {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<unknown>;
}

const useDeleteSuccess = (variables: DeleteSuccessVariables) => {
  const { setIsLoading, setError } = variables;
  const { mutateAsync: deleteMediaMutate, isLoading: loadingDeleteMedia, error: errorDeleteMedia } = useDelete();

  useEffect(() => setIsLoading(loadingDeleteMedia), [loadingDeleteMedia, setIsLoading]);
  useEffect(() => setError(errorDeleteMedia), [errorDeleteMedia, setError]);

  return useCallback(
    async (parentIds?: string | string[], onSuccess?: () => void, onError?: (error: unknown) => void) => {
      let listParentId = '';
      if (Array.isArray(parentIds)) {
        listParentId = parentIds.join(' ');
      }
      if (typeof parentIds === 'string') {
        listParentId = parentIds;
      }
      if (isEmpty(listParentId)) {
        onSuccess && onSuccess();
        return;
      }
      const mediaWithParent = await getMediaWithParent(listParentId);
      if (Array.isArray(mediaWithParent) && !!mediaWithParent.length) {
        const cdnUrls = mediaWithParent.map((item) => item.url);
        deleteMediaMutate({
          url: '/solr/media/update',
          id: mediaWithParent.map((item) => item.id),
          onSuccess: () => {
            deleteFilesCdn(cdnUrls)
              .then(() => {
                onSuccess && onSuccess();
              })
              .catch((error) => {
                setError(error);
                onError && onError(error);
              });
          },
          onError
        });
      } else {
        onSuccess && onSuccess();
      }
    },
    [deleteMediaMutate, setError]
  );
};

interface DeleteParams {
  id: string;
  core: string;
  onSuccess?: (data?: { urlFileAdds?: string[] }) => void;
  onError?: (error: unknown) => void;
  showToast?: boolean;
}

/**
 * Custom hook to delete data including media with react-query useMutation.
 */
export const useDeleteWithMedia = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const { mutateAsync: deleteMutate, isLoading: loadingDelete, error: errorDelete } = useDelete();
  const onDeleteSuccess = useDeleteSuccess({ setIsLoading, setError });

  useEffect(() => setIsLoading(loadingDelete), [loadingDelete]);
  useEffect(() => setError(errorDelete), [errorDelete]);

  return {
    error,
    isLoading,
    mutate: (values: DeleteParams) => {
      const { id, core, showToast, onSuccess, onError } = values;
      return deleteMutate({
        url: `/solr/${core}/update`,
        id,
        onSuccess: () => onDeleteSuccess(id, onSuccess, onError),
        onError,
        showToast
      });
    }
  };
};
