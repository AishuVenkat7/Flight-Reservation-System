import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  textarea: {
    width: "100%",
    height: "300px",
    marginBottom: theme.spacing(2),
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "black",
    color: "white",
    margin: '0 auto', // Center-justify the button
  },
}));

const CenteredForm = () => {
  const classes = useStyles();
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <form onSubmit={handleSubmit} style={{ width: '60%' }}>
        <FormControl className={classes.formControl}>
          <InputLabel id="issue-label">Issue*</InputLabel>
          <Select
            labelId="issue-label"
            id="issue"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            required
          >
            <MenuItem value="booking">Booking Issue</MenuItem>
            <MenuItem value="cancel">Cancel Issue</MenuItem>
            <MenuItem value="refund">Refund Issue</MenuItem>
            <MenuItem value="airline">Airline Service Issue</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>

        <TextareaAutosize
          id="description"
          className={classes.textarea}
          placeholder="Description*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rowsMin={9}
          required
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CenteredForm;
