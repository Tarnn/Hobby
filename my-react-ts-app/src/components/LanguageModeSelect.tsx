import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import i18n from "../helpers/i18n";

export default function ColorModeSelect(props: SelectProps) {
  const [lang, setLang] = React.useState("en");

  if (!lang) {
    return null;
  }
  return (
    <Select
      value={lang}
      onChange={(event) =>
        setLang(event.target.value as "en" | "es" | "fr" | "hindi" | "punj")
      }
      SelectDisplayProps={{
        // @ts-ignore
        "data-screenshot": "toggle-language",
      }}
      {...props}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="fr">French</MenuItem>
      <MenuItem value="es">Spanish</MenuItem>
      <MenuItem value="hin">Hindi</MenuItem>
      <MenuItem value="punj">Punjabi</MenuItem>
    </Select>
  );
}
