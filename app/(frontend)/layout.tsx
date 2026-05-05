import Footer from "@/components/footer";
import TopNav from "@/components/top-nav";
import React from "react";

function Frontendlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Frontendlayout;
