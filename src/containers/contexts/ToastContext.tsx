import React, { createContext, useCallback, useEffect, useState } from 'react';

type IContextProps = {
  addToast: (toast: string) => void;
};

export const ToastContext = createContext<IContextProps>({
  addToast: (toast: string) => toast,
});

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState(new Array<string>());

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => setToasts((toasts) => toasts.slice(1)), 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    (toast: string) => {
      setToasts((value) => [...value, toast]);
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toasts-wrapper">
        {toasts.map((toast) => (
          <div className="toast" key={toast}>
            {toast}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
