import "./styling/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
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
import PrivateRoute from "./routes/PrivateRoute";
// import { AuthProvider } from "./context/AuthContext";

function App(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <BrowserRouter>
        {/* <AuthProvider> */}
          <NavigationProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomeMain />} />
              {/* <Route path="/about" element={<About />} /> */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignInSide />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              {/* Catch-all route for handling 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NavigationProvider>
          {/* </AuthProvider> */}
        </BrowserRouter>
      </Provider>
    </AppTheme>
  );
}

export default App;
