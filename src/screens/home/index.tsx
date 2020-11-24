import useError from 'containers/hooks/useErrorContext';
import React, { useEffect } from 'react';

const Home = () => {
  const { addError } = useError();

  useEffect(() => {
    try {
    } catch (error) {
      addError(error, null);
    }
  }, []);

  return (
    <>
      <div>asdasd</div>
    </>
  );
};

export default React.memo(Home);
