"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routerReady, setRouterReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== undefined) {
      setRouterReady(true); // 라우터가 준비되었다고 상태를 설정
    }
  }, [router]);

  // 로그인 페이지로 리디렉션
  const handleLoginRedirect = () => {
    if (routerReady) {
      // 라우터가 준비되었는지 확인
      router.push("/login");
    }
  };

  // // 로그인
  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // 로그아웃
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="w-full h-10vh bg-white flex justify-between items-center px-10">
      <h1 className="text-black text-2xl font-bold">재잘재잘</h1>
      <div>
        {isLoggedIn ? (
          // 로그인
          <>
            <span className="text-black mr-4">사용자 정보</span>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-700 font-medium py-2 px-4 rounded-lg"
            >
              로그아웃
            </button>
          </>
        ) : (
          // 비로그인
          <button
            onClick={handleLoginRedirect}
            className="text-black bg-white border border-gray-400 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg"
          >
            회원가입 / 로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
