import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/system";

const userTestimonials = [
  {
    avatar: (
      <Avatar
        alt="Naga Satyaveni Kommireddy"
        src="https://hobby-tkang.s3.us-east-2.amazonaws.com/naga.jpeg"
      />
    ),
    linkedin:
      "https://www.linkedin.com/in/naga-satyaveni-kommireddy-777040134/",
    name: "Naga Satyaveni Kommireddy",
    occupation: "Lead software Developer",
    testimonial:
      "TJ was a great team member. We worked on multiple projects related to springboot java,angular,.net,react etc... TJ is a person with a strong motivation and aims for excellence all the time. TJ is passionated to learn new technologies  and he is creative, energetic, solution oriented and highly motivated with great communication skills.He can quickly adopts the change and always helpful to colleagues.He is an asset to any Team and Company.",
  },
  {
    avatar: (
      <Avatar
        alt="Atilla Soylu"
        src="https://hobby-tkang.s3.us-east-2.amazonaws.com/atila.jpeg"
      />
    ),
    linkedin: "https://www.linkedin.com/in/atillasoylu/",
    name: "Atilla Soylu",
    occupation: "DevOps/Platform Integration and Support Manager",
    testimonial:
      "Taranjit has a great ability to observe and apply his knowledge to the challenges he faces. He has excelled in a very short time period to grasp a great knowledge in development and technologies that is in the market.",
  },
  {
    avatar: (
      <Avatar
        alt="Issa Ennab"
        src="https://hobby-tkang.s3.us-east-2.amazonaws.com/issab.jpeg"
      />
    ),
    linkedin: "https://www.linkedin.com/in/issa-ennab-671882a9/",
    name: "Issa Ennab",
    occupation: "Team Lead, Senior Java Developer",
    testimonial:
      "I have worked with TJ in Express Scripts and he was a team lead and an expert in Front End Technologies. TJ is eager to accomplish big and small tasks, always endeavour for excellence and does whatever it takes to get the job done. His ability to work with different teams and different project, and provide great communication is outstanding.",
  },
  {
    avatar: (
      <Avatar
        alt="Florin Neagu"
        src="https://hobby-tkang.s3.us-east-2.amazonaws.com/florin.jpeg"
      />
    ),
    linkedin: "https://www.linkedin.com/in/florinneagu/",
    name: "Florin Neagu",
    occupation: "Independent Senior Software Consultant",
    testimonial:
      "It has been a pleasure working with Taranjit (or TJ, as everybody calls him). Complete developer, with a wide variety of skills and experience, both in front end and back end, very reliable and focused on quality. Excellent communicator and a fun team mate. I strongly recommend him to be a very valuable member of any software development team.",
  },
  {
    avatar: (
      <Avatar
        alt="Hasan Mirza"
        src="https://hobby-tkang.s3.us-east-2.amazonaws.com/hasan.jpeg"
      />
    ),
    linkedin: "https://www.linkedin.com/in/mirzhasan/",
    name: "Hasan Mirza",
    occupation: "Senior Software Engineer",
    testimonial:
      "It has been a delight to work with TJ. He is a versatile developer with extensive skills and experience. TJ is dependable, committed to quality, and an excellent communicator. He's also a great team player, making him a strong candidate for any software development team. I wholeheartedly recommend him.",
  },
  {
    avatar: (
      <Avatar
        alt="Birinder Jagdev"
        src="https://hobby-tkang.s3.us-east-2.amazonaws.com/birinder.jpeg"
      />
    ),
    linkedin: "https://www.linkedin.com/in/birinder-jagdev-ab98077b/",
    name: "Birinder Jagdev",
    occupation: "SW Developer",
    testimonial:
      "I have worked with TJ at NCR where he served as a team lead and demonstrated expertise in Yaml + SPeL, Java, Spring Boot, Cucumber, Docker, Kubernetes, Vagrant, Jenkins, Bitbucket, GitLab, and Microsoft Teams. TJ is eager to tackle both big and small tasks, always striving for excellence and doing whatever it takes to get the job done. His ability to collaborate with various teams across different projects, coupled with his exceptional communication skills, is truly outstanding.",
  },
];

const whiteLogos = [
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/rbc.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/rbc.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/scotiabank.jpeg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/intuit.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/intuit.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/ncr.svg",
];

const darkLogos = [
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/rbc.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/rbc.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/scotiabank.jpeg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/intuit.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/intuit.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/ncr.svg",
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Box
      sx={{
        background:
          "linear-gradient(to bottom right, rgba(77, 166, 255, 0.1), 90%, rgba(77, 166, 255, 0.5) 100%)",
        ...theme.applyStyles("dark", {
          background:
            "linear-gradient(to bottom left, rgba(0, 0, 0, 0.5), 90%, rgba(77, 166, 255, 0.5) 100%)",
        }),
      }}
    >
      <Container
        id="testimonials"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
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
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Testimonials
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Here's some reccomendations and feedback I recieved from my previous
            coworkers at various companies throughout my career and from all
            sorts of roles:
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {userTestimonials.map((testimonial, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    {testimonial.testimonial}
                  </Typography>
                </CardContent>
                <a href={testimonial.linkedin} target="_blank">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardHeader
                      avatar={testimonial.avatar}
                      title={testimonial.name}
                      subheader={testimonial.occupation}
                    />
                    <img
                      src={logos[index]}
                      alt={`Logo ${index + 1}`}
                      style={logoStyle}
                    />
                  </Box>
                </a>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
