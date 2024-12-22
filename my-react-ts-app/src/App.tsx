import "./styling/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignInSide from "./pages/SignIn";
import { NavigationProvider } from "./context/NavigationContext";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import { store } from "./state/store";
import AppTheme from "./theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import HomeMain from "./pages/HomeMain";

function App(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <BrowserRouter>
          <NavigationProvider>
            <Navbar />
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<HomeMain />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignInSide />} />

              {/* Catch-all route for handling 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NavigationProvider>
        </BrowserRouter>
      </Provider>
    </AppTheme>
  );
}

export default App;
