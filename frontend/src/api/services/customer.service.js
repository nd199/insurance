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
