import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MuiChip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ScrollAnimation from "react-animate-on-scroll";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
const AWS_S3_HOBBY_CDN = import.meta.env.AWS_S3_HOBBY_CDN;
import { useTranslation } from "react-i18next";

let items: any[] = [];
interface ChipProps {
  selected?: boolean;
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
        color: "hsl(0, 0%, 100%)",
        borderColor: theme.palette.primary.light,
        "& .MuiChip-label": {
          color: "hsl(0, 0%, 100%)",
        },
        ...theme.applyStyles("dark", {
          borderColor: theme.palette.primary.dark,
        }),
      },
    },
  ],
}));

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
      <Box sx={{ display: "flex", gap: 1, overflow: "auto" }}>
        {items.map(({ title }, index) => (
          <Chip
            size="small"
            key={index}
            variant="outlined"
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined" sx={{ backgroundColor: "transparent" }}>
        <Box
          sx={(theme) => ({
            mb: 2,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: 400,
            backgroundImage: "var(--items-imageLight)",
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
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "medium" }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { t } = useTranslation();

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  items = [
    {
      icon: <AutoGraphIcon />,
      title: "Intuit",
      description: t("features.item1.description"),
      imageLight: `url("${
        AWS_S3_HOBBY_CDN || "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }Turbotax_homepage.png")`,
      imageDark: `url("${
        AWS_S3_HOBBY_CDN || "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }Turbotax_homepage.png")`,
    },
    {
      icon: <AutoGraphIcon />,
      title: "Royal Bank of Canada",
      description: t("features.item2.description"),
      imageLight: `url("${
        AWS_S3_HOBBY_CDN || "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }RBC_Mobile_home.png")`,
      imageDark: `url("${
        AWS_S3_HOBBY_CDN || "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }RBC_Mobile_home.png")`,
    },
    {
      icon: <AutoGraphIcon />,
      title: "Rogers - TSC",
      description: t("features.item3.description"),
      imageLight: `url("${
        AWS_S3_HOBBY_CDN || "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }Rogers_TSC_home.png")`,
      imageDark: `url("${
        AWS_S3_HOBBY_CDN || "https://hobby-tkang.s3.us-east-2.amazonaws.com/"
      }Rogers_TSC_home.png")`,
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
            sx={{ width: { sm: "100%", md: "60%" }, alignSelf: "flex-start" }}
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
