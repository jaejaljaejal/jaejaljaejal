"use client";
import React, { useState } from "react";
import Header from "@/components/header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      setFeedback("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("https://your-backend-url/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // JWT 토큰을 받아서 로컬 스토리지에 저장
        localStorage.setItem("token", data.token);
        setFeedback(""); // 성공적으로 로그인 시 피드백 제거
        // 이후 페이지 리다이렉션 로직 추가
      } else {
        setFeedback("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setFeedback("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:18080/oauth2/authorization/kakao";
  };

  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen bg-white h-90vh flex flex-col items-center justify-center">
        <p className="w-80 mb-6 text-black text-2xl font-bold">로그인</p>
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
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
