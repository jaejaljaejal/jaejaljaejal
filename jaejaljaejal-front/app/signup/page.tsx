"use client";
// pages/signup/page.tsx

import Header from "@/components/header";
import { useState, useEffect } from "react";

const SignupPage = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [feedback, setFeedback] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    validateInput("username");
  }, [formValues.username]);

  useEffect(() => {
    validateInput("password");
    validateInput("confirmPassword");
  }, [formValues.password, formValues.confirmPassword]);

  const validateInput = (field: string) => {
    let valid = true;
    let errorsCopy = { ...errors };
    let feedbackCopy = { ...feedback };

    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/;

    if (field === "username") {
      if (!usernameRegex.test(formValues.username)) {
        errorsCopy.username =
          "4~20자리의 영문, 숫자와 특수문자 '_'만 사용해주세요.";
        feedbackCopy.username = "";
        valid = false;
      } else {
        errorsCopy.username = "";
        feedbackCopy.username = "사용 가능한 ID입니다.";
      }
    }

    if (field === "password") {
      if (!passwordRegex.test(formValues.password)) {
        errorsCopy.password =
          "8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.";
        feedbackCopy.password = "";
        valid = false;
      } else {
        errorsCopy.password = "";
        feedbackCopy.password = "사용 가능한 비밀번호입니다.";
      }
    }

    if (field === "confirmPassword") {
      if (formValues.password !== formValues.confirmPassword) {
        errorsCopy.confirmPassword = "비밀번호가 일치하지 않습니다.";
        feedbackCopy.confirmPassword = "";
        valid = false;
      } else {
        errorsCopy.confirmPassword = "";
        feedbackCopy.confirmPassword = "비밀번호가 일치합니다.";
      }
    }

    setErrors(errorsCopy);
    setFeedback(feedbackCopy);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validateInput("username") &&
      validateInput("password") &&
      validateInput("confirmPassword")
    ) {
      // 서버에 유효성 검사된 데이터 전송
      // 추가적인 서버 측 보안 검사를 적용하여 SQL 인젝션 및 XSS를 방지
      console.log("Form submitted");
    }
  };

  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen bg-white h-90vh flex flex-col items-center justify-center">
        <p className="w-96 mb-6 text-black text-2xl font-bold">회원가입</p>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col w-96">
            <p className="text-black text-md font-semibold">아이디</p>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              placeholder="4~20자리 / 영문, 숫자, 특수문자 '_' 사용 가능"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username}</span>
            )}
            {feedback.username && (
              <span className="text-green-500">{feedback.username}</span>
            )}
          </div>
          <div className="flex flex-col w-96">
            <p className="text-black text-md font-semibold">이메일</p>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="유효한 이메일 주소"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col w-96">
            <p className="text-black text-md font-semibold">비밀번호</p>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              placeholder="8~16자리 / 영문 대소문자, 숫자, 특수문자 조합"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
            {feedback.password && (
              <span className="text-green-500">{feedback.password}</span>
            )}
          </div>
          <div className="flex flex-col w-96">
            <p className="text-black text-md font-semibold">비밀번호 확인</p>
            <input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              placeholder="비밀번호 재입력"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword}</span>
            )}
            {feedback.confirmPassword && (
              <span className="text-green-500">{feedback.confirmPassword}</span>
            )}
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
