import axios from "axios";

const API_BASE_URL = "/api/consumption";

// Add a new engine
export const addConsumption = async (matricule, consumption, consumptionDate) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/newconsumption?matricule=${matricule}&consumption=${consumption}&consumptionDate=${consumptionDate}`, );
    return response.data;
  } catch (error) {
    console.error("Error adding consumption:", error);
    throw error;
  }
};

// Fetch all consumptions for a specific engine by matricule
export const getAllConsumptionsByEngine = async (matricule) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/consumptions?matricule=${matricule}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching consumptions by engine matricule:", error);
    throw error;
  }
};

// Calculate total consumption between two dates for a specific engine
export const calculateTotalConsumption = async (matricule, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/totalconsumptiondates?matricule=${matricule}&startDate=${startDate}&endDate=${endDate}`, );
    return response.data;
  } catch (error) {
    console.error("Error calculating total consumption:", error);
    throw error;
  }
};

// Get the list of consumptions of an engine between two dates
export const getGraphConsumptions = async (matricule, startDate='2024-10-01', endDate = new Date().toISOString().split('T')[0]) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/graphconsumptions?matricule=${matricule}&startDate=${startDate}&endDate=${endDate}`, {
      params: { matricule, startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching graph consumptions:", error);
    throw error;
  }
};

// Get the total consumption for the current month
export const getTotalConsumptionCurrentMonth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/totalconsumptionmonth`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total consumption for the current month:", error);
    throw error;
  }
};

// Get total consumption by month (e.g., January -> 1, February -> 2, etc.)
export const getTotalConsumptionByMonth = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/totalconsumptionbymonth?month=${month}`, );
    return response.data;
  } catch (error) {
    console.error("Error fetching total consumption by month:", error);
    throw error;
  }
};

// Get the engine with the maximum consumption for the current month
export const getMaxConsumptionOfMonth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/maxtotalconsumption`);
    return response.data;
  } catch (error) {
    console.error("Error fetching maximum consumption of the month:", error);
    throw error;
  }
};
