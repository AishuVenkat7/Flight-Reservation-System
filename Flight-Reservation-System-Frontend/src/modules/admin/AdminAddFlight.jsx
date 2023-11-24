import { Save } from '@material-ui/icons';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogTitle
  } from "@material-ui/core";
import React, { useState } from 'react';
import AdminService from "../../services/AdminService";
import "./admin.css";

const AdminAddFlight = (props) => {
    const [formData, setFormData] = useState({
        flightNumber:"",
        departure:"",
        arrival:"",
        departureDate:"",
        departureTime: "",
        arrivalDate:"",
        arrivalTime:"",
        seatAvailability:""
      });
    const [flightIds, setFormIds] = useState("")
    if (flightIds == "") {
      AdminService.getAllFlightsDetails().then(
        (ret) => {
          var arr = []
          ret.data.forEach(element => {
            arr.push(element.flightNumber)
          });
          setFormIds(arr)
        }
      )
    }
    const [navigateBack, setNavigateBack] = useState(false)
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleDialogBoxOpen = () => {
      setOpen(true);
    };
  
    const handleDialogBoxClose = (value) => {
      setOpen(false);
      if (navigateBack) {
        props.history.push({pathname:`/admin`})
      }
    };
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    const handleSaveClick = () =>{
        // check if any data is empty
        for (const [key, value] of Object.entries(formData)){
          if (value == "") {
            console.log("empty fields!")
            setSelectedValue("Empty fields are not allowed!")
            setNavigateBack(false)
            handleDialogBoxOpen()
            return
          }
        }

        // check flight number existance
        if (flightIds.includes(formData.flightNumber)) {
          setSelectedValue("Flight: "+ formData.flightNumber + " already exists!")
          setNavigateBack(false)
          handleDialogBoxOpen()
          return
        }

        // check that arrival and departure are not same
        if (formData.arrival == formData.departure) {
          setSelectedValue("Arrival and departure cities cannot be same!")
          setNavigateBack(false)
          handleDialogBoxOpen()
          return
        }

        AdminService.saveFlightDetails(1, formData ).then((ret)=>{
            if(ret.data.includes("successfully")){
                //alert("Flight details Added successfully");
                //props.history.push({pathname:`/admin`});
                setSelectedValue("Flight details added successfully")
                setNavigateBack(true)
                handleDialogBoxOpen()
            } else {
              setNavigateBack(false)
              setSelectedValue(ret.data)
              handleDialogBoxOpen()
            }
        })
    }
    return (
        <div style={{ display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        margin: 'auto',
        padding: '3px',
        border: '1px solid #ccc',
        //borderRadius: theme.shape.borderRadius,
        //boxShadow: theme.shadows[3]
        }}>
        <h2>Add Flight Information</h2>
   
        <form style ={{width: '70%',
          marginTop: '15px'}}
        >
            <TextField
            label="Flight Number"
            variant="outlined"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
             <TextField
                label="Departure"
                variant="outlined"
                name="departure"
                value={formData.departure}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Arrival"
                variant="outlined"
                name="arrival"
                value={formData.arrival}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
          <TextField
                label="Departure Date"
                variant="outlined"
                name="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputProps={{ min: new Date().toISOString().split('T')[0]}}
                InputLabelProps={{
                    shrink: true,
                  }}
            />
          <TextField
                label="Departure Time"
                variant="outlined"
                name="departureTime"
                type="time"
                placeholder='HH:MM'
                value={formData.departureTime}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
              <TextField
                label="Arrival Date"
                variant="outlined"
                name="arrivalDate"
                placeholder='DD/MM/YYYY'
                type="date"
                inputProps={{ min: new Date().toISOString().split('T')[0]}}
                value={formData.arrivalDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Arrival Time"
                variant="outlined"
                name="arrivalTime"
                type="time"
                placeholder='HH:MM'
                value={formData.arrivalTime}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
             <TextField
                label="Seat Availability"
                variant="outlined"
                name="seatAvailability"
                value={formData.seatAvailability}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
          {/* Add other form fields as needed */}
  
          <Button className="black-button"
              variant="contained"
              color="primary"
              startIcon = {<Save>Save</Save>}
              onClick={(e) => handleSaveClick()}
            >
            </Button>
        </form>
        <Dialog
        open={open}
        onClose={handleDialogBoxClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {selectedValue}
          </DialogTitle>
          <DialogActions alignItems="center">
            <Button className="black-button" onClick={handleDialogBoxClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default AdminAddFlight;