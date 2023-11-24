import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import "./confirmation.css"; // Import the CSS file
import {useUserInfoSession} from "../../components/header/user-context";

const Confirmation = () => {
  const history = useHistory();

  // Retrieve user information from the session
  const {userInfoSession} = useUserInfoSession();
  console.log("confirmation ss:", userInfoSession);
  const firstName = userInfoSession.given_name;
  const lastName = userInfoSession.family_name;
  const emailAddress = userInfoSession.email;
  const selectedSeat = userInfoSession.selectedSeat;
  const basePrice = userInfoSession.amountToBePaid;
  const seatPrice = userInfoSession.seatPrice;
  const totalAmount = basePrice + seatPrice;
  const flightName = userInfoSession.selectedFlightNumber;
  const departureCity = userInfoSession.departureCity;
  const arrivalCity = userInfoSession.arrivalCity;
  const departureDate = userInfoSession.departureDate;
  const departureTime = userInfoSession.departureTime;
  const arrivalDate = userInfoSession.arrivalDate;
  const arrivalTime = userInfoSession.arrivalTime;

  return (
    <div className="confirmation-container">
      <Typography variant="h5" color="black">
        Your flight is now set for an unforgettable journey with Bon Voyage Flights. 
      </Typography>
      <br/>
      <Typography variant="h6" color="black">
      We are thrilled to confirm your booking. Here are the enchanting details of your adventure: ✈️✨
      </Typography>
      <br/>
      <br/>
      <table className="confirmation-table">
        <tbody>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Passenger Full Name</td>
            <td className="confirmation-table-data second-column">{firstName} {lastName}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Email Address</td>
            <td className="confirmation-table-data second-column">{emailAddress}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Flight Name</td>
            <td className="confirmation-table-data second-column">{flightName}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Departure City</td>
            <td className="confirmation-table-data second-column">{departureCity}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Arrival City</td>
            <td className="confirmation-table-data second-column">{arrivalCity}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Departure Date and Time</td>
            <td className="confirmation-table-data second-column">{departureDate} {departureTime}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Arrival Date and Time</td>
            <td className="confirmation-table-data second-column">{arrivalDate} {arrivalTime}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Selected Seat</td>
            <td className="confirmation-table-data second-column">{selectedSeat}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Ticket Fare (Inclusive of all Taxes)</td>
            <td className="confirmation-table-data second-column">₹{basePrice}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Seat Selection Price</td>
            <td className="confirmation-table-data second-column">₹{seatPrice}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Total Amount</td>
            <td className="confirmation-table-data second-column">₹{totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <Button
        variant="contained"
        className="confirmation-button"
        onClick={() => history.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

Confirmation.propTypes = {
  history: PropTypes.object,
};

export default Confirmation;
