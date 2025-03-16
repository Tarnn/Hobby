import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";
import LogoCollection from "../components/LogoCollection";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Bio from "../components/Bio";
import SkillCollection from "../components/Skills";
import { useTranslation } from "react-i18next";

// Define the props interface if needed
interface HomeMain {
  // Add any props here if necessary
}

const HomeMain: React.FC<HomeMain> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <div>
        <Divider />
        <Bio />
        <Divider />
        <SkillCollection />
        <Divider />
        <Features />
        <Divider />
        <LogoCollection />
        <Divider />
        <Testimonials />
        <Divider />
      </div>
      <Footer />
    </>
  );
};

export default HomeMain;
