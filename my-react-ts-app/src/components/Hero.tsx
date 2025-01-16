import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { visuallyHidden } from "@mui/utils";
// import { styled } from "@mui/material/styles";
import Typist from "react-typist-component";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container as ParticlesContainer,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

// const AWS_S3_HOBBY_CDN = import.meta.env.AWS_S3_HOBBY_CDN;

export default function Hero() {
  const [init, setInit] = useState(false);
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

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
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
                xs: "clamp(2rem, 5vw, 2.5rem)",
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
                xs: "clamp(2rem, 5vw, 2.5rem)",
                md: "clamp(3rem, 10vw, 3.5rem)",
              },
              ...theme.applyStyles("dark", {
                color: "primary.light",
              }),
            })}
          >
            <Typist
              typingDelay={100}
              cursor={<span className="cursor">|</span>}
            >
              Software Engineer
              <Typist.Backspace count={0} />
              <Typist.Delay ms={1500} />
            </Typist>
          </Typography>
          <Typography
            sx={{
              textAlign: "justify",
              color: "text.secondary",
              width: { sm: "100%", md: "90%" },
              fontSize: "1rem",
            }}
          >
            From building my own computers, to coding software and architecting
            enterprise solutions, I've been a full-stack developer with a
            passion for innovation. With expertise in Java, Spring Boot, React,
            and cloud technologies, I've driven digital transformation at
            companies like Intuit and Royal Bank of Canada.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: "off",
                  "aria-label": "Enter your email address",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: "fit-content" }}
            >
              Contact Me
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Send me your email, and i'll get back to you &nbsp;
            <Link href="#" color="primary">
              as soon as possible.
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
