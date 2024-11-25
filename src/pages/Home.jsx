import React from "react";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-primary-color mb-6">
        무료 성격 테스트
      </h1>
      <p className="mb-8 text-lg text-secondary-color">
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary-color mb-4">
            성격 유형 이해
          </h2>
          <p className="text-gray-600">
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary-color mb-4">
            성격 유형 이해
          </h2>
          <p className="text-gray-600">
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary-color mb-4">
            성격 유형 이해
          </h2>
          <p className="text-gray-600">
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </p>
        </div>
      </div>
      <button className="inline-block bg-tomato text-white py-2 px-6 rounded-full hover:bg-secondary-color transition mb-4 hover:text-[#FF5A5F]">
        내 성격 알아보러 가기
      </button>
    </div>
  );
};

export default Home;
