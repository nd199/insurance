import api from '../axios';

const login = async ({ username, password }) => {
  const { data } = await api.post('/auth/login', { username, password });
  return data;
};

const logout = async () => {
  await api.post('/auth/logout');
};

export default { login, logout };
