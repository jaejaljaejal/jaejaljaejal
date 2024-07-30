"use client";

const Header = () => {
  return (
    <header className="w-full h-10vh bg-white flex justify-between items-center px-10 shadow-md z-10">
      <h1 className="text-black text-2xl font-bold">재잘재잘</h1>
      <div>
        <button className="text-black bg-white border border-gray-400 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg">
          <a href="/">홈으로 돌아가기</a>
        </button>
      </div>
    </header>
  );
};

export default Header;
