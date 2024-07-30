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
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [feedback, setFeedback] = useState({
    username: "",
  });

  const [passwordStrength, setPasswordStrength] = useState<
    PasswordStrength | ""
  >("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateInput(name, value);

    if (name === "password") {
      const score = evaluatePasswordStrength(value);
      const strength = getPasswordStrength(score);
      setPasswordStrength(strength);
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      try {
        const response = await axios.post("/api/check-username", {
          username: value,
        });
        if (response.data.exists) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "이미 사용 중인 아이디입니다.",
          }));
          setFeedback((prevFeedback) => ({ ...prevFeedback, username: "" }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
          setFeedback((prevFeedback) => ({
            ...prevFeedback,
            username: "사용 가능한 아이디입니다.",
          }));
        }
      } catch (error) {
        console.error("아이디 중복 확인 중 오류 발생:", error);
      }
    }
  };

  const phoneNumberRegex = /^010\d{8}$/;

  const validateInput = (field: string, value: string) => {
    let errorsCopy = { ...errors };

    if (field === "username") {
      if (!validateUsername(value)) {
        errorsCopy.username =
          "4~20자리의 영문, 숫자와 특수문자 '_'만 사용해주세요.";
      } else {
        errorsCopy.username = "";
      }
    }

    if (field === "phoneNumber") {
      if (!phoneNumberRegex.test(value)) {
        errorsCopy.phoneNumber =
          "유효한 전화번호를 입력해주세요. 예: 01012345678";
      } else {
        errorsCopy.phoneNumber = "";
      }
    }

    if (field === "password") {
      if (!validatePasswordStrength(value)) {
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
      !errors.phoneNumber &&
      formValues.username &&
      formValues.password &&
      formValues.phoneNumber &&
      formValues.password === formValues.confirmPassword;

    if (isFormValid) {
      // 서버에 유효성 검사된 데이터 전송
      console.log("Form submitted");
    } else {
      console.log("Form has errors");
    }
  };

  const handleSendVerificationCode = async () => {
    try {
      const response = await axios.post("/api/send-verification-code", {
        phoneNumber: formValues.phoneNumber,
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

  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen bg-white h-90vh flex flex-col items-center justify-center">
        <p className="w-96 mb-6 text-black text-2xl font-bold">회원가입</p>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col w-96 space-y-2">
            <p className="text-black text-md font-semibold">아이디</p>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="4~20자리 / 영문, 숫자, 특수문자 '_' 사용 가능"
              className="w-full h-12 border border-black p-2 rounded-lg text-black"
              required
            />
            {errors.username && (
              <span className="text-red-500 text-xs">{errors.username}</span>
            )}
            {feedback.username && (
              <span className="text-green-500 text-xs">
                {feedback.username}
              </span>
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
          <div className="flex flex-col w-96 space-y-2 relative">
            <p className="text-black text-md font-semibold">전화번호</p>
            <div className="flex w-full">
              <input
                type="text"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                placeholder="01000000000"
                maxLength={11}
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
