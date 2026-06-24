import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Fetches resources from the Spring Boot backend.
 * If type is provided ('LOCATION' or 'EQUIPMENT'), it's appended as a query param.
 * 
 * @param {string|null} type - Optional resource type filter
 * @returns {Promise<Array>} Promise resolving to the list of resources
 */
export const fetchResources = async (type = null) => {
  try {
    const params = {};
    if (type && type !== 'ALL') {
      params.type = type;
    }
    
    const response = await axios.get(`${API_BASE_URL}/resources`, { params });
    return response.data;
  } catch (error) {
    console.error('Error in fetchResources API helper:', error.message || error);
    throw error;
  }
};
