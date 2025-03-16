import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Sitemark from "./Icons/SitemarkIcon";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";
import LanguageModeIconDropdown from "./LanguageModeIconDropdown";
import { useLocation, useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
  transform: "none !important",
  willChange: "transform",
}));

export default function AppAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
        transform: "none !important",
        willChange: "transform",
      }}
    >
      <Container maxWidth="lg" sx={{ transform: "none !important" }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {location.pathname !== "/" && (
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
              )}
            </Box>
          </Box>
          {/* Desktop view dropdowns */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
              transform: "none !important",
            }}
          >
            <LanguageModeIconDropdown />
            <ColorModeIconDropdown />
          </Box>
          {/* Mobile view dropdowns */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              gap: 1,
              alignItems: "center",
              transform: "none !important",
            }}
          >
            <LanguageModeIconDropdown size="medium" />
            <ColorModeIconDropdown size="medium" />
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
