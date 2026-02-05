import axios from 'axios';

const API_BASE_URL = 'https://api.example.com/policies'; // Replace with your actual API base URL

/**
 * Fetch all policies
 */
export const getPolicies = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching policies:', error);
    throw error;
  }
};

/**
 * Fetch a single policy by ID
 * @param {string} id - Policy ID
 */
export const getPolicyById = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching policy with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new policy
 * @param {object} policyData - Data for the new policy
 */
export const createPolicy = async policyData => {
  try {
    const response = await axios.post(API_BASE_URL, policyData);
    return response.data;
  } catch (error) {
    console.error('Error creating policy:', error);
    throw error;
  }
};

/**
 * Update an existing policy
 * @param {string} id - Policy ID
 * @param {object} policyData - Updated policy data
 */
export const updatePolicy = async (id, policyData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, policyData);
    return response.data;
  } catch (error) {
    console.error(`Error updating policy with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a policy
 * @param {string} id - Policy ID
 */
export const deletePolicy = async id => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting policy with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
};
