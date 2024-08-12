// utils/emailVerification.ts
export const sendVerificationCode = async (email: string) => {
  if (!email) throw new Error("유효한 이메일이 필요합니다.");

  try {
    const response = await fetch(
      "https://2158-175-112-161-219.ngrok-free.app/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error("인증 요청 실패");
    }

    return true; // 인증 요청 성공
  } catch (error) {
    console.error("인증 요청 중 오류 발생:", error);
    throw error;
  }
};

export const startTimer = (
  duration: number,
  onTick: (timeLeft: number) => void,
  onComplete: () => void
) => {
  let timeLeft = duration;
  const countdown = setInterval(() => {
    timeLeft -= 1;
    onTick(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(countdown);
      onComplete();
    }
  }, 1000);

  return countdown; // 필요하면 타이머를 멈추거나 관리할 수 있도록 interval ID 반환
};
