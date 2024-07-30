"use client";
// pages/signup/page.tsx

import Header from "./header";
import InputField from "./inputField";
import RadioGroup from "./radioGroup";
import { useState } from "react";
import {
  evaluatePasswordStrength,
  getPasswordStrength,
  validatePasswordStrength,
} from "./passwordUtil";

const SignupPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    nickname: "",
    gender: "",
    birthdate: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    nickname: "",
    gender: "",
    birthdate: "",
  });

  const [feedback, setFeedback] = useState({
    password: "",
  });

  const [feedbackClass, setFeedbackClass] = useState({
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber" || name === "birthdate") {
      const numericValue = value.replace(/[^0-9]/g, ""); // 숫자만 남기기
      setFormValues({ ...formValues, [name]: numericValue });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }

    if (name === "password") {
      const score = evaluatePasswordStrength(value);
      const strength = getPasswordStrength(score);
      setFeedback({ ...feedback, password: `비밀번호 강도: ${strength}` });

      let feedbackColor = "";
      if (strength === "위험") feedbackColor = "text-red-500 font-semibold";
      if (strength === "보통") feedbackColor = "text-yellow-500 font-semibold";
      if (strength === "강력") feedbackColor = "text-green-500 font-semibold";
      setFeedbackClass({ ...feedbackClass, password: feedbackColor });
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, email: "유효한 이메일 주소를 입력해주세요." });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleSendVerificationCode = async () => {
    // 인증번호 전송 로직
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 제출 로직
  };

  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen h-screen bg-white flex flex-col items-center justify-center overflow-y-auto">
        <p className="w-96 mb-6 text-black text-2xl font-bold">회원가입</p>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <InputField
            label="이메일 주소"
            type="email"
            name="email"
            value={formValues.email}
            placeholder="jaejal@email.com"
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            error={errors.email}
            rounded="rounded-l-lg"
          >
            <button
              type="button"
              onClick={handleSendVerificationCode}
              className="w-1/3 h-12 bg-custom text-white rounded-r-lg hover:bg-custom"
            >
              인증 요청
            </button>
          </InputField>
          <InputField
            label="닉네임"
            type="text"
            name="nickname"
            value={formValues.nickname}
            placeholder="닉네임"
            onChange={handleInputChange}
            required
            error={errors.nickname}
          />
          <InputField
            label="비밀번호"
            type="password"
            name="password"
            value={formValues.password}
            placeholder="8~16자리 / 영문 대소문자, 숫자, 특수문자 조합"
            onChange={handleInputChange}
            required
            error={errors.password}
            feedback={feedback.password}
            feedbackClass={feedbackClass.password}
          />
          <InputField
            label="비밀번호 확인"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            placeholder="비밀번호 재입력"
            onChange={handleInputChange}
            required
            error={errors.confirmPassword}
          />
          <InputField
            label="전화번호"
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber}
            placeholder="01012345678"
            onChange={handleInputChange}
            maxLength={11}
            required
            error={errors.phoneNumber}
          />
          <InputField
            label="생일"
            type="text"
            name="birthdate"
            value={formValues.birthdate}
            placeholder="YYYYMMDD"
            onChange={handleInputChange}
            maxLength={8}
            required
            error={errors.birthdate}
          />
          <RadioGroup
            label="성별"
            name="gender"
            value={formValues.gender}
            onChange={handleInputChange}
            options={[
              { label: "남성", value: "male" },
              { label: "여성", value: "female" },
              { label: "기타", value: "other" },
            ]}
            required
            error={errors.gender}
          />
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
