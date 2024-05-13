import Header from "@/components/header";

export default function Home() {
  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className=" h-90vh flex flex-col justify-center items-center">
        <p className="w-96 font-bold text-8xl">재잘재잘</p>
        <p className="w-96 font-thin text-2xl">모임을 재미있고 편하게</p>
      </div>
    </main>
  );
}
