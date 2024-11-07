import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg";

function Search({ searchData, placeholder }) {
  let navigate = useNavigate();
  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  const onSubmit = (e) => {
    e.preventDefault();
    const searchAlbumName = e.target[0].value
      .toLowerCase()
      .split(" ")
      .join("-");

    navigate(`/album/${searchAlbumName}`);
  };

  const [enterData, setEnterData] = useState("");

  const handleInputData = (e) => {
    setEnterData(e.target.value);
  };
  return (
    <div className={styles.searchInput}>
      <form
        className={styles.wrapper}
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className={styles.inputFieldBtn}>
          <Autocomplete
            disableClearable
            className={styles.customAutoComplete}
            sx={{
              width: "100%",
            }}
            options={searchData}
            autoHighlight
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{
                    color: "#121212",
                    fontFamily: "Poppins, sans-serif",
                    display: "flex !important",
                    justifyContent: "space-between !important",
                    borderBottom: "1px solid #121212",
                    padding: "10px",
                  }}
                  {...optionProps}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}
                  >
                    <img
                      loading="lazy"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "5px",
                      }}
                      src={option.image}
                      alt=""
                    />
                    <p className={styles.title}>{option.title}</p>
                  </div>
                  <p className={styles.follows}>{option.follows} follows</p>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="album"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "2px 5px !important",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    fontFamily: "Poppins, sans-serif",
                    color: "#121212",

                    "& fieldset": {
                      borderColor: "#ffffff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#121212",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#121212",
                    },
                  },
                }}
                className={styles.search}
                placeholder={placeholder}
                required
                value={enterData}
                onInput={handleInputData}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <InputAdornment position="end">
                        <button className={styles.searchButton} type="submit">
                          <SearchIcon />
                        </button>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
