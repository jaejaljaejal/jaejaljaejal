const Header = () => {
  return (
    <header className="w-full h-20vh bg-white flex justify-between items-center px-10">
      <h1 className="text-black text-2xl font-bold">재잘재잘</h1>
      <div>
        <button className="text-black bg-white border border-gray-400 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg">
          회원가입 / 로그인
        </button>
      </div>
    </header>
  );
};

export default Header;
