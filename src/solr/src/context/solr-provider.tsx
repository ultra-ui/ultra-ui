import React, { createContext } from 'react';
import { SolrContextType, SolrProviderProps } from '../solr.type';

let SolrContext: any = null;

const SolrProvider: React.FC<SolrProviderProps> = (props) => {
  const { children, config } = props;
  SolrContext = createContext<SolrContextType | undefined>(config);

  return <SolrContext.Provider value={config}>{children}</SolrContext.Provider>;
};

export default SolrProvider;

export { SolrContext };
