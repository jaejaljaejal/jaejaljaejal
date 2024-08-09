// hooks/useSignupForm.ts
"use client";

import { useState } from "react";
import {
  evaluatePasswordStrength,
  getPasswordStrength,
  validateEmail,
  validateNickname,
} from "../utils/validation";

export interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  nickname: string;
  gender: string;
  birthdate: string;
}

const useSignupForm = () => {
  const initialFormValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    nickname: "",
    gender: "",
    birthdate: "",
  };

  const initialErrors = {
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    nickname: "",
    gender: "",
    birthdate: "",
  };

  const initialFeedback = {
    password: "",
    confirmPassword: "",
  };

  const initialFeedbackClass = {
    password: "",
    confirmPassword: "",
  };

  // ? 폼 상태
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState(initialErrors);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [feedbackClass, setFeedbackClass] = useState(initialFeedbackClass);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // ? 이메일 인증 관련 상태
  const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
  const [timer, setTimer] = useState<number>(180);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>("");

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValues = { ...formValues, [name]: value };

    if (name === "phoneNumber" || name === "birthdate") {
      newValues = { ...formValues, [name]: value.replace(/[^0-9]/g, "") };
    }

    if (name === "nickname") {
      newValues = {
        ...formValues,
        [name]: value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g, ""),
      };
      validateNicknameValue(newValues[name]);
    }

    if (name === "password") {
      handlePasswordChange(newValues[name]);
    }

    if (name === "confirmPassword") {
      validateConfirmPassword(newValues[name]);
    }

    setFormValues(newValues);
  };

  const validateNicknameValue = (nickname: string) => {
    if (nickname.length < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nickname: "2~16자의 한글, 영문, 숫자만 사용해주세요.",
      }));
    } else if (!validateNickname(nickname)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nickname: "사용할 수 없는 닉네임입니다.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, nickname: "" }));
    }
  };

  const handlePasswordChange = (password: string) => {
    const score = evaluatePasswordStrength(password);
    const strength = getPasswordStrength(score);
    setFeedback({ ...feedback, password: `비밀번호 강도: ${strength}` });

    let feedbackColor = "";
    if (strength === "위험") feedbackColor = "text-red-500 font-semibold";
    if (strength === "보통") feedbackColor = "text-yellow-500 font-semibold";
    if (strength === "강력") feedbackColor = "text-green-500 font-semibold";
    setFeedbackClass({ ...feedbackClass, password: feedbackColor });

    validateConfirmPassword(formValues.confirmPassword, password);
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string = formValues.password
  ) => {
    if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "비밀번호가 일치하지 않습니다.",
      }));
      setFeedback((prevFeedback) => ({ ...prevFeedback, confirmPassword: "" }));
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
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors({ ...errors, email: "유효한 이메일 주소를 입력해주세요." });
        setIsEmailValid(false);
      } else {
        setErrors({ ...errors, email: "" });
        setIsEmailValid(true);
      }
    } else if (name === "nickname") {
      validateNicknameValue(value);
    }
  };

  return {
    formValues,
    errors,
    feedback,
    feedbackClass,
    isEmailValid,
    agreed,
    isEmailVerificationSent,
    timer,
    showVerificationInput,
    verificationCode,
    handleInputChange,
    handleBlur,
    handleAgreeChange,
  };
};

export default useSignupForm;
