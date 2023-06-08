import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import { UNSPLASH_KEY } from "../../main";
import { fetchPhotosAsync } from "../../rdx/photosSlice";
import NavigateBtn from "../Shared/NavigateBtn";
import { FC, ReactElement } from "react";
import { RootState } from "../../rdx/store";
import { ThemeStateDataType } from '../../rdx/themeSlice'
import { CountryDetailsType } from '../../rdx/countryDetailsSlice'
import { AppDispatch } from '../../rdx/store';
import { PhotoType } from '../../rdx/photosSlice';

type ShowPhotosHandlerType = () => void


const Photos: FC = (): ReactElement => {

  const photos = useSelector<RootState, PhotoType[]>((state) => state.photos.data);
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState<boolean>(false);

  const themeState = useSelector<RootState, ThemeStateDataType>((state) => state.theme.data);

  const countryName = useSelector<RootState, CountryDetailsType>(
    (state) => state.countryDetails.data.name.common
  );

  const URLphotos = `https://api.unsplash.com/search/photos?page=1&query=${countryName}&client_id=${UNSPLASH_KEY}`;

  const showPhotosHandler:ShowPhotosHandlerType = () => {
    dispatch(fetchPhotosAsync(URLphotos));
    setShow(!show);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "60px"}}>
        <Button
          variant="outlined"
          onClick={showPhotosHandler}
          sx={{ mb: "120px" }}
          id="btn"
        >
          Show photos
        </Button>
      </Box>
      <NavigateBtn />
      {photos && (
        <Box
          sx={{
            width: "auto",
            height: "auto",
            display: show ? "block" : "none",
            p: "40px",
            pt: "0px",
            background: themeState === "light" ? 'linear-gradient(270deg, rgba(202,248,254,1) 22%, rgba(248,229,252,1) 98%)' : null,
          }}
          bgcolor={"background.default"}
        >
          <ImageList variant="masonry" cols={4} gap={8}>
            {photos.map((photo:PhotoType) => (
              <ImageListItem key={photo.id}>
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  loading="lazy"
                  style={{ borderRadius: "25px" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </Box>
  );
};

export default Photos;
