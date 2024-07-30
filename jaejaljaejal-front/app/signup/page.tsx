"use client";
// pages/signup/index.tsx

import Header from "@/components/header";
import { useState } from "react";
import axios from "axios";
import {
  evaluatePasswordStrength,
  getPasswordStrength,
  PasswordStrength,
  validatePasswordStrength,
} from "./passwordUtil";
import { validateUsername } from "./idUtil";

const SignupPage = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
    phoneNumber: "",
  });

  const [feedback, setFeedback] = useState({
    email: "",
  });

  const [passwordStrength, setPasswordStrength] = useState<
    PasswordStrength | ""
  >("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // Validation logic here if needed
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      try {
        const response = await axios.post("/api/check-email", {
          email: value,
        });
        if (response.data.exists) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "이미 사용 중인 이메일입니다.",
          }));
          setFeedback((prevFeedback) => ({ ...prevFeedback, email: "" }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
          setFeedback((prevFeedback) => ({
            ...prevFeedback,
            email: "사용 가능한 이메일입니다.",
          }));
        }
      } catch (error) {
        console.error("이메일 중복 확인 중 오류 발생:", error);
      }
    }
  };

  const handleSendVerificationCode = async () => {
    try {
      const response = await axios.post("/api/send-verification-code", {
        email: formValues.email,
      });
      if (response.data.success) {
        alert("인증번호가 전송되었습니다.");
      } else {
        alert("인증번호 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("인증번호 전송 중 오류 발생:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submission logic here
    console.log("Form submitted");
  };

  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div
        className="w-screen bg-white flex flex-col items-center justify-center overflow-y-auto"
        style={{
          paddingTop: "12vh",
          paddingBottom: "2vh",
          height: "calc(100vh - 12vh)",
        }}
      >
        <p className="w-96 mb-6 text-black text-2xl font-bold">회원가입</p>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">아이디(이메일)</p>
            <div className="flex w-full">
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="유효한 이메일 주소"
                className="flex-grow h-12 border border-black p-2 rounded-l-lg text-black"
                required
              />
              <button
                type="button"
                onClick={handleSendVerificationCode}
                className="w-1/3 h-12 bg-custom text-white rounded-r-lg hover:bg-custom"
              >
                전송
              </button>
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
            {feedback.email && (
              <span className="text-green-500 text-xs">{feedback.email}</span>
            )}
          </div>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">닉네임</p>
            <input
              type="text"
              name="nickname"
              value={formValues.nickname}
              onChange={handleInputChange}
              placeholder="닉네임"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
            {errors.nickname && (
              <span className="text-red-500 text-xs">{errors.nickname}</span>
            )}
          </div>
          <div className="flex flex-col w-96 space-y-2 relative">
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
            {passwordStrength && (
              <span
                className={`text-xs ${
                  passwordStrength === "강력"
                    ? "text-green-500"
                    : passwordStrength === "적정"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                비밀번호 강도: {passwordStrength}
              </span>
            )}
          </div>
          <div className="flex flex-col w-96 space-y-2 relative">
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
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">성별</p>
            <div className="flex justify-between">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                기타
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-500 text-xs">{errors.gender}</span>
            )}
          </div>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">생일</p>
            <input
              type="text"
              name="birthdate"
              value={formValues.birthdate}
              onChange={handleInputChange}
              placeholder="YYYYMMDD"
              maxLength={8}
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
            {errors.birthdate && (
              <span className="text-red-500 text-xs">{errors.birthdate}</span>
            )}
          </div>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">전화번호</p>
            <input
              type="text"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              placeholder="01012345678"
              maxLength={11}
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs">{errors.phoneNumber}</span>
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
