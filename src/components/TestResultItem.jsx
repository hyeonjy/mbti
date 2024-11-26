import React, { useState } from "react";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { updateTestResultVisibility } from "../api/testResults";

const TestResultItem = ({ result, userId, handleDelete }) => {
  const [visibility, setVisibility] = useState(result.visibility);

  const handleToggleVisibility = async () => {
    try {
      await updateTestResultVisibility(result.id, !result.visibility);
      setVisibility((prev) => !prev);
    } catch (error) {
      console.error("(비)공개 전환 실패:", error);
    }
  };

  console.log("rerendering");

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-3">
        <h4 className="text-xl font-semibold">{result.nickname}</h4>
        <p className="text-sm text-gray-400">{result.date}</p>
      </div>
      <p className="text-2xl font-bold text-yellow-400 mb-4">{result.mbti}</p>
      <p className="text-base text-gray-300 mb-4">
        {mbtiDescriptions[result.mbti] ||
          "해당 성격 유형에 대한 설명이 없습니다."}
      </p>
      {result.userId === userId && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleToggleVisibility}
            className="bg-blue-500 py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            {visibility ? "비공개로 전환" : "공개로 전환"}
          </button>
          <button
            onClick={() => handleDelete(result.id)}
            className="bg-red-500 py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default TestResultItem;
