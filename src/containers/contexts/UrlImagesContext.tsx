import React, { useMemo } from 'react';

export const UrlImagesContext = React.createContext<string>('');

export const UrlImagesContextProvider = ({ children }) => {
  const urlImage = useMemo(() => `${process.env.PUBLIC_URL}/assets/images/`, []);
  return <UrlImagesContext.Provider value={urlImage}>{children}</UrlImagesContext.Provider>;
};
