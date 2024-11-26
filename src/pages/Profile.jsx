import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";
import useTokenExpire from "../hooks/useTokenExpire";

const Profile = () => {
  const {
    user: { nickname: initialNickname },
    profileUpdate,
  } = useUserStore();
  const [nickname, setNickname] = useState(initialNickname || "");
  const navigate = useNavigate();

  const handleExpire = useTokenExpire();

  const onChange = (event) => {
    setNickname(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      const response = await profileUpdate(formData);
      console.log("form nickname: ", formData);

      if (response.success) {
        alert("닉네임이 변경되었습니다.");
      } else {
        alert("닉네임 변경에 실패했습니다.");
      }
    } catch (error) {
      console.log("프로필 업데이트 실패", error);

      // 토큰 만료시 로그아웃 처리
      if (error.message.includes("Token expired")) {
        handleExpire();
      }
    }
  };
  console.log("nickname: ", nickname);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6">
          프로필 수정
        </h1>
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
