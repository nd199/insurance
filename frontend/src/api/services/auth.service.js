import api from '../axios';

const login = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

const logout = async () => {
  await api.post('/auth/logout');
};

const authService = {
  login,
  logout,
};

export default authService;
