const Header = () => {
  return (
    <header className="w-full h-20vh bg-white flex justify-between items-center px-10">
      <h1 className="text-black">재잘재잘</h1>
      <div>
        <button className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded">
          로그인
        </button>
        <button className="ml-4 text-white bg-green-500 hover:bg-green-700 font-medium py-2 px-4 rounded">
          회원가입
        </button>
      </div>
    </header>
  );
};

export default Header;
