import CountryCard from "../components/Country/CountryCard";
import Photos from "../components/Country/Photos";
import { Box } from "@mui/system";
import { FC, ReactElement } from "react";

const Country: FC = (): ReactElement => {

  return (
    <Box sx={{ height: "100vh" }}>
      <CountryCard />
      <Photos />
    </Box>
  );
};

export default Country;
