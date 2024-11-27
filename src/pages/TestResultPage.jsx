import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import useTokenExpire from "../hooks/useTokenExpire";
import { useQuery } from "@tanstack/react-query";

const TestResultPage = () => {
  const handleExpire = useTokenExpire();

  const { data: results, isPending } = useQuery({
    queryKey: ["testResults"],
    queryFn: async () => {
      try {
        return await getTestResults();
      } catch (err) {
        console.log("erro message: ", err.message);
        if (err.message === "Token expired") {
          handleExpire();
        }
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return <div>Loading...</div>;

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
