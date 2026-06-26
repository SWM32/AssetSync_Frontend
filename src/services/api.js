import axios from 'axios';

const API_BASE_URL = 'http://localhost:8085/api';

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

/**
 * Books equipment by sending a request to the backend.
 * Crucially returns the error response data if a 409 Conflict occurs.
 * 
 * @param {Object} payload - The booking request payload
 * @returns {Promise<Object|string>} The saved BookingRequest object or conflict error message
 */
export const bookEquipment = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/equipment/book`, payload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return error.response.data;
    }
    console.error('Error in bookEquipment API helper:', error.message || error);
    throw error;
  }
};

/**
 * Submits a location advance request to the backend.
 * 
 * @param {Object} payload - The location request payload
 * @returns {Promise<Object>} The saved LocationRequest object
 */
export const submitLocationRequest = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/locations/request`, payload);
    return response.data;
  } catch (error) {
    console.error('Error in submitLocationRequest API helper:', error.message || error);
    throw error;
  }
};

/**
 * Triggers the 24-hour batch scheduling allocation algorithm on the backend.
 * 
 * @returns {Promise<string>} Success message from the backend
 */
export const triggerBatchProcess = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/locations/process-batch`);
    return response.data;
  } catch (error) {
    console.error('Error in triggerBatchProcess API helper:', error.message || error);
    throw error;
  }
};


/**
 * Fetches unified calendar events from the backend.
 * 
 * @returns {Promise<Array>} Promise resolving to the list of calendar events
 */
export const fetchCalendarEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/calendar/events`);
    return response.data;
  } catch (error) {
    console.error('Error in fetchCalendarEvents API helper:', error.message || error);
    throw error;
  }
};
