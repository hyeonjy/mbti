import React, { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { getFormattedDate } from "../utils/dateUtils";
import { useAddTestResult } from "../hooks/useTestActions";

const TestPage = ({ user }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null); // 테스트 결과 상태 관리

  const {
    user: { userId, nickname },
  } = useUserStore();

  const { mutate: addMutation } = useAddTestResult();

  // 테스트 제출 핸들러
  const handleTestSubmit = async (answers) => {
    // 테스트 결과 계산
    const mbtiResult = calculateMBTI(answers);

    // 현재 날짜 가져오기
    const date = getFormattedDate();

    addMutation({
      userId,
      nickname,
      mbti: mbtiResult,
      date,
      visibility: true,
    });

    // 상태에 MBTI 결과 저장
    setResult(mbtiResult);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {/* 결과가 없는 경우 (테스트 시작 전) */}
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          // 결과가 있는 경우 (테스트 완료 후)
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>

            {/* 결과 페이지로 이동 버튼 */}
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
