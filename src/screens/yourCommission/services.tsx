import api from '../../utils/configServices';
export const getUserCommissionService = async (body) => {
  try {
    return await api.postService(`commission_ref/get_commission_of_user`, body, true);
  } catch (error) {
    throw error;
  }
};
