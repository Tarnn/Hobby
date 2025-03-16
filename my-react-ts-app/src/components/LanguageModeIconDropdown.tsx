import * as React from "react";
import Box from "@mui/material/Box";
import IconButton, { IconButtonOwnProps } from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PublicIcon from "@mui/icons-material/Public";
import i18n from "../helpers/i18n";

export default function LanguageModeIconDropdown(props: IconButtonOwnProps) {
  const [lang, setLang] = React.useState("en");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLang = (language: "en" | "es" | "fr" | "hind" | "punj") => () => {
    setLang(language);
    i18n.changeLanguage(language);
    handleClose();
  };
  if (!lang) {
    return (
      <Box
        data-screenshot="toggle-mode"
        sx={(theme) => ({
          verticalAlign: "bottom",
          display: "inline-flex",
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: theme.shape.borderRadius,
          border: "1px solid",
          borderColor: theme.palette.divider,
        })}
      />
    );
  }
  const resolvedLang = lang as "en" | "es" | "fr" | "hind" | "punj";
  const icon = {
    en: <PublicIcon />,
    es: <PublicIcon />,
    fr: <PublicIcon />,
    hind: <PublicIcon />,
    punj: <PublicIcon />,
  }[resolvedLang];
  return (
    <React.Fragment>
      <IconButton
        data-screenshot="toggle-language"
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? "color-scheme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ transform: "none !important" }}
        {...props}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            variant: "outlined",
            elevation: 0,
            sx: {
              my: "4px",
              transform: "none !important",
              transition: "none !important",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          "& .MuiMenu-paper": {
            transform: "none !important",
            transition: "none !important",
          },
        }}
      >
        <MenuItem selected={lang === "en"} onClick={handleLang("en")}>
          English
        </MenuItem>
        <MenuItem selected={lang === "es"} onClick={handleLang("es")}>
          Español
        </MenuItem>
        <MenuItem selected={lang === "fr"} onClick={handleLang("fr")}>
          Français
        </MenuItem>
        <MenuItem selected={lang === "hind"} onClick={handleLang("hind")}>
          Hindi
        </MenuItem>
        <MenuItem selected={lang === "punj"} onClick={handleLang("punj")}>
          Punjabi
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
