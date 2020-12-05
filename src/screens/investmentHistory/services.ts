import api from 'utils/configServices';

export const getListTradingCopies = async (body) => {
  try {
    return await api.postService(`trading_copy/get_list_trading_copies`, body, true);
  } catch (error) {
    throw error;
  }
};

export const resumeTradingCopy = async (body) => {
  try {
    return await api.postService(`trading_copy/resume_trading_copy`, body, true);
  } catch (error) {
    throw error;
  }
};

export const pauseTradingCopy = async (body) => {
  try {
    return await api.postService(`trading_copy/pause_trading_copy`, body, true);
  } catch (error) {
    throw error;
  }
};

export const stopTradingCopy = async (body) => {
  try {
    return await api.postService(`trading_copy/stop_trading_copy`, body, true);
  } catch (error) {
    throw error;
  }
};
