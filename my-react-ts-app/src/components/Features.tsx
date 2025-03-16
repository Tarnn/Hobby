import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ScrollAnimation from "react-animate-on-scroll";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const AWS_S3_HOBBY_CDN = import.meta.env.VITE_AWS_S3_HOBBY_CDN;

let items: any[] = [];

interface MobileLayoutProps {
  selectedItemIndex: number;
  handleItemClick: (index: number) => void;
  selectedFeature: (typeof items)[0];
}

export function MobileLayout({
  selectedItemIndex,
  handleItemClick,
  selectedFeature,
}: MobileLayoutProps) {
  const theme = useTheme();
  
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          mx: -2,
          px: 2,
          width: '100vw',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={4}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.8,
          }}
          style={{
            width: '100%',
            padding: '0 12px',
          }}
        >
          {items.map(({ title }, index) => (
            <SwiperSlide
              key={index}
              style={{
                width: 'auto',
              }}
            >
              <Box
                component={motion.div}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleItemClick(index)}
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  textAlign: 'center',
                  py: 1.5,
                  px: 2,
                  borderRadius: '8px',
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: selectedItemIndex === index ? theme.shadows[4] : theme.shadows[1],
                  border: `1px solid ${selectedItemIndex === index ? theme.palette.primary.main : 'transparent'}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: selectedItemIndex === index ? 600 : 400,
                    color: selectedItemIndex === index 
                      ? 'primary.main'
                      : 'text.secondary',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {title}
                </Typography>
                {selectedItemIndex === index && (
                  <motion.div
                    layoutId="activeFeatureTab"
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '50%',
                      width: '20px',
                      height: '2px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '1px',
                    }}
                    initial={{ x: '-50%' }}
                    animate={{ x: '-50%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Card 
        variant="outlined" 
        sx={{ 
          backgroundColor: "transparent",
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: theme.shadows[2]
        }}
      >
        <Box
          data-testid="feature-image"
          sx={(theme) => ({
            mb: 2,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: 400,
            backgroundImage: "var(--items-imageLight)",
            transition: 'all 0.3s ease',
            ...theme.applyStyles("dark", {
              backgroundImage: "var(--items-imageDark)",
            }),
          })}
          style={
            items[selectedItemIndex]
              ? ({
                  "--items-imageLight": items[selectedItemIndex].imageLight,
                  "--items-imageDark": items[selectedItemIndex].imageDark,
                } as any)
              : {}
          }
        />
        <Box 
          sx={{ 
            px: 3, 
            pb: 3,
            pt: 1,
            borderTop: `1px solid ${theme.palette.divider}` 
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            sx={{ 
              color: "primary.main", 
              fontWeight: 600,
              mb: 1
            }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: "text.secondary",
              lineHeight: 1.6
            }}
          >
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { t, i18n } = useTranslation();

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  items = [
    {
      icon: <AutoGraphIcon />,
      title: "Intuit",
      description: t("features.item1.description"),
      imageLight: `url("${
        AWS_S3_HOBBY_CDN ?? "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }Turbotax_homepage.png")`,
      imageDark: `url("${
        AWS_S3_HOBBY_CDN ?? "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }Turbotax_homepage.png")`,
    },
    {
      icon: <AutoGraphIcon />,
      title: "Royal Bank of Canada",
      description: t("features.item2.description"),
      imageLight: `url("${
        AWS_S3_HOBBY_CDN ?? "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }RBC_Mobile_home.png")`,
      imageDark: `url("${
        AWS_S3_HOBBY_CDN ?? "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }RBC_Mobile_home.png")`,
    },
    {
      icon: <AutoGraphIcon />,
      title: "Rogers",
      description: t("features.item3.description"),
      imageLight: `url("${
        AWS_S3_HOBBY_CDN ?? "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }Rogers_TSC_home.png")`,
      imageDark: `url("${
        AWS_S3_HOBBY_CDN ?? "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }Rogers_TSC_home.png")`,
    },
    {
      icon: <AutoGraphIcon />,
      title: "NCR",
      description: t("features.item4.description"),
      imageLight: `url("${
        AWS_S3_HOBBY_CDN ?? "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }tellerApp.jpg")`,
      imageDark: `url("${
        AWS_S3_HOBBY_CDN ?? "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }tellerApp.jpg")`,
    },
  ];

  const selectedFeature = items[selectedItemIndex];

  return (
    <Box
      id="features"
      sx={(theme) => ({
        width: "100%",
        pb: 7,
        pt: 7,
        background:
          "linear-gradient(to bottom left, rgba(77, 166, 255, 0.1), 90%, rgba(77, 166, 255, 0.5) 100%)",
        ...theme.applyStyles("dark", {
          background:
            "linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), 90%, rgba(77, 166, 255, 0.5) 100%)",
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
              width: { sm: "100%", md: "60%" }, 
              alignSelf: { xs: "center", sm: "flex-start" },
              textAlign: { xs: "center", sm: "left" }
            }}
          >
            <Typography
              component="h2"
              variant="h2"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              {t("features.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1rem",
                mb: { xs: 2, sm: 4 },
              }}
            >
              {t("features.text")}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row-reverse" },
              gap: 2,
            }}
          >
            <div>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                {items.map(({ icon, title, description }, index) => (
                  <Box
                    key={index}
                    component={Button}
                    onClick={() => handleItemClick(index)}
                    sx={[
                      (theme) => ({
                        p: 2,
                        height: "100%",
                        width: "100%",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }),
                      selectedItemIndex === index && {
                        backgroundColor: "action.selected",
                      },
                    ]}
                  >
                    <Box
                      sx={[
                        {
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "left",
                          gap: 1,
                          textAlign: "left",
                          textTransform: "none",
                          color: "text.secondary",
                        },
                        selectedItemIndex === index && {
                          color: "text.primary",
                        },
                      ]}
                    >
                      {icon}

                      <Typography variant="h6">{title}</Typography>
                      <Typography variant="body2">{description}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <MobileLayout
                selectedItemIndex={selectedItemIndex}
                handleItemClick={handleItemClick}
                selectedFeature={selectedFeature}
              />
            </div>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                width: { xs: "100%", md: "70%" },
                height: "var(--items-image-height)",
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  width: "100%",
                  display: { xs: "none", sm: "flex" },
                  pointerEvents: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Box
                  data-testid="image-container"
                  sx={(theme) => ({
                    m: "auto",
                    width: 500,
                    height: 450,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "var(--items-imageLight)",
                    ...theme.applyStyles("dark", {
                      backgroundImage: "var(--items-imageDark)",
                    }),
                  })}
                  style={
                    items[selectedItemIndex]
                      ? ({
                          "--items-imageLight":
                            items[selectedItemIndex].imageLight,
                          "--items-imageDark":
                            items[selectedItemIndex].imageDark,
                        } as any)
                      : {}
                  }
                />
              </Card>
            </Box>
          </Box>
        </Container>
      </ScrollAnimation>
    </Box>
  );
}
