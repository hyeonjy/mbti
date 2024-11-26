import React from "react";
import TestResultItem from "./TestResultItem";
import useUserStore from "../store/useUserStore";

const TestResultList = ({ results, handleDelete }) => {
  const {
    user: { userId },
  } = useUserStore();

  return (
    <div className="space-y-4">
      {results.map((result) => {
        if (result.visibility || result.userId === userId) {
          return (
            <TestResultItem
              key={result.id}
              result={result}
              userId={userId}
              handleDelete={handleDelete}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default TestResultList;
