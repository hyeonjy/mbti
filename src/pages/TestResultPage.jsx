import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import useTokenExpire from "../hooks/useTokenExpire";
import { useQuery } from "@tanstack/react-query";

const TestResultPage = () => {
  const handleExpire = useTokenExpire(); // 토큰 만료 처리 함수 가져오기

  // tanstack Query를 사용하여 테스트 결과 데이터 가져오기
  const { data: results, isPending } = useQuery({
    queryKey: ["testResults"],
    queryFn: async () => {
      try {
        return await getTestResults();
      } catch (err) {
        console.log("erro message: ", err.message);

        // 토큰이 만료된 경우 토큰 만료 처리 함수 호출
        if (err.message === "Token expired") {
          handleExpire();
        }
        throw err;
      }
    },
  });

  // 로딩 중일 경우 로딩 메시지 출력
  if (isPending) return <div>Loading...</div>;

  // 테스트 결과 페이지 렌더링
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8">
      <div className="bg-white max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
          모든 테스트 결과
        </h1>
        <TestResultList results={results} />
      </div>
    </div>
  );
};

export default TestResultPage;
