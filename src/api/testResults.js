import testAxiosInstance from "./testAxiosInstance";

export const getTestResults = async () => {
  const response = await testAxiosInstance.get("/");
  return response.data;
};

export const createTestResult = async (resultData) => {
  console.log("resultdata: ", resultData);
  const { data } = await testAxiosInstance.post("/", resultData);
  return data;
};

export const deleteTestResult = async (id) => {
  const { data } = await testAxiosInstance.delete(`/${id}`);
  return data;
};

export const updateTestResultVisibility = async ({ id, visibility }) => {
  const { data } = await testAxiosInstance.patch(`/${id}`, { visibility });
  return data;
};
