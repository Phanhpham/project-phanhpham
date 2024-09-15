import React from "react";
import Header from "../components/Header/page";
import Slider from "../components/Slider";
import ShopSection from "../components/ShopSection/page";
import SavingSection from "../components/SavingSection";
import WhySection from "../components/WhySection";
import GiftSection from "../components/GiftSection";
import Contact from "../components/Contact";
import ClientSection from "../components/ClientSection";
import InfoSection from "../components/InfoSection";

export default function HomePage() {
  return (
    <>
      <div className="hero_area">
        {/* header section strats */}
        <Header />
        {/* end header section */}
        {/* slider section */}
        <Slider />
        {/* end slider section */}
      </div>
      {/* end hero area */}
      {/* shop section */}
      <ShopSection />
      {/* end shop section */}
      {/* saving section */}
      <SavingSection />
      {/* end saving section */}
      {/* why section */}
      <WhySection />
      {/* end why section */}
      {/* gift section */}
      <GiftSection />
      {/* end gift section */}
      {/* contact section */}
      <Contact />
      {/* end contact section */}
      {/* client section */}
      <ClientSection />
      {/* end client section */}
      {/* info section */}
      <InfoSection />
      {/* end info section */}
    </>
  );
}
