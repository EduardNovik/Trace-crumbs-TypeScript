import { Box } from "@mui/system";
import { Typography } from '@mui/material';
import { FC, ReactElement } from "react";

const Error: FC = (): ReactElement => {

    return (
        <Box sx={{height: "100vh", textAlign:'center', mt:'50%'}}>
            <Typography>Error...</Typography>
        </Box>
    );
};

export default Error;