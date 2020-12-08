import api from '../../utils/configServices';

export const getTransferHistory = async (body) => {
  try {
    return await api.postService(`users/view_wallet_history`, body, true);
  } catch (error) {
    throw error;
  }
};

export const getAvailableAmount = async (body) => {
  try {
    return await api.postService(`chua co`, body, true);
  } catch (error) {
    throw error;
  }
};

export const transferAmount = async (body) => {
  try {
    return await api.postService(`users/transfer_money`, body, true);
  } catch (error) {
    throw error;
  }
};
export const getAmountAvailable = async (body) => {
  try {
    return await api.postService(`users/get_available_money`, body, true);
  } catch (error) {
    throw error;
  }
};
