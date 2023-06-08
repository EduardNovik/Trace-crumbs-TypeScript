import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { FC, ReactElement } from "react";

type SnackbarStateType = {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "center" | "left" | "right";
};

type SnackbarNewStateType = Omit<SnackbarStateType, "open">;

type HandleCloseType = () => void

const SnackbarFavoriteBtn: FC = (): ReactElement => {

  const [state, setState] = React.useState<SnackbarStateType>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarNewStateType) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose: HandleCloseType = () => {
    setState({ ...state, open: false });
  };

  const buttons: ReactElement = (
    <React.Fragment>
      <Checkbox
        onClick={handleClick({
          vertical: "top",
          horizontal: "center",
        })}
        icon={<FavoriteBorder />}
        checkedIcon={<FavoriteBorder sx={{ color: "rgb(96,96,96)" }} />}
      />
    </React.Fragment>
  );

  return (
    <IconButton>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        sx={{ marginTop: " 60px" }}
        open={open}
        onClose={handleClose}
        message="Please, login first, so you can add countries to your favorites"
        key={vertical + horizontal}
      />
    </IconButton>
  );
};

export default SnackbarFavoriteBtn;
