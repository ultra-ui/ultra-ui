import { API } from '@ultra-ui/api';
import { Toast } from '@ultra-ui/toast';
import { SolrContext } from '../context/solr-provider';

export const isEmpty = (n: any) => {
  return !(n ? (typeof n === 'object' ? (Array.isArray(n) ? !!n.length : !!Object.keys(n).length) : true) : false);
};

export const getFileNameUpload = (file: File, index?: number) => {
  const indexFile = index || 0;
  return `${new Date().getTime() + indexFile * 100}_${file.name}`;
};

export const getUrlCdn = (fileName: string) => `${process.env.REACT_APP_CDN}/imgview/${fileName}`;

export const getParentId = (url: string, timestamp: number) =>
  API.request({
    url,
    params: {
      fq: `created_date:${timestamp}`
    }
  })
    .then((response) => response?.[0]?.id)
    .catch((e) =>
      Toast.show({
        type: 'error',
        message: `Lỗi: ${e.message || 'Không thể lấy thông tin dữ liệu vừa tạo'}`
      })
    );

export const uploadFilesCdn = (files: File[]) => {
  if (!Array.isArray(files) || !files.length) {
    return Promise.resolve(null);
  }

  const defaultConfig = SolrContext?._currentValue || {};
  const { prefixCdnURL } = defaultConfig;

  return Promise.all(
    files.map((item, index) => {
      const fileName = getFileNameUpload(item, index);
      const isImage = item?.type?.startsWith('image/');
      API.upload({
        file: item,
        url: `${prefixCdnURL || '/upload'}/${fileName}`,
        uploadFileType: isImage ? 'binary' : 'form-data',
        method: 'PUT'
      });
      return fileName;
    })
  ).catch((e) => {
    Toast.show({
      type: 'error',
      message: `Lỗi: ${e.message || 'Không thể tải file lên'}`
    });
  });
};

export const deleteFilesCdn = (imageUrls: string | string[]) => {
  const urls = typeof imageUrls === 'string' ? [imageUrls] : imageUrls;

  return Promise.all(
    urls.map((item) => {
      return API.request({
        method: 'DELETE',
        url: item
      });
    })
  ).catch((e) => {
    Toast.show({
      type: 'error',
      message: `Lỗi: ${e.message || 'Xoá file trên CDN thất bại'}`
    });
  });
};
