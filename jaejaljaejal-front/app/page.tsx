import Header from "@/components/header";

export default function Home() {
  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <div className=" h-90vh flex flex-col justify-center items-center">
        <h1 className="font-bold text-9xl">재잘재잘</h1>
        <h1 className="font-thin text-2xl">모임을 재미있고 편하게</h1>
      </div>
    </main>
  );
}
