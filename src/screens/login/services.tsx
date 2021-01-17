import api from 'utils/configServices';

export const loginActionService = async (body: any) => {
  try {
    return await api.postService(`oauth/token`, body);
  } catch (error) {
    throw error;
  }
};

export const getUserById = async () => {
  try {
    return await api.getService(`users/get_user_by_id`);
  } catch (error) {
    throw error;
  }
};
