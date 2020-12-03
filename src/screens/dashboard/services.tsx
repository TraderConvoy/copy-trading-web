import api from '../../utils/configServices';

export const getDataExperts = async () => {
  try {
    return await api.getService(`experts/get_list_experts`);
  } catch (error) {
    throw error;
  }
};

export const getListTradingCopies = async (body) => {
  try {
    return await api.postService(`trading_copy/get_list_trading_copies`, body, true);
  } catch (error) {
    throw error;
  }
};

export const createTradingCopy = async (body) => {
  try {
    return await api.postService(`trading_copy/create_trading_copy`, body, true);
  } catch (error) {
    throw error;
  }
};

export const createExpertService = async (expert) => {
  try {
    return await api.postService(`experts/add_expert`, expert, true);
  } catch (error) {
    throw error;
  }
};
