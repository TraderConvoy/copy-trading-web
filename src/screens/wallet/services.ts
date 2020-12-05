import api from '../../utils/configServices';

// FIXME:
export const getTransferHistory = async (body) => {
  try {
    return await api.postService(`chua co`, body, true);
  } catch (error) {
    throw error;
  }
};
