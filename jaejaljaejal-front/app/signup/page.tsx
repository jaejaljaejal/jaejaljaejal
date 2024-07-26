"use client";
// pages/signup/page.tsx

import Header from "@/components/header";

const SignupPage = () => {
  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen bg-white h-90vh flex flex-col items-center justify-center">
        <p className="w-80 mb-6 text-black text-2xl font-bold">회원가입</p>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-80 h-12 border border-black border-1 p-2 rounded-lg text-black"
          />
          <input
            type="email"
            placeholder="이메일"
            className="w-80 h-12 border border-black border-1 p-2 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-80 h-12 border border-black border-1 p-2 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-80 h-12 border border-black border-1 p-2 rounded-lg text-black"
          />
          <button
            type="submit"
            className="w-80 h-12 px-4 py-2 bg-custom text-white rounded-lg hover:bg-custom"
          >
            회원가입
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
