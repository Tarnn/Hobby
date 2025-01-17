import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ScrollAnimation from "react-animate-on-scroll";
import { useTranslation } from "react-i18next";

const AWS_S3_HOBBY_CDN = import.meta.env.AWS_S3_HOBBY_CDN;

export default function Bio() {
  const { t } = useTranslation();
  return (
    <Box
      id="biography"
      sx={(theme) => ({
        width: "100%",
        pb: 7,
        background:
          "linear-gradient(to bottom, rgba(77, 166, 255, 0.1), 90%, rgba(77, 166, 255, 0.5) 100%)",
        ...theme.applyStyles("dark", {
          background:
            "linear-gradient(to bottom left, rgba(0, 0, 0, 0.5), 90%, rgba(77, 166, 255, 0.5) 100%)",
        }),
      })}
    >
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
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
            <Typography
              component="h2"
              variant="h2"
              sx={{ mb: 7, mt: 7, textAlign: "center" }}
            >
              {t("bio.title")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 10 },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ScrollAnimation animateIn="slideInLeft" animateOnce={true}>
                  <Avatar
                    alt="Taranjit Kang (Tarn)"
                    src={`${
                      AWS_S3_HOBBY_CDN ||
                      "https://hobby-tkang.s3.us-east-2.amazonaws.com"
                    }/me.jpeg`}
                    sx={{ width: 200, height: 200 }}
                  />
                </ScrollAnimation>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ScrollAnimation animateIn="slideInRight" animateOnce={true}>
                  <Typography
                    className="bio-text-container"
                    variant="body1"
                    sx={(theme) => ({
                      color: "black",
                      ...theme.applyStyles("dark", {
                        color: "grey.400",
                      }),
                    })}
                  >
                    <span className="bio-text"> {t("bio.text1")}</span>
                    <span className="bio-text">{t("bio.text2")}</span>
                    <span className="bio-text">{t("bio.text3")}</span>
                    <span className="bio-text">{t("bio.text4")}</span>
                  </Typography>
                </ScrollAnimation>
              </Box>
            </Box>
          </Box>
        </Container>
      </ScrollAnimation>
    </Box>
  );
}
