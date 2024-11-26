import React, { useEffect, useState } from "react";
import { getTestResults, updateTestResultVisibility } from "../api/testResults";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import useUserStore from "../store/useUserStore";
import TestResultList from "../components/TestResultList";

const TestResultPage = () => {
  const [results, setResults] = useState("");
  const {
    user: { userId },
  } = useUserStore();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await getTestResults();
      setResults(data);
    };

    fetchResults();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8">
      <div className="bg-white max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
          모든 테스트 결과
        </h1>
        {results && <TestResultList results={results} userId={userId} />}
      </div>
    </div>
  );
};

export default TestResultPage;
