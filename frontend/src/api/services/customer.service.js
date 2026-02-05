import axios from 'axios';

const API_BASE_URL = 'https://api.example.com/customers'; // Replace with your actual API base URL

/**
 * Fetch all customers
 */
export const getCustomers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

/**
 * Fetch a single customer by ID
 * @param {string} id - Customer ID
 */
export const getCustomerById = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new customer
 * @param {object} customerData - Data for the new customer
 */
export const createCustomer = async customerData => {
  try {
    const response = await axios.post(API_BASE_URL, customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

/**
 * Update an existing customer
 * @param {string} id - Customer ID
 * @param {object} customerData - Updated customer data
 */
export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a customer
 * @param {string} id - Customer ID
 */
export const deleteCustomer = async id => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
