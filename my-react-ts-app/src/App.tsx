import "./styling/App.scss";
import "animate.css/animate.compat.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import Navbar from "./components/Navbar";
import AppTheme from "./theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import HomeMain from "./pages/HomeMain";
import ScrollToTop from './components/ScrollToTop';
import ScrollManager from './components/ScrollManager';
import { useEffect } from 'react';

function App(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <ScrollManager />
        <NavigationProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeMain />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NavigationProvider>
        <ScrollToTop />
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
