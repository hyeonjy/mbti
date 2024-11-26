import axios from "axios";

const API_URL = "http://localhost:4000/testResults";

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTestResult = async (resultData) => {
  const { data } = await axios.post(`${API_URL}`, resultData);
  console.log("create data: ", data);
  return data;
};

export const deleteTestResult = async (id) => {};

export const updateTestResultVisibility = async (id, visibility) => {};
