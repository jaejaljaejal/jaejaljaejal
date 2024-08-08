// hooks/useSignupSubmit.ts
import { FormValues } from "./useSignupForm";

export const useSignupSubmit = () => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formValues: FormValues
  ) => {
    e.preventDefault();

    // 공란 필드를 null로 변환하여 회원가입 데이터 준비
    const signupData = {
      email: formValues.email,
      password: formValues.password,
      nickname: formValues.nickname,
      gender: formValues.gender,
      birthDate: formValues.birthdate || null,
      cellPhoneNumber: formValues.phoneNumber || null,
    };

    try {
      const response = await fetch(
        "https://fc81-175-112-161-219.ngrok-free.app/user/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`회원가입 요청 실패: ${errorText}`);
      }

      const data = await response.json();
      console.log("회원가입 성공:", data);

      // 회원가입 성공 후 추가적인 처리 (예: 페이지 이동)
      // window.location.href = "/login";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return handleSubmit;
};
