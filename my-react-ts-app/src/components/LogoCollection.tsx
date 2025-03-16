import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";
import ScrollAnimation from "react-animate-on-scroll";
import { useTranslation } from "react-i18next";
import AnimateInView from './animations/AnimateInView';
import { motion } from 'framer-motion';
import { staggerContainer, slideInFromLeft } from './animations/variants';

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
  const { t } = useTranslation();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Box 
      component={motion.div}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      id="logoCollection" 
      sx={{ py: 4 }}
    >
      <AnimateInView scale rotate>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          textAlign="center"
          sx={{ mb: 7, mt: 7 }}
        >
          {t("companies.title")}
        </Typography>
      </AnimateInView>

      <AnimateInView delay={0.2} direction="up">
        <Grid container sx={{ justifyContent: "center", mt: 0.5, opacity: 0.9 }}>
          {logos.map((logo, index) => (
            <Grid item key={index}>
              <motion.div
                variants={slideInFromLeft}
                whileHover={{ 
                  scale: 1.2,
                  filter: "brightness(1.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <img src={logo} alt={`Company${index + 1}`} style={logoStyle} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </AnimateInView>
    </Box>
  );
}
