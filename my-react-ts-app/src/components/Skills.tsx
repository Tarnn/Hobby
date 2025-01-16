import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
// import SVGFromURL from "./icons/SVGFromURL";
// const AWS_S3_HOBBY_CDN = import.meta.env.AWS_S3_HOBBY_CDN;
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 9
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 3
  }
};

const whiteLogos = [
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Java.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Javascript.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Typescript.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Python.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/springboot.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/React.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Angular.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Redux.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/AWS.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Jenkins.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Docker.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Kubernetes.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Vagrant.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/GraphQL.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Splunk.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Slack.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Jira.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Github.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Wordpress.svg",
];

const darkLogos = [
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Java.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Javascript.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Typescript.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Python.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/springboot.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/React.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Angular.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Redux.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/AWS.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Jenkins.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Docker.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Kubernetes.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Vagrant.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/GraphQL.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Splunk.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Slack.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Jira.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Github.svg",
  "https://hobby-tkang.s3.us-east-2.amazonaws.com/Wordpress.svg",
];

const logoStyle = {
  width: "100px",
  height: "80px",
  margin: "0 32px",
  opacity: 0.7,
};

export default function SkillCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Box id="skillCollection" sx={{ py: 4, mb: 7 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        textAlign="center"
        sx={{ mb: 7, mt: 7 }}
      >
        Worked with great technologies
      </Typography>
      <Carousel responsive={responsive}>
        {logos.map((logo, index) => (
          <div key={index}>
            <img src={logo} alt={`Company${index + 1}`} style={logoStyle} />
          </div>
        ))}
      </Carousel>
    </Box>
  );
}
