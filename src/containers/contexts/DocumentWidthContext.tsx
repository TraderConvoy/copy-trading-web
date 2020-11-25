import React, { useEffect, useState } from 'react';

type documentWidth = number;

export const DocumentWidthContext = React.createContext<documentWidth>(0);

export const DocumentWidthContextProvider = ({ children }) => {
  const [documentWidth, setDocumentWitdh] = useState(window.innerWidth);
  const resizeWidthHandle = () => setDocumentWitdh(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', resizeWidthHandle);
    return () => {
      window.removeEventListener('resize', resizeWidthHandle);
    };
  }, []);

  return <DocumentWidthContext.Provider value={documentWidth}>{children}</DocumentWidthContext.Provider>;
};
