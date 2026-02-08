import api from '../axios';

export const getPolicies = async () => {
  const { data } = await api.get('/policies');
  return data;
};

export const getPolicyById = async id => {
  const { data } = await api.get(`/policies/${id}`);
  return data;
};

export const createPolicy = async policyData => {
  const { data } = await api.post('/policies', policyData);
  return data;
};

export const expirePolicy = async id => {
  await api.put(`/policies/${id}/expire`);
};

export default {
  getPolicies,
  getPolicyById,
  createPolicy,
  expirePolicy,
};
