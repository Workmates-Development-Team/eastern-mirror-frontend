"use client";
import Footer from "@/components/main/layout/footer";
import Header from "@/components/main/layout/header";
import Navbar from "@/components/main/layout/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Head>
       
      </Head> */}
      <div className="min-h-screen">
        <Header />
        <Navbar />
        {children}
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
