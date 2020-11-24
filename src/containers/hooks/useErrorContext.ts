import { useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';

const useError = () => {
  const { addError } = useContext(ErrorContext);
  return { addError };
};

export default useError;
