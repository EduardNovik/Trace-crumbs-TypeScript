import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import photoAbout from "../../assets/photoAbout.jpg";
import SouthIcon from "@mui/icons-material/South";
import Link from "@mui/material/Link";
import { FC, ReactElement } from "react";


const AboutCard: FC = (): ReactElement => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "start",
    color: theme.palette.text.secondary,
  }));

  return (
    <Stack
      direction={"row"}
      sx={{
        mt: "-40px",
        gap: "40px",
        justifyContent: "center",
        flexDirection: { xs: "column", md: "column" },
      }}
    >
      <Box
        component="img"
        src={photoAbout}
        alt="myPhoto"
        sx={{
          objectFit: "cover",
          width: "100vw",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%)",
        }}
      />
      <Box sx={{ display: "grid" }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            pb: "20px",
            m: "0 auto",
            textAlign: "center",
            width: "70%",
          }}
        >
          Hi, I'm Eduard, and welcome to Trace Crumbs!
        </Typography>
        <Link href="#aboutTextBlock" sx={{ cursor: "default" }}>
          <SouthIcon
            sx={{
              m: "0 auto",
              mb: "80px",
              display: "block",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": { transform: "scale(170%)" },
            }}
          />
        </Link>
      </Box>

      <Item
        id="aboutTextBlock"
        sx={{
          width: "55%",
          borderRadius: "10px",
          m: "0 auto",
          mb: "100px",
          textAlign: "left",
        }}
      >
        <Typography sx={{ pb: "30px" }}>
          Here, you can find basic information and inspiring pictures about
          every country in the world. Whether you're planning your next trip or
          simply curious about different cultures, I've got you covered.
        </Typography>
        <Typography sx={{ pb: "30px" }}>
          My website features a page for each country, with a brief overview of
          its geography, population, language, and currency.
        </Typography>
        <Typography sx={{ pb: "30px" }}>
          But that's not all – I know that pictures can say more than a thousand
          words, so I've also included a gallery of stunning photos that
          showcase the beauty and diversity of each country. From towering
          mountains to pristine beaches, from bustling cities to quaint
          villages, you'll get a glimpse of what makes each place unique and
          special.
        </Typography>
        <Typography sx={{ pb: "30px" }}>
          And here's the best part: you can create your own list of your
          favorite countries that you want to visit! Simply click the "Add to
          Favorites" button on each country page, and you'll be able to keep
          track of all the places you're dreaming of exploring.
        </Typography>
        <Typography sx={{ pb: "30px" }}>
          I'm constantly working to improve Trace Crumbs – soon, I'll be adding
          an API that shows public transport information for each country, so
          you can easily plan your route and get around like a local.
        </Typography>
        <Typography sx={{ pb: "30px" }}>
          So what are you waiting for? Explore the world with Trace Crumbs and
          start creating your ultimate travel bucket list!
        </Typography>
      </Item>
    </Stack>
  );
};

export default AboutCard;



