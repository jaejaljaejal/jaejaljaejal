"use client";
import React, { useState } from "react";
import Header from "@/components/header";
import { validateEmail } from "../login/utils/validation";
import { useLogin } from "../login/hooks/useLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(""); // feedback 상태를 LoginPage에서 관리
  const { handleLogin } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setFeedback("올바른 이메일 주소를 입력해주세요.");
      return;
    }
    handleLogin(e, email, password, setFeedback); // setFeedback 함수를 인자로 전달
  };

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:18080/oauth2/authorization/kakao";
  };

  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen bg-white h-90vh flex flex-col items-center justify-center">
        <p className="w-80 mb-6 text-black text-2xl font-bold">로그인</p>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디"
            className="w-80 h-12 border border-black border-1 p-2 rounded-lg text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-80 h-12 border border-black border-1 p-2 rounded-lg text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {feedback && <p className="text-red-500 text-sm mt-2">{feedback}</p>}
          <button
            type="submit"
            className="w-80 h-12 px-4 py-2 bg-custom text-white rounded-lg hover:bg-custom"
          >
            로그인
          </button>
        </form>
        <div className="flex w-80 mt-4">
          <a
            href="/signup"
            className="text-xs text-gray-500 hover:text-blue-700 mr-4"
          >
            회원가입
          </a>
          <a
            href="/recover"
            className="text-xs text-gray-500 hover:text-blue-700"
          >
            아이디 / 비밀번호 찾기
          </a>
        </div>
        <p className="text-sm text-gray-500 my-4">소셜 계정으로 간편 로그인</p>
        <div className="flex flex-col space-y-2 w-80">
          <button
            type="button"
            className="h-12 px-4 py-2 bg-white border border-gray-400 text-black rounded-lg  flex items-center justify-center"
          >
            구글 계정으로 로그인
          </button>
          <button
            onClick={handleKakaoLogin}
            className="h-12 px-4 py-2 bg-kakao text-kakao-label rounded-lg flex items-center justify-center"
          >
            카카오톡 계정으로 로그인
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
