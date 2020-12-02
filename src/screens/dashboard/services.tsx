import api from '../../utils/configServices';
export const getDataExperts = async () => {
  try {
    return await api.getService(`experts/get_list_experts`);
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
