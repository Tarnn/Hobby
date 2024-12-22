import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Hero from "../components/Hero";
import LogoCollection from "../components/LogoCollection";
import Highlights from "../components/Highlights";
import Pricing from "../components/Pricing";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { User } from "../models/User";
import { fetchUser } from "../api/someService";

// Define the props interface if needed
interface HomeMain {
  // Add any props here if necessary
}
const HomeMain: React.FC<HomeMain> = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

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
      {/* <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div> */}
    </>
  );
};

export default HomeMain;
