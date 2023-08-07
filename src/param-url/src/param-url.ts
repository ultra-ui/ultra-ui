import queryString from 'query-string';
import { useLocation, useSearchParams } from 'react-router-dom';

const paramsToObject = (entries: any): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
};

export const useSetParamsURL = () => {
  const setSearchParams = useSearchParams()[1];

  return (params: Record<string, string | number>) =>
    setSearchParams((curr) => {
      const newParams = paramsToObject(curr.entries());
      Object.entries(params).forEach((item) => {
        const [key, value] = item;
        newParams[key] = `${value}`;
      });
      return new URLSearchParams(newParams);
    });
};

export const useRemoveParamURL = () => {
  const setSearchParams = useSearchParams()[1];

  return (key: string) =>
    setSearchParams((curr) => {
      const newParams = paramsToObject(curr.entries());
      delete newParams[key];
      return new URLSearchParams(newParams);
    });
};

export const useGetParamsURL = () => {
  const location = useLocation();
  return queryString.parse(location.search);
};

export const useParamsURL = () => {
  const params = useGetParamsURL();
  const setParams = useSetParamsURL();
  return [params, setParams];
};
