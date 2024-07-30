"use client";
// pages/signup/page.tsx

import Header from "./header";

const SignupPage = () => {
  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen h-screen bg-white flex flex-col items-center justify-center overflow-y-auto">
        <p className="w-96 mb-6 text-black text-2xl font-bold">회원가입</p>
        <form className="flex flex-col space-y-6">
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">아이디(이메일)</p>
            <div className="flex w-full">
              <input
                type="email"
                name="email"
                placeholder="유효한 이메일 주소"
                className="flex-grow h-12 border border-black p-2 rounded-l-lg text-black"
                required
              />
              <button
                type="button"
                className="w-1/3 h-12 bg-custom text-white rounded-r-lg hover:bg-custom"
              >
                전송
              </button>
            </div>
          </div>
          <div className="flex flex-col w-96 space-y-2 relative">
            <p className="text-black text-md font-semibold">비밀번호</p>
            <input
              type="password"
              name="password"
              placeholder="8~16자리 / 영문 대소문자, 숫자, 특수문자 조합"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col w-96 space-y-2 relative">
            <p className="text-black text-md font-semibold">비밀번호 확인</p>
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 재입력"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">전화번호</p>
            <input
              type="text"
              name="phoneNumber"
              placeholder="01012345678"
              maxLength={11}
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">닉네임</p>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">성별</p>
            <div className="flex justify-between">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-2"
                  required
                />
                남성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="mr-2"
                  required
                />
                여성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="mr-2"
                  required
                />
                기타
              </label>
            </div>
          </div>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">생일</p>
            <input
              type="text"
              name="birthdate"
              placeholder="YYYYMMDD"
              maxLength={8}
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-96 h-12 px-4 py-2 bg-custom text-white rounded-lg hover:bg-custom"
          >
            회원가입
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
