import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
const AWS_S3_HOBBY_CDN = import.meta.env.AWS_S3_HOBBY_CDN;

export default function Bio() {
  return (
    <Box
      id="biography"
      sx={(theme) => ({
        width: "100%",
        // height: "50vh",
        pb: 7,
        background:
          "linear-gradient(to bottom, rgba(77, 166, 255, 0.1), 90%, rgba(77, 166, 255, 0.5) 100%)",
        ...theme.applyStyles("dark", {
          background:
            "linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), 90%, rgba(77, 166, 255, 0.5) 100%)",
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
            textAlign: { xs: "left", sm: "center" },
          }}
        >
          <Typography component="h1" variant="h1" sx={{ mb: 7, mt: 7 }}>
            Biography
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 10 },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt="Taranjit Kang (Tarn)"
                src={`${
                  AWS_S3_HOBBY_CDN ||
                  "https://hobby-tkang.s3.us-east-2.amazonaws.com"
                }/me.jpeg`}
                sx={{ width: 200, height: 200 }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                <span className="bio-text">
                  Taranjit Kang - Canadian citizen born in Ontario, Canada, now
                  residing in the USA with an American green card. I've been a
                  full-stack developer my entire career, leveraging a deep
                  passion for technology that began during childhood.
                </span>

                <span className="bio-text">
                  Growing up, I was a computer nerd, I had my first IBM PC when
                  I was 8, later on in life I would begin building my own PCs
                  for gaming and experimenting with code long before formal
                  education.
                </span>
                <span className="bio-text">
                  My professional journey includes extensive experience with
                  Java, Spring Boot, React, and various front-end and back-end
                  technologies, working for notable fintech related companies
                  like Intuit and Royal Bank of Canada.
                </span>
                <span className="bio-text">
                  I'm committed to continuous learning and growth in the
                  ever-evolving tech landscape.
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
