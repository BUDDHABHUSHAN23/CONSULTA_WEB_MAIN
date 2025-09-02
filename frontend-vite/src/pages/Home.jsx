import React from "react";
import Hero from "../components/Hero";
import IndustriesSection from "../components/IndustriesSection";
import AboutSection from "../components/AboutSection";
import StatsSection from "../components/StatsSection";
import ServicesSection from "../components/ServicesSection";
import TechnologiesSection from "../components/TechnologiesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <IndustriesSection />
      {/* <TechnologiesSection /> */}
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Home;