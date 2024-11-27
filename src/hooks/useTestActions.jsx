import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTestResult,
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import useTokenExpire from "../hooks/useTokenExpire";

export const useAddTestResult = () => {
  const queryClient = useQueryClient();
  const handleExpire = useTokenExpire();

  return useMutation({
    mutationFn: createTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
    onError: (error) => {
      if (error.message.includes("Token expired")) {
        handleExpire();
      }
    },
  });
};

export const useDeleteTestResult = () => {
  const queryClient = useQueryClient();
  const handleExpire = useTokenExpire();

  return useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
    onError: (error) => {
      if (error.message.includes("Token expired")) {
        handleExpire();
      }
    },
  });
};

export const useVisibilityTestResult = () => {
  const queryClient = useQueryClient();
  const handleExpire = useTokenExpire();

  return useMutation({
    mutationFn: updateTestResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
    onError: (error) => {
      if (error.message.includes("Token expired")) {
        handleExpire();
      }
    },
  });
};
