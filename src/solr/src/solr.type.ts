export interface SolrContextType {
  prefixCdnURL?: string;
}

export interface SolrProviderProps {
  children: React.ReactNode;
  config?: {
    prefixCdnURL?: string;
  };
}
