import Header from "./header";
import SignupForm from "./signupForm";

const SignupPage = () => {
  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-screen h-screen bg-white flex flex-col items-center justify-center overflow-y-auto">
        <p className="w-96 mb-6 text-black text-2xl font-bold">회원가입</p>
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
