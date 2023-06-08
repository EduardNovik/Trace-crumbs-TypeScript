import CountriesCard from "../components/Home/CountriesCard";
import Search from "../components/Home/Search";
import { Box } from '@mui/system';
import { FC, ReactElement } from "react";

const Home: FC = (): ReactElement => {

    return (
        <Box>
            <Search/>
            <CountriesCard/>
        </Box>
    );
};

export default Home;