import api from '../axios';

export const getCustomers = async () => {
  const { data } = await api.get('/customers');
  return data;
};

export const getCustomerById = async id => {
  const { data } = await api.get(`/customers/${id}`);
  return data;
};

export const createCustomer = async payload => {
  const { data } = await api.post('/customers', payload);
  return data;
};

export const getCustomerPolicies = async customerId => {
  const { data } = await api.get(`/customers/${customerId}/policies`);
  return data;
};

export const getCustomerActivePolicies = async customerId => {
  const { data } = await api.get(`/customers/${customerId}/policies/active`);
  return data;
};

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  getCustomerPolicies,
  getCustomerActivePolicies,
};
