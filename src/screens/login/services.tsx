import api from '../../utils/configServices';

export const loginActionService = async (body) => {
  try {
    return await api.postService(`oauth/token`, body, true);
  } catch (error) {
    throw error;
  }
};
