"use client";

import React from "react";
import FormInput from "./formInput";
import { useState } from "react";
import FormRadioGroup from "./formRadioGroup";
import useSignupForm from "./useSignupForm";
import TermsAndConditions from "./termsAndConditions";

const SignupForm: React.FC = () => {
  const {
    formValues,
    errors,
    feedback,
    feedbackClass,
    isEmailValid,
    handleInputChange,
    handleBlur,
  } = useSignupForm();

  const [agreed, setAgreed] = useState(false);

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 제출 로직
    console.log("Form submitted");
  };

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
      <FormInput
        label="이메일 주소"
        type="email"
        name="email"
        value={formValues.email}
        placeholder="jaejal@email.com"
        onChange={handleInputChange}
        onBlur={handleBlur}
        required
        error={errors.email}
        rounded="rounded-l"
      >
        <button
          type="button"
          disabled={!isEmailValid}
          className={`w-1/3 h-12 bg-custom text-white rounded-r-lg hover:bg-custom ${
            isEmailValid ? "" : "opacity-50 cursor-not-allowed"
          }`}
        >
          인증요청
        </button>
      </FormInput>
      <FormInput
        label="닉네임"
        type="text"
        name="nickname"
        value={formValues.nickname}
        placeholder="닉네임"
        onChange={handleInputChange}
        onBlur={handleBlur}
        required
        error={errors.nickname}
        rounded="rounded"
        maxLength={16}
      />
      <FormInput
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
        rounded="rounded"
      />
      <FormInput
        label="비밀번호 확인"
        type="password"
        name="confirmPassword"
        value={formValues.confirmPassword}
        placeholder="비밀번호 재입력"
        onChange={handleInputChange}
        required
        error={errors.confirmPassword}
        feedback={feedback.confirmPassword}
        feedbackClass={feedbackClass.confirmPassword}
        rounded="rounded"
      />
      <FormInput
        label="전화번호"
        type="text"
        name="phoneNumber"
        value={formValues.phoneNumber}
        placeholder="01012345678"
        onChange={handleInputChange}
        maxLength={11}
        required
        error={errors.phoneNumber}
        rounded="rounded"
      />
      <FormInput
        label="생일"
        type="text"
        name="birthdate"
        value={formValues.birthdate}
        placeholder="YYYYMMDD"
        onChange={handleInputChange}
        maxLength={8}
        required
        error={errors.birthdate}
        rounded="rounded"
      />
      <FormRadioGroup
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
      <TermsAndConditions agreed={agreed} onAgreeChange={handleAgreeChange} />
      <button
        type="submit"
        className="w-96 h-12 px-4 py-2 bg-custom text-white rounded-lg hover:bg-custom"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
