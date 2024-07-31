export type PasswordStrength = "위험" | "보통" | "강력";

export const evaluatePasswordStrength = (password: string): number => {
  let score = 0;

  if (!password) {
    return score;
  }

  // 길이 점수
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // 문자 유형 점수
  if (/[a-z]/.test(password)) score += 1; // 소문자
  if (/[A-Z]/.test(password)) score += 1; // 대문자
  if (/[0-9]/.test(password)) score += 1; // 숫자
  if (/[^a-zA-Z0-9]/.test(password)) score += 1; // 특수 문자

  return score;
};

export const getPasswordStrength = (score: number): PasswordStrength => {
  if (score <= 2) return "위험";
  if (score <= 4) return "보통";
  return "강력";
};

export const validatePasswordStrength = (password: string): boolean => {
  const hasThreeRequired =
    [
      /[a-z]/.test(password), // 소문자
      /[A-Z]/.test(password), // 대문자
      /[0-9]/.test(password), // 숫자
      /[!@#$%^&*]/.test(password), // 특수문자
    ].filter(Boolean).length >= 3;

  return (
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9!@#$%^&*]).{8,16}$/.test(
      password
    ) && hasThreeRequired
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateNickname = (nickname: string): boolean => {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,16}$/;
  return nicknameRegex.test(nickname);
};
