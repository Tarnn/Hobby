import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";
import ScrollAnimation from "react-animate-on-scroll";

const whiteLogos = [
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/intuit.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/ncr.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/rbc.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/rogers-u.svg",
];

const darkLogos = [
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/intuit.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/ncr.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/rbc.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/rogers-u.svg",
];

const logoStyle = {
  width: "100px",
  height: "80px",
  margin: "0 32px",
  opacity: 0.7,
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          textAlign="center"
          sx={{ mb: 7, mt: 7 }}
        >
          Worked with great companies
        </Typography>
        <Grid
          container
          sx={{ justifyContent: "center", mt: 0.5, opacity: 0.9 }}
        >
          {logos.map((logo, index) => (
            <Grid item key={index}>
              <ScrollAnimation animateIn="zoomIn" animateOnce={true}>
                <img src={logo} alt={`Company${index + 1}`} style={logoStyle} />
              </ScrollAnimation>
            </Grid>
          ))}
        </Grid>
      </ScrollAnimation>
    </Box>
  );
}
