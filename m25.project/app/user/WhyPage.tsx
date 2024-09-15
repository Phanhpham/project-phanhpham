import React from "react";
import Header from "../components/Header/page";
import WhySection from "../components/WhySection";
import InfoSection from "../components/InfoSection";

export default function WhyPage() {
  return (
    <>
      <div className="hero_area">
        {/* header section strats */}
        <Header />
        {/* end header section */}
      </div>
      {/* end hero area */}
      {/* why section */}
      <WhySection />
      {/* end why section */}
      {/* info section */}
      <InfoSection />
      {/* end info section */}
    </>
  );
}
