import Header from "@/components/header";

export default function Home() {
  return (
    <main className="bg-custom flex min-h-screen flex-col items-center">
      <Header />
      <h1 className="w-full h-90vh text-3xl font-bold flex items-center justify-center">
        재잘재잘
      </h1>
    </main>
  );
}
