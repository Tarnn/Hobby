import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ScrollAnimation from "react-animate-on-scroll";
import { useTranslation } from "react-i18next";
import "animate.css/animate.min.css";

const AWS_S3_HOBBY_CDN = import.meta.env.AWS_S3_HOBBY_CDN;

export default function Bio() {
  const { t } = useTranslation();
  return (
    <Box
      id="biography"
      sx={(theme) => ({
        width: "100%",
        pb: 7,
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(to bottom, rgba(77, 166, 255, 0.1), 90%, rgba(77, 166, 255, 0.5) 100%)",
        ...theme.applyStyles("dark", {
          background:
            "linear-gradient(to bottom left, rgba(0, 0, 0, 0.5), 90%, rgba(77, 166, 255, 0.5) 100%)",
        }),
      })}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
          }}
        >
          <ScrollAnimation
            animateIn="animate__fadeInDown"
            duration={1}
            delay={200}
            animateOnce={true}
          >
            <Typography
              component="h2"
              variant="h2"
              sx={{ mb: 7, mt: 7, textAlign: "center" }}
            >
              {t("bio.title")}
            </Typography>
          </ScrollAnimation>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 10 },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ScrollAnimation
                animateIn="animate__fadeInLeft"
                duration={1}
                delay={400}
                animateOnce={true}
              >
                <Avatar
                  alt="Taranjit Kang (Tarn)"
                  src={`${
                    AWS_S3_HOBBY_CDN ||
                    "https://hobby-tkang.s3.us-east-2.amazonaws.com"
                  }/me.jpeg`}
                  sx={{ 
                    width: 200, 
                    height: 200,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </ScrollAnimation>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ScrollAnimation
                animateIn="animate__fadeInRight"
                duration={1}
                delay={600}
                animateOnce={true}
              >
                <Box className="bio-text-container">
                  <ScrollAnimation
                    animateIn="animate__fadeIn"
                    duration={1}
                    delay={800}
                    animateOnce={true}
                  >
                    <Typography variant="body1" sx={(theme) => ({
                      color: "black",
                      mb: 2,
                      ...theme.applyStyles("dark", {
                        color: "grey.400",
                      }),
                    })}>
                      {t("bio.text1")}
                    </Typography>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateIn="animate__fadeIn"
                    duration={1}
                    delay={1000}
                    animateOnce={true}
                  >
                    <Typography variant="body1" sx={(theme) => ({
                      color: "black",
                      mb: 2,
                      ...theme.applyStyles("dark", {
                        color: "grey.400",
                      }),
                    })}>
                      {t("bio.text2")}
                    </Typography>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateIn="animate__fadeIn"
                    duration={1}
                    delay={1200}
                    animateOnce={true}
                  >
                    <Typography variant="body1" sx={(theme) => ({
                      color: "black",
                      mb: 2,
                      ...theme.applyStyles("dark", {
                        color: "grey.400",
                      }),
                    })}>
                      {t("bio.text3")}
                    </Typography>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateIn="animate__fadeIn"
                    duration={1}
                    delay={1400}
                    animateOnce={true}
                  >
                    <Typography variant="body1" sx={(theme) => ({
                      color: "black",
                      ...theme.applyStyles("dark", {
                        color: "grey.400",
                      }),
                    })}>
                      {t("bio.text4")}
                    </Typography>
                  </ScrollAnimation>
                </Box>
              </ScrollAnimation>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
