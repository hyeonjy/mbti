import axios from "axios";

const API_URL = "http://localhost:4000/testResults";

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTestResult = async (resultData) => {
  const { data } = await axios.post(`${API_URL}`, resultData);
  return data;
};

export const deleteTestResult = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

export const updateTestResultVisibility = async (id, visibility) => {
  const { data } = await axios.patch(`${API_URL}/${id}`, { visibility });
  return data;
};
