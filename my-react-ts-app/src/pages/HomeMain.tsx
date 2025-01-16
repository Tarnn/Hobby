import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";
import Bio from "../components/Bio";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { User } from "../models/User";
import { fetchUser } from "../api/SomeService";
import { AuthInitialState } from "../state/features/auth/AuthSlice";

// Define the props interface if needed
interface HomeMain {
  // Add any props here if necessary
}
const HomeMain: React.FC<HomeMain> = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = useSelector(
    (state: { auth: AuthInitialState }) => state.auth.isAuthenticated
  );
  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await fetchUser(1);
      console.log("User: ", fetchedUser);
      setUser(fetchedUser);
    };
    loadUser();
  }, []);

  return (
    <>
      <Hero />
      <div>
        {isAuthenticated && <h1>{t("welcome")}</h1>}
        {/* <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />*/}
        <Divider />
        <Bio />
        <Divider />
      </div>
      <Footer />
    </>
  );
};

export default HomeMain;
