// hooks/useLogin.ts
import { useState } from "react";

export const useLogin = () => {
  const [feedback, setFeedback] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault();

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

  return {
    feedback,
    handleLogin,
  };
};
