import api from '../../utils/configServices';

export const getDataExperts = async (body) => {
  try {
    return await api.postService(`experts/get_list_experts_for_user`, body, true);
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

export const tranferAmountService = async (body) => {
  try {
    return await api.postService(`tranfer-amount/doi-api`, body, true);
  } catch (error) {
    throw error;
  }
};
