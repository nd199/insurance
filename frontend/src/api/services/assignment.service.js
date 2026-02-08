import api from '../axios';

export const assignPolicy = async payload => {
  const { data } = await api.post('/assignments', payload);
  return data;
};

export const getAssignments = async () => {
  const { data } = await api.get('/assignments');
  return data;
};

export const terminateAssignment = async (id, endDate) => {
  await api.put(`/assignments/${id}/terminate`, null, {
    params: { endDate },
  });
};

export default {
  assignPolicy,
  getAssignments,
  terminateAssignment,
};
