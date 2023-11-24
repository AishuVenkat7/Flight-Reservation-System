import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

import { Typography, Button, TextField } from "@material-ui/core";

const Dashboard = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    history.push(`/flight-search?query=${searchQuery}`);
  };

  return (
    <div>
      <Typography variant="h5">{`Welcome to BonVoyage`}</Typography>
      <div>
        <TextField
          label="Search Flights"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSearch}
        >{`Search Flights`}</Button>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object,
};

export default Dashboard;
