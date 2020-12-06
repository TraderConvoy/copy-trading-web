import api from 'utils/configServices';

export const getLeaderDetail = async (body) => {
  try {
    return await api.postService(`experts/get_expert_detail`, body, true);
  } catch (error) {
    throw error;
  }
};
