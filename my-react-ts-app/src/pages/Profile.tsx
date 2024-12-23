import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ProfileForm from "../components/ProfileForm";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

export default function Checkout() {
  const handleNext = () => {
    console.log("Next");
  };

  return (
    <Grid
      container
      sx={{
        height: {
          xs: "100%",
          sm: "calc(100dvh - var(--template-frame-height, 0px))",
        },
        mt: {
          xs: 4,
          sm: 0,
        },
      }}
    >
      <Grid
        size={{ xs: 12, sm: 5, lg: 4 }}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          backgroundColor: "background.paper",
          borderRight: { sm: "none", md: "1px solid" },
          borderColor: { sm: "none", md: "divider" },
          alignItems: "start",
          pt: 16,
          px: 10,
          gap: 4,
        }}
      >
        <Box>Profile Picture</Box>
        <Button
          variant="contained"
          endIcon={<EditIcon />}
          sx={{ width: { xs: "100%", sm: "fit-content" } }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          endIcon={<ClearIcon />}
          sx={{ width: { xs: "100%", sm: "fit-content" } }}
        >
          Remove
        </Button>
      </Grid>
      <Grid
        size={{ sm: 12, md: 7, lg: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          width: "100%",
          backgroundColor: { xs: "transparent", sm: "background.default" },
          alignItems: "start",
          pt: { xs: 0, sm: 16 },
          px: { xs: 2, sm: 10 },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "space-between", md: "flex-end" },
            alignItems: "center",
            width: "100%",
            maxWidth: { sm: "100%", md: 600 },
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "100%",
            maxWidth: { sm: "100%", md: 600 },
            maxHeight: "720px",
            gap: { xs: 5, md: "none" },
          }}
        >
          <React.Fragment>
            <ProfileForm />
            <Box
              sx={[
                {
                  display: "flex",
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  alignItems: "end",
                  flexGrow: 1,
                  gap: 1,
                  pb: { xs: 12, sm: 0 },
                  mt: { xs: 2, sm: 0 },
                  mb: "60px",
                  justifyContent: "flex-end",
                },
              ]}
            >
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleNext}
                sx={{ width: { xs: "100%", sm: "fit-content" } }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        </Box>
      </Grid>
    </Grid>
  );
}
