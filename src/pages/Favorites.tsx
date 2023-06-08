import { Box } from '@mui/system';
import FavoriteCountriesCard from '../components/Favorites/FavoriteCountriesCard';
import { FC, ReactElement } from "react";

 const Favorites: FC = (): ReactElement => {
   return (
     <Box sx={{ height: "100vh" }}>
       <FavoriteCountriesCard />
     </Box>
   );
 };

export default Favorites
