import system from 'constant/localstore';
export const getErrMessage = async (err: Response, message: null) => {
  if (err.status === system.RESPONSE_STATUS.NOT_FOUND)
    return 'There is a problem with the server, please contact the administrator';

  if (err.status === system.RESPONSE_STATUS.INTERVAL_SERVER) {
    const error = await err.json();
    return error.error_description || message || '';
  }
};

export const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
