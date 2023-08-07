import React, { createContext } from 'react';
import { ApiContextType, ApiProviderProps } from '../api.type';

let ApiContext: any = null;

const ApiProvider: React.FC<ApiProviderProps> = (props) => {
  const { children, config } = props;
  ApiContext = createContext<ApiContextType>(config);

  return <ApiContext.Provider value={config}>{children}</ApiContext.Provider>;
};

export default ApiProvider;

export { ApiContext };
