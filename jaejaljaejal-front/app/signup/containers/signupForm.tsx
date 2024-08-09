"use client";

import React from "react";
import FormInput from "../components/formInput";
import FormRadioGroup from "../components/formRadioGroup";
import useSignupForm from "../hooks/useSignupForm";
import TermsAndConditions from "../components/termsAndConditions";
import { validateNickname } from "../utils/validation";
import { useSignupSubmit } from "../hooks/useSignupSubmit";

const SignupForm: React.FC = () => {
  const {
    formValues,
    errors,
    feedback,
    feedbackClass,
    isEmailValid,
    agreed,
    isEmailVerificationSent,
    showVerificationInput,
    verificationCode,
    timer,
    handleInputChange,
    handleBlur,
    handleAgreeChange,
    handleSendVerificationCode,
    handleVerificationCodeChange,
    handleVerifyCode,
  } = useSignupForm();

  const handleSubmit = useSignupSubmit();

  // 필수 필드와 약관 동의를 기반으로 isFormValid 계산
  const isFormValid =
    isEmailValid &&
    formValues.password.length >= 8 &&
    formValues.confirmPassword === formValues.password &&
    validateNickname(formValues.nickname) &&
    formValues.gender !== "" &&
    agreed;

  return (
    <form
      className="flex flex-col space-y-3"
      onSubmit={(e) => handleSubmit(e, formValues)}
    >
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
          onClick={handleSendVerificationCode} // 분리된 함수 연결
          disabled={!isEmailValid}
          className={`w-1/3 h-12 bg-custom text-white rounded-r-lg hover:bg-custom ${
            isEmailValid ? "" : "opacity-50 cursor-not-allowed"
          }`}
        >
          {isEmailVerificationSent ? "재발송" : "인증요청"}
        </button>
      </FormInput>
      {showVerificationInput && (
        <div>
          <FormInput
            label="인증번호 입력"
            type="text"
            name="verificationCode"
            value={verificationCode}
            placeholder="인증번호를 입력하세요"
            onChange={handleVerificationCodeChange}
            required
            rounded="rounded-l"
            error={errors.verificationCode}
          >
            <button
              type="button"
              onClick={handleVerifyCode}
              className="w-1/3 h-12 bg-custom text-white rounded-r-lg hover:bg-custom"
            >
              확인
            </button>
          </FormInput>
          <p className="text-red-500 text-xs">
            남은 시간: {Math.floor(timer / 60)}:
            {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
          </p>
        </div>
      )}
      <FormInput
        label="닉네임"
        type="text"
        name="nickname"
        value={formValues.nickname}
        placeholder="2~16자리 / 영문 대소문자, 한글, 숫자"
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
        ]}
        required
        error={errors.gender}
      />
      <TermsAndConditions agreed={agreed} onAgreeChange={handleAgreeChange} />
      <button
        type="submit"
        disabled={!isFormValid} // isFormValid에 따라 활성화/비활성화
        className={`w-96 h-12 px-4 py-2 bg-custom text-white rounded-lg hover:bg-custom ${
          isFormValid ? "" : "opacity-50 cursor-not-allowed"
        }`}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
