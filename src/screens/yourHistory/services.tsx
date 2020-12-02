import api from '../../utils/configServices';
export const getUserHistoryService = async (body) => {
  try {
    return await api.postService(`trading_history/get_list_trading_histories_by_user`, body, true);
  } catch (error) {
    throw error;
  }
};
