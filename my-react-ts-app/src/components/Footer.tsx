import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import SVGFromURL from "./icons/SVGFromURL";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="https://mui.com/">
        Sitemark
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      {/* Intuit */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, height: "100px", width: "100%"}}>
        <SVGFromURL url="https://hobby-tkang.s3.us-east-2.amazonaws.com/intuit.svg" />
        <SVGFromURL url="https://hobby-tkang.s3.us-east-2.amazonaws.com/ncr.svg" />
        <SVGFromURL url="https://hobby-tkang.s3.us-east-2.amazonaws.com/rbc.svg" />
        <SVGFromURL url="https://hobby-tkang.s3.us-east-2.amazonaws.com/rogers-u.svg" />
      </Box>
      <Box>
        <Copyright />
      </Box>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ justifyContent: "left", color: "text.secondary" }}
      >
        <IconButton
          color="inherit"
          size="small"
          href="https://github.com/tarnn"
          aria-label="GitHub"
          sx={{ alignSelf: "center" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          href="https://x.com/Tarn__K"
          aria-label="X"
          sx={{ alignSelf: "center" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          href="https://ca.linkedin.com/in/taranjit-kang-530737b8"
          aria-label="LinkedIn"
          sx={{ alignSelf: "center" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Container>
  );
}
