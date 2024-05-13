"use client";
// pages/login/page.tsx

const LoginPage = () => {
  // 카카오톡 로그인 페이지로 리디렉션하는 함수
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:18080/oauth2/authorization/kakao";
  };

  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <div className="w-96 bg-white h-screen flex flex-col items-center justify-center">
        <p className="w-80 mb-6 text-black text-2xl font-bold">재잘재잘</p>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-80 h-12 border border-black border-1 p-2 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-80 h-12 border border-black border-1 p-2 rounded-lg text-black"
          />
          <button
            type="submit"
            className="w-80 h-12 px-4 py-2 bg-custom text-white rounded-lg hover:bg-custom"
          >
            로그인
          </button>
        </form>
        <div className="flex w-80 mt-4">
          <a
            href="/signup"
            className="text-xs text-gray-500 hover:text-blue-700 mr-4"
          >
            회원가입
          </a>
          <a
            href="/recover"
            className="text-xs text-gray-500 hover:text-blue-700"
          >
            아이디 / 비밀번호 찾기
          </a>
        </div>
        <p className="text-sm text-gray-500 my-4">소셜 계정으로 간편 로그인</p>
        <div className="flex flex-col space-y-2 w-80">
          <button
            type="button"
            className="h-12 px-4 py-2 bg-white border border-gray-400 text-black rounded-lg  flex items-center justify-center"
          >
            {/* <img
              src="/images/google-logo.png"
              alt="Google"
              className="h-6 mr-2"
            />{" "} */}
            구글 계정으로 로그인
          </button>
          <button
            onClick={handleKakaoLogin}
            className="h-12 px-4 py-2 bg-kakao text-kakao-label rounded-lg flex items-center justify-center"
          >
            {/* <img
              src="/images/kakao-logo.png"
              alt="Kakao"
              className="h-6 mr-2"
            />{" "} */}
            카카오톡 계정으로 로그인
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
