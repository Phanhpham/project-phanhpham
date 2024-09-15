import React from "react";
import Header from "../components/Header/page";
import ClientSection from "../components/ClientSection";
import InfoSection from "../components/InfoSection";

export default function Testimonial() {
  return (
    <>
      <div className="hero_area">
        {/* header section strats */}
        <Header />
        {/* end header section */}
      </div>
      {/* end hero area */}
      {/* client section */}
      <ClientSection />
      {/* end client section */}
      {/* info section */}
      <InfoSection />
      {/* end info section */}
    </>
  );
}
