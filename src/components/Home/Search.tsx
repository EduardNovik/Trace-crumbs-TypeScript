import { useState } from "react";

import { useDispatch } from "react-redux";
import { fetchCountriesAsync } from "../../rdx/countriesSlice";

import { FcSearch } from "react-icons/fc";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { FC, ReactElement } from "react";
import { AppDispatch } from "../../rdx/store";


type SearchByHandlerType = () => void;
type ValidateInputHandlerType = () => void;
type InputDataHandlerType = (e: any) => void;

const SearchManual: FC = (): ReactElement => {
  const [inputData, setInputData] = useState<any>("");
  const [searchBy, setSearchBy] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const specialChars = /[^a-zA-Z_ ]+/;

  const inputDataHandler: InputDataHandlerType = (e) => {
    setInputData(e.target.value);
  };

  const validateInputHandler: ValidateInputHandlerType = () => {
    if (
      isNaN(inputData) === true &&
      inputData.search(specialChars) === -1 &&
      inputData.length !== 1
    ) {
      searchByHandler();
      setError(false);
    } else if (inputData === "") {
      searchByHandler();
      setError(false);
    } else {
      setError(true);
    }
  };

  const searchByHandler: SearchByHandlerType = () => {
    const trimmedInput = inputData.trim();
    const urlPrefix = "https://restcountries.com/v3.1/";
    let url;
    switch (searchBy) {
      case "Currency":
        url = `${urlPrefix}currency/${trimmedInput}`;
        dispatch(fetchCountriesAsync(url));
        break;

      case "Language":
        url = `${urlPrefix}lang/${trimmedInput}`;
        dispatch(fetchCountriesAsync(url));
        break;

      case "Capital city":
        url = `${urlPrefix}capital/${trimmedInput}`;
        dispatch(fetchCountriesAsync(url));
        break;

      case "Region":
        url = `${urlPrefix}region/${trimmedInput}`;
        dispatch(fetchCountriesAsync(url));
        break;

      default:
        url =
          trimmedInput === ""
            ? `${urlPrefix}subregion/europe`
            : `${urlPrefix}name/${trimmedInput}`;
        console.log(url);
        dispatch(fetchCountriesAsync(url));
        break;
    }
  };

  return (
    <>
      <Stack
        sx={{
          flexGrow: 1,
          mt: "100px",
          display: { xs: "flex", md: "flex" },
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl
          onSubmit={(event) => event.preventDefault()}
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        >
          <TextField
            id="outlined-basic"
            label="Search country"
            variant="outlined"
            onChange={(e) => {
              inputDataHandler(e);
            }}
            value={inputData}
            size="small"
            sx={{ minWidth: "350px" }}
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
          size="small"
        >
          <InputLabel id="demo-select-small">Search by:</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={searchBy}
            label="Search by:"
            sx={{ width: "150px" }}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <MenuItem value="Country name">Country name</MenuItem>
            <MenuItem value="Currency">Currency</MenuItem>
            <MenuItem value="Language">Language</MenuItem>
            <MenuItem value="Capital city">Capital city</MenuItem>
            <MenuItem value="Region">Region</MenuItem>
          </Select>
          <Button
            variant="outlined"
            size="small"
            endIcon={<FcSearch />}
            onClick={() => validateInputHandler()}
          >
            Search
          </Button>
        </FormControl>
      </Stack>
      {error && (
        <Typography
          variant="subtitle1"
          sx={{ color: "red", textAlign: "center" }}
        >
          Invalid name, please try again
        </Typography>
      )}
    </>
  );
};

export default SearchManual;
