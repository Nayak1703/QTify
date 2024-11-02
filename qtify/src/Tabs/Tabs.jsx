import React, { useEffect } from "react";
import styles from "./Tabs.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Carousel from "../Carousel/Carousel";
import axios from "axios";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabsComponent = ({ genres, albumName, albumData }) => {
  const [value, setValue] = React.useState(0);
  const [songsData, setSongData] = React.useState([]);
  const [FiltersongsData, setFilterSongData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchingSongsData(event.target.textContent);
  };

  const fetchingSongsData = (text) => {
    let filterSongs;
    if (text === "All") {
      filterSongs = songsData;
    } else {
      filterSongs = songsData.filter((song) => song.genre.label === text);
    }
    setFilterSongData(filterSongs);
  };

  useEffect(() => {
    const handleLoad = async () => {
      const response = await axios.get(
        "https://qtify-backend-labs.crio.do/songs"
      );
      setSongData(response.data);
      setFilterSongData(response.data);
    };
    handleLoad();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#34c94b",
              height: "2px",
            },
          }}
          sx={{
            ".css-cyzoxb-MuiButtonBase-root-MuiTab-root": {
              color: "#ffffff",
            },
            ".Mui-selected": {
              color: `#34c94b !important `,
            },
          }}
        >
          <Tab
            label="All"
            {...a11yProps(0)}
            className={styles.customTabs}
            sx={{ textTransform: "none" }}
          />
          {genres.map((genre, index) => (
            <Tab
              key={index}
              sx={{ textTransform: "none" }}
              label={genre.label}
              {...a11yProps(index + 1)}
              className={styles.customTabs}
            />
          ))}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Carousel albumData={FiltersongsData} albumType={albumName} />
      </CustomTabPanel>
      {genres.map((genre, index) => (
        <CustomTabPanel key={index} value={value} index={index + 1}>
          <Carousel albumData={FiltersongsData} albumType={albumName} />
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default TabsComponent;
