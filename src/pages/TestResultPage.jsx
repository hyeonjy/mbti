import React, { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import useUserStore from "../store/useUserStore";

const TestResultPage = () => {
  const [results, setResults] = useState("");
  const { nickname } = useUserStore();

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
        {results && (
          <div className="space-y-4">
            {results.map((result) => {
              return (
                <div
                  key={result.id}
                  className="p-6 bg-gray-800 rounded-lg shadow-lg text-white"
                >
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-3">
                    <h4 className="text-xl font-semibold">{result.nickname}</h4>
                    <p className="text-sm text-gray-400">{result.date}</p>
                  </div>
                  <p className="text-2xl font-bold text-yellow-400 mb-4">
                    {result.mbti}
                  </p>
                  <p className="text-base text-gray-300 mb-4">
                    {" "}
                    {mbtiDescriptions[result.mbti] ||
                      "해당 성격 유형에 대한 설명이 없습니다."}
                  </p>
                  {result.nickname === nickname && (
                    <div className="flex justify-end space-x-4">
                      <button className="bg-blue-500 py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition">
                        비공개로 전환
                      </button>
                      <button className="bg-red-500 py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition">
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultPage;
