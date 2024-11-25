import React, { useEffect, useState } from "react";
import { deleteTestResult, getTestResults } from "../api/testResults";
import useUserStore from "../store/useUserStore";
import TestResultList from "../components/TestResultList";
import useTokenExpire from "../hooks/useTokenExpire";

const TestResultPage = () => {
  const [results, setResults] = useState("");
  const {
    user: { userId },
  } = useUserStore();

  const handleExpire = useTokenExpire();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getTestResults();
        setResults(data);
      } catch (error) {
        console.log("테스트 제출 실패", error);

        // 토큰 만료시 로그아웃 처리
        if (error.message.includes("Token expired")) {
          handleExpire();
        }
      }
    };

    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
      setResults((prev) => prev.filter((result) => result.id !== id));
    } catch (error) {
      console.error("삭제 실패:", error);

      // 토큰 만료시 로그아웃 처리
      if (error.message.includes("Token expired")) {
        handleExpire();
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8">
      <div className="bg-white max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
          모든 테스트 결과
        </h1>
        {results && (
          <TestResultList
            results={results}
            userId={userId}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TestResultPage;
