import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../helpers/i18n";
import WalletConnector from "../components/WalletConnector";
import { fetchUser, User } from "../api/SomeService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";

// Define the props interface if needed
interface HomeProps {
  // Add any props here if necessary
}

const Home: React.FC<HomeProps> = () => {
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
    <div>
      <h1>{t("welcome")}</h1>

      {/* Navigation */}
      <WalletConnector />
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("es")}>ES</button>

      {/* Axios/Local Proxy Api */}
      <div>
        {user ? (
          <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </>
        ) : (
          <p>Loading user...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
