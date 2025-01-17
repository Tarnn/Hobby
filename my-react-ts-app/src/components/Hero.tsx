import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Typist from "react-typist-component";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container as ParticlesContainer,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import Fade from "@mui/material/Fade"; // Add this import at the top
import { useTranslation } from "react-i18next";

const COVER_LETTER_URL =
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/TK_2025_CoverLetter.docx";
const RESUME_URL =
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/TaranjitK_2025.docx";

// Add after imports
const cursorStyles = {
  "@keyframes blink": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  "& .cursor": {
    animation: "blink 1s infinite",
  },
};

const handleDownload = async (TYPE: string) => {
  const LINK_DOWNLOAD =
    TYPE === COVER_LETTER_URL
      ? "TaranjitKang_CoverLetter"
      : "TaranjitKang_Resume";
  try {
    const response = await fetch(TYPE);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = LINK_DOWNLOAD;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

export default function Hero() {
  const [init, setInit] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const { t } = useTranslation();
  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#7ccde6",
        },
        links: {
          color: "#027af2",
          distance: 75,
          enable: true,
          opacity: 0.75,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.bounce,
          },
          random: true,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 40,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "polygon",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );
  const particlesLoaded = async (
    container?: ParticlesContainer
  ): Promise<void> => {
    console.log(container);
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDescription(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: {
                xs: "clamp(2rem, 3vw, 2rem)",
                sm: "clamp(3rem, 5vw, 3rem)",
                md: "clamp(3rem, 10vw, 3.5rem)",
              },
            }}
          >
            TARANJIT KANG
          </Typography>
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              fontSize: {
                xs: "clamp(1.5rem, 3vw, 1.5rem)",
                sm: "clamp(2rem, 5vw, 2.5rem)",
                md: "clamp(3rem, 10vw, 3.5rem)",
              },
              ...cursorStyles, // Add this line
              ...theme.applyStyles("dark", {
                color: "primary.light",
              }),
            })}
          >
            <Typist
              typingDelay={200}
              cursor={<span className="cursor">|</span>}
            >
              {t("hero.role")}
              <Typist.Delay ms={1500} />
            </Typist>
          </Typography>
          <Fade in={showDescription} timeout={1500}>
            <Typography
              sx={{
                textAlign: "justify",
                color: "text.secondary",
                width: { sm: "100%", md: "90%" },
                fontSize: "1rem",
              }}
            >
              {t("hero.text")}
            </Typography>
          </Fade>
          <Fade in={showDescription} timeout={3000}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ minWidth: "fit-content" }}
                onClick={() => handleDownload(RESUME_URL)}
              >
                {t("hero.download")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ minWidth: "fit-content" }}
                onClick={() => handleDownload(COVER_LETTER_URL)}
              >
                {t("hero.coverLetter")}
              </Button>
            </Stack>
          </Fade>
        </Stack>
      </Container>
    </Box>
  );
}
