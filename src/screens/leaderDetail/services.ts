import api from 'utils/configServices';

export const getLeaderDetail = async (body) => {
  try {
    return await api.postService(`experts/get_expert_detail`, body, true);
  } catch (error) {
    throw error;
  }
};

export const getLeaderHistory = async (body) => {
  try {
    return await api.postService(`trading_history/get_list_trading_histories_by_expert`, body, true);
  } catch (error) {
    throw error;
  }
};
export const getProfitService = async (body) => {
  try {
    return await api.postService(`experts/get_profit_for_expert`, body, true);
  } catch (error) {
    throw error;
  }
};
