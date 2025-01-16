import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";
import LogoCollection from "../components/LogoCollection";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Bio from "../components/Bio";
import SkillCollection from "../components/Skills";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import { User } from "../models/User";
// import { fetchUser } from "../api/SomeService";
import { AuthInitialState } from "../state/features/auth/AuthSlice";

// Define the props interface if needed
interface HomeMain {
  // Add any props here if necessary
}
const HomeMain: React.FC<HomeMain> = () => {
  const { t } = useTranslation();
  // const [setUser] = useState<User | null>(null);
  const isAuthenticated = useSelector(
    (state: { auth: AuthInitialState }) => state.auth.isAuthenticated
  );
  // useEffect(() => {
  //   const loadUser = async () => {
  //     const fetchedUser = await fetchUser(1);
  //     console.log("User: ", fetchedUser);
  //     setUser(fetchedUser);
  //   };
  //   loadUser();
  // }, []);

  return (
    <>
      <Hero />
      <div>
        {isAuthenticated && <h1>{t("welcome")}</h1>}
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
