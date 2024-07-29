"use client";
// pages/signup/page.tsx

import Header from "@/components/header";

const SignupPage = () => {
  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen bg-white h-90vh flex flex-col items-center justify-center">
        <p className="w-96 mb-6 text-black text-2xl font-bold">회원가입</p>
        <form className="flex flex-col space-y-6">
          <div className="flex flex-col w-96">
            <p className="text-black text-md font-semibold">아이디</p>
            <input
              type="text"
              placeholder="4~20자리 / 영문, 숫자, 특수문자 '_' 사용 가능"
              pattern="^[a-zA-Z0-9_]{4,20}$"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col w-96">
            <p className="text-black text-md font-semibold">이메일</p>
            <input
              type="email"
              placeholder="유효한 이메일 주소"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col w-96">
            <p className="text-black text-md font-semibold">비밀번호</p>
            <input
              type="password"
              placeholder="8~16자리 / 영문 대소문자, 숫자, 특수문자 조합"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col w-96">
            <p className="text-black text-md font-semibold">비밀번호 확인</p>
            <input
              type="password"
              placeholder="비밀번호 재입력"
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
