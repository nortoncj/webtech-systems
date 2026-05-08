import Footer from "@/components/footer";
import TopNav from "@/components/top-nav";
import Script from "next/script";
import React from "react";

function Frontendlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Clarity tracking */}
      <Script
        id="clarity-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "wno27hvi08");`,
        }}
      />
      <TopNav />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Frontendlayout;
