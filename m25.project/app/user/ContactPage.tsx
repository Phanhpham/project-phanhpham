import React from "react";
import Header from "../components/Header/page";
import Contact from "../components/Contact";
import InfoSection from "../components/InfoSection";

export default function ContactPage() {
  return (
    <>
      <div className="hero_area">
        {/* header section strats */}
        <Header />
        {/* end header section */}
      </div>
      {/* end hero area */}
      {/* contact section */}
      <Contact />
      {/* end contact section */}
      {/* info section */}
      <InfoSection />
      {/* end info section */}
    </>
  );
}
