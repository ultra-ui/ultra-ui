import { useCreateWithMedia } from './solr-mutil/create-with-media';
import { useDeleteWithMedia } from './solr-mutil/delete-with-media';
import { deleteFilesCdn, uploadFilesCdn } from './solr-mutil/helper';
import { useUpdateWithMedia } from './solr-mutil/update-with-media';
import { useCreate, useDelete, useUpdate } from './solr.mutate';
import { useQueryDetail, useQueryList, useQueryMedia } from './solr.query';

export {
  deleteFilesCdn,
  uploadFilesCdn,
  useCreate,
  useCreateWithMedia,
  useDelete,
  useDeleteWithMedia,
  useQueryDetail,
  useQueryList,
  useQueryMedia,
  useUpdate,
  useUpdateWithMedia
};
