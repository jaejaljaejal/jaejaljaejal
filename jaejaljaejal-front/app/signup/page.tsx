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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateInput(name, value);
  };

  const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/;

  const validateInput = (field: string, value: string) => {
    let errorsCopy = { ...errors };

    if (field === "username") {
      if (!usernameRegex.test(value)) {
        errorsCopy.username =
          "4~20자리의 영문, 숫자와 특수문자 '_'만 사용해주세요.";
      } else {
        errorsCopy.username = "";
      }
    }

    if (field === "password") {
      if (!passwordRegex.test(value)) {
        errorsCopy.password =
          "8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.";
      } else {
        errorsCopy.password = "";
      }
    }

    setErrors(errorsCopy);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid =
      !errors.username &&
      !errors.password &&
      formValues.username &&
      formValues.password &&
      formValues.email &&
      formValues.password === formValues.confirmPassword;

    if (isFormValid) {
      // 서버에 유효성 검사된 데이터 전송
      console.log("Form submitted");
    } else {
      console.log("Form has errors");
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
              required
            />
            {errors.username && (
              <span className="text-red-500 text-xs">{errors.username}</span>
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
              required
            />
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
              required
            />
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
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
              required
            />
            {formValues.password !== formValues.confirmPassword && (
              <span className="text-red-500 text-xs">
                비밀번호가 일치하지 않습니다.
              </span>
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
