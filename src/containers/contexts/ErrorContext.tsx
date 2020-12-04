import system from 'constant/localstore';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

type IContextProps = {
  addError: (err: Response, message: null) => void;
};

export const ErrorContext = React.createContext<IContextProps>({
  addError: (err: Response, message: null) => ({ err, message }),
});

export const ErrorContextProvider = ({ children }) => {
  const history = useHistory();
  const { i18n } = useTranslation();
  const [errMess, setErrMess] = useState('');

  useEffect(() => {
    if (!!errMess) {
      const timeout = setTimeout(() => setErrMess(''), [5000]);
      return () => clearTimeout(timeout);
    }
  }, [errMess]);

  const addError = async (err: Response, message: null) => {
    if (message) {
      setErrMess(message || '');
      return;
    }
    if (err.status === system.RESPONSE_STATUS.NOT_FOUND)
      setErrMess(
        i18n.language === 'vi'
          ? 'Máy chủ gặp sự cố, vui lòng liên hệ với quản trị viên'
          : 'There is a problem with the server, please contact the administrator',
      );

    if (err.status === system.RESPONSE_STATUS.FORBIDDEN) {
      localStorage.removeItem(system.TOKEN);
      history.push('/');
    }

    if (err.status === system.RESPONSE_STATUS.INTERVAL_SERVER) {
      const error = await err.json();
      setErrMess(error.error_description || message || '');
    }
  };

  const contextValue = {
    addError: useCallback((err, message) => addError(err, message), []),
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
      {errMess ? (
        <div className="toasts-wrapper">
          <div className="toast error">{errMess}</div>
        </div>
      ) : null}
      {/* <div className="toasts-wrapper">{errMess ? <div className="toast">{errMess}</div> : null}</div> */}
    </ErrorContext.Provider>
  );
};
