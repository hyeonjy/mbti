import React, { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { getFormattedDate } from "../utils/dateUtils";
import { useAddTestResult } from "../hooks/useTestActions";

const TestPage = ({ user }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const {
    id,
    user: { userId, nickname },
  } = useUserStore();

  const { mutate: addMutation } = useAddTestResult();

  const handleTestSubmit = async (answers) => {
    /* Test 결과는 mbtiResult 라는 변수에 저장이 됩니다.*/
    const mbtiResult = calculateMBTI(answers);
    const date = getFormattedDate();

    addMutation({
      userId,
      nickname,
      mbti: mbtiResult,
      date,
      visibility: true,
    });

    setResult(mbtiResult);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={() => navigate("/results")}
              className="w-full bg-tomato text-white py-3 rounded-lg font-semibold hover:bg-white transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
