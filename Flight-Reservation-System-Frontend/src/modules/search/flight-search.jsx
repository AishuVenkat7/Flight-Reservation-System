import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  Typography,
  Paper,
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import { validateSearch } from "../../services/global-services";
import actions from "../../constants/actions";
import FlightListOneWay from "../../components/flight-list-grid/flight-list-one-way";
import CityJSON from "../../mocks/cities.json";

const cities = [...CityJSON];

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    padding: theme.spacing(),
    margin: "auto",
    maxWidth: 600,
    background: "rgba(0, 0, 0, 0.87)",
    borderRadius: 8,
  },
  
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
    width: "100%",
  },
  inputContainer: {
    marginBottom: theme.spacing(2),
  },
  centerButton: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(5),
    margin: "auto",
    maxWidth: 800,
    background: "none", // Set background to none
    boxShadow: "none", // Remove box shadow
  },
}));


const FlightSearch = (props) => {
  const [source, setSource] = useState(null);
  const [dest, setDest] = useState(null);
  const [deptDate, setDeptDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectTrip, setSelectTrip] = useState("one");
  const [searchDone, setSearchDone] = useState(false);
  const [cityError, setCityError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const flightList = useSelector((state) => state.flightSearch.searchList);
  const classes = useStyles();

  // On Page Load
  useEffect(() => {
    // Reset Flight List
    dispatch({
      type: actions.RESET_FLIGHT_LIST,
    });
  }, []);

  const handleSelectTrip = (e) => {
    setSelectTrip(e.target.value);
  };

  const handleDeparture = (e) => {
    setDeptDate(e.target.value);
  };

  const handleReturn = (e) => {
    setReturnDate(e.target.value);
  };

  const handleSearchFlight = () => {
    const payload = {
      source: source?.name,
      destination: dest?.name,
      deptDate: deptDate,
      returnDate: returnDate,
      tripType: selectTrip,
    };

    if (
      payload?.source?.toLowerCase() === payload?.destination?.toLowerCase()
    ) {
      setCityError(true);
      setSearchDone(false);
      return;
    } else {
      setCityError(false);
    }

    dispatch({
      type: actions.RESET_FLIGHT_LIST,
    });

    dispatch({
      type: actions.GET_FLIGHT_LIST,
      payload,
    });

    setSearchDone(true);
  };

  const handleBookNow = (bookingVal) => {
    let timer;
    dispatch({
      type: actions.SET_BOOKING_DETAILS,
      payload: bookingVal,
    });

    clearTimeout(timer);

    timer = setTimeout(() => {
      history.push("/flight-booking");
    }, 100);
  };

  const filteredDestinations = cities.filter(
    (city) => !source || city.name !== source.name
  );

  const filteredSources = cities.filter(
    (city) => !dest || city.name !== dest.name
  );

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleClearFields = () => {
    setSource(null);
    setDest(null);
    setDeptDate("");
    setReturnDate("");
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container className={classes.centerContainer}>
        <RadioGroup row onChange={handleSelectTrip} value={selectTrip}>
          <FormControlLabel
            value="one"
            control={<Radio style={{ color: "black" }} />}
            label="One Way"
          />
          <FormControlLabel
            value="both"
            control={<Radio style={{ color: "black" }} />}
            label="Round Trip"
          />
        </RadioGroup>
        <Autocomplete
          value={source}
          onChange={(event, newValue) => {
            setSource(newValue);
          }}
          getOptionLabel={(option) => option.name}
          options={filteredSources}
          style={{ width: 300, padding: "8px" }}
          renderInput={(params) => (
            <TextField {...params} label="Source City" variant="outlined" />
          )}
        />
        <Autocomplete
          value={dest}
          onChange={(event, newValue) => {
            setDest(newValue);
          }}
          getOptionLabel={(option) => option.name}
          options={filteredDestinations}
          style={{ width: 300, padding: "8px" }}
          renderInput={(params) => (
            <TextField {...params} label="Destination City" variant="outlined" />
          )}
        />
        <TextField
          label="Journey Date"
          type="date"
          value={deptDate}
          onChange={handleDeparture}
          variant="outlined"
          style={{ width: 300, padding: "8px" }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: getCurrentDate(),
          }}
        />
        {selectTrip?.toUpperCase() === "BOTH" && (
          <TextField
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={handleReturn}
            variant="outlined"
            style={{ width: 300, padding: "8px" }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: deptDate,
            }}
          />
        )}
        <div className={classes.centerButton}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: 4,
              marginRight: 8, // Add margin to the right for spacing
            }}
            className={classes.filterContainer}
            onClick={handleSearchFlight}
            disabled={validateSearch(
              source,
              dest,
              deptDate,
              returnDate,
              selectTrip
            )}
          >
            {`Search Flight`}
          </Button>
          <Button
            variant="contained"
            onClick={handleClearFields}
            className={classes.clearButton}
          >
            Clear Fields
          </Button>
        </div>
        {cityError && (
          <Typography variant="body1" color="error">
            {`Source and Destination City cannot be the same`}
          </Typography>
        )}
        {searchDone && (
          <FlightListOneWay flightList={flightList} bookNow={handleBookNow} />
        )}
      </Grid>
    </Paper>
  );
};

FlightSearch.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  flightList: PropTypes.object,
};

export default FlightSearch;
