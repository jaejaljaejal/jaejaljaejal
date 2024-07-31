'use client'

import { useState } from "react";
import {
  evaluatePasswordStrength,
  getPasswordStrength,
  validateEmail,
  validateNickname,
  validatePasswordStrength,
} from "./validation";

const useSignupForm = () => {
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
    confirmPassword: "",
  });

  const [feedbackClass, setFeedbackClass] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber" || name === "birthdate") {
      const numericValue = value.replace(/[^0-9]/g, ""); // 숫자만 남기기
      setFormValues({ ...formValues, [name]: numericValue });
    } else if (name === "nickname") {
      const sanitizedValue = value.replace(/[^가-힣a-zA-Z0-9]/g, ""); // 한글, 영문, 숫자만 남기기
      setFormValues({ ...formValues, [name]: sanitizedValue });
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

      // 비밀번호 확인도 함께 업데이트
      if (formValues.confirmPassword && value !== formValues.confirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "비밀번호가 일치하지 않습니다.",
        }));
        setFeedback((prevFeedback) => ({
          ...prevFeedback,
          confirmPassword: "",
        }));
        setFeedbackClass((prevClasses) => ({
          ...prevClasses,
          confirmPassword: "text-red-500 font-semibold",
        }));
      } else if (formValues.confirmPassword) {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        setFeedback((prevFeedback) => ({
          ...prevFeedback,
          confirmPassword: "비밀번호가 일치합니다.",
        }));
        setFeedbackClass((prevClasses) => ({
          ...prevClasses,
          confirmPassword: "text-green-500 font-semibold",
        }));
      }
    }

    if (name === "confirmPassword") {
      if (value !== formValues.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "비밀번호가 일치하지 않습니다.",
        }));
        setFeedback((prevFeedback) => ({
          ...prevFeedback,
          confirmPassword: "",
        }));
        setFeedbackClass((prevClasses) => ({
          ...prevClasses,
          confirmPassword: "text-red-500 font-semibold",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        setFeedback((prevFeedback) => ({
          ...prevFeedback,
          confirmPassword: "비밀번호가 일치합니다.",
        }));
        setFeedbackClass((prevClasses) => ({
          ...prevClasses,
          confirmPassword: "text-green-500 font-semibold",
        }));
      }
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      // 이메일 유효성 검사
      if (!validateEmail(value)) {
        setErrors({ ...errors, email: "유효한 이메일 주소를 입력해주세요." });
        setIsEmailValid(false);
      } else {
        setErrors({ ...errors, email: "" });
        setIsEmailValid(true);
      }
    } else if (name === "nickname") {
      // 닉네임 유효성 검사
      if (!validateNickname(value)) {
        setErrors({
          ...errors,
          nickname: "2~16자의 한글, 영문, 숫자만 사용해주세요.",
        });
      } else {
        setErrors({ ...errors, nickname: "" });
      }
    }
  };

  return {
    formValues,
    errors,
    feedback,
    feedbackClass,
    isEmailValid,
    handleInputChange,
    handleBlur,
  };
};

export default useSignupForm;
