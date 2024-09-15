import React from "react";
import Header from "../components/Header/page";
import ShopSection from "../components/ShopSection/page";
import InfoSection from "../components/InfoSection";

export default function ShopPage() {
  return (
    <>
      <div className="hero_area">
        {/* header section strats */}
        <Header />
        {/* end header section */}
      </div>
      {/* end hero area */}
      {/* shop section */}
      <ShopSection />
      {/* end shop section */}
      {/* info section */}
      <InfoSection />
      {/* end info section */}
    </>
  );
}
