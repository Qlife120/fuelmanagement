import axios from "axios";

const API_BASE_URL = "/api/engine";


// Add a new engine
export const addEngine = async (matricule, engineName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/newengine?matricule=${matricule}&engineName=${engineName}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new engine:", error);
    throw error;
  }
};

// Get all engines
export const getAllEngines = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/engines`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all engines:", error);
    throw error;
  }
};

// Get engine by matricule
export const getEngineByMatricule = async (matricule) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/enginesearch?matricule=${matricule}`, );
    return response.data;
  } catch (error) {
    console.error("Error fetching engine by matricule:", error);
    throw error;
  }
};

// Get total number of engines
export const getTotalEngines = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/totalengines`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total engines:", error);
    throw error;
  }
};

// Get last 10 engines added
export const getLastTenEnginesAdded = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lastenginesadded`);
    return response.data;
  } catch (error) {
    console.error("Error fetching last 10 engines added:", error);
    throw error;
  }
};
