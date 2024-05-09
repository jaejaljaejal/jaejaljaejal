// pages/login/page.tsx

const LoginPage = () => {
  return (
    <div>
      <h1>로그인</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
