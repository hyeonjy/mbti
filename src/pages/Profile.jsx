import React, { useState } from "react";
import useUserStore from "../store/useUserStore";
import useTokenExpire from "../hooks/useTokenExpire";
import showAlert from "../utils/showAlert";

const Profile = () => {
  const {
    user: { nickname: initialNickname }, // 초기 닉네임 가져오기
    profileUpdate,
  } = useUserStore();

  const [nickname, setNickname] = useState(initialNickname || "");
  const handleExpire = useTokenExpire(); // 토큰 만료 처리 함수

  const onChange = (event) => {
    setNickname(event.target.value);
  };

  // 프로필 업데이트 제출 핸들러
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      const response = await profileUpdate(formData);

      if (response.success) {
        // 업데이트 성공 시 알림 표시
        showAlert({
          title: "닉네임이 변경되었습니다.",
        });
      } else {
        console.log("닉네임 변경에 실패했습니다.");
      }
    } catch (error) {
      console.log("프로필 업데이트 실패", error);

      // 토큰 만료시 로그아웃 처리
      if (error.message.includes("Token expired")) {
        handleExpire();
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        {/* 프로필 수정 제목 */}
        <h1 className="text-3xl font-bold text-primary-color mb-6">
          프로필 수정
        </h1>

        {/* 프로필 수정 폼 */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              닉네임
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              value={nickname}
              onChange={onChange}
            />
          </div>

          {/* 프로필 업데이트 버튼 */}
          <button
            type="submit"
            className="w-full bg-tomato text-white py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300 hover:text-[#FF5A5F]"
          >
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
