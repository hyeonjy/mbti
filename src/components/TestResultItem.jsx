import { mbtiDescriptions } from "../utils/mbtiCalculator";
import useUserStore from "../store/useUserStore";
import {
  useDeleteTestResult,
  useVisibilityTestResult,
} from "../hooks/useTestActions";

const TestResultItem = ({ result }) => {
  // 현재 사용자 정보 가져오기
  const {
    user: { userId },
  } = useUserStore();

  const { mutate: deleteMutation } = useDeleteTestResult();
  const { mutate: updateMutation } = useVisibilityTestResult();

  const handleToggleVisibility = async () => {
    updateMutation({ id: result.id, visibility: !result.visibility });
  };

  // 현재 사용자가 작성자인지 확인
  const isOwner = result.userId === userId;

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      {/* 상단: 닉네임과 날짜 표시 */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-3">
        <h4 className="text-xl font-semibold">{result.nickname}</h4>
        <p className="text-sm text-gray-400">{result.date}</p>
      </div>

      {/* MBTI 결과와 설명 */}
      <p className="text-2xl font-bold text-yellow-400 mb-4">{result.mbti}</p>
      <p className="text-base text-gray-300 mb-4">
        {mbtiDescriptions[result.mbti] ||
          "해당 성격 유형에 대한 설명이 없습니다."}
      </p>

      {/* 현재 사용자가 소유자인 경우만 버튼 표시 */}
      {isOwner && (
        <div className="flex justify-end space-x-4">
          {/* (비)공개 여부 토글 버튼 */}
          <button
            onClick={handleToggleVisibility}
            className="bg-blue-500 py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            {result.visibility ? "비공개로 전환" : "공개로 전환"}
          </button>

          {/* 삭제 버튼 */}
          <button
            onClick={() => deleteMutation(result.id)}
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
