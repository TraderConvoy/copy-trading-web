import api from 'utils/configServices';

export const getLeaderDetail = async (id) => {
  try {
    return await api.getService(`experts/get_expert_by_id?_id=${id}`);
  } catch (error) {
    throw error;
  }
};
