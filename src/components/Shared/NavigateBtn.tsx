import { FC, ReactElement } from 'react';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";

import { ThemeStateDataType } from '../../rdx/themeSlice'
import { RootState } from '../../rdx/store';

const NavigateBtn: FC = (): ReactElement => {
    
const themeState = useSelector<RootState, ThemeStateDataType>(state => state.theme.data)

    return (
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            position: "fixed",
            right: "40px",
            bottom: "40px",
            zIndex: "1",
          }}
        >
          <Fab
            variant="extended"
            size="small"
            sx={{
              backgroundColor: "transparent",
              backdropFilter: "blur(1.5rem)",
              fontSize: "12px",
              color:"inherit",
              "&:hover": { backgroundColor: themeState === 'dark' ? "rgb(56,56,56)" : 'null'},
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <NavigationIcon sx={{ mr: 1, width: "15px" }}  />
            Navigate
          </Fab>
        </Box>
    );
};

export default NavigateBtn;