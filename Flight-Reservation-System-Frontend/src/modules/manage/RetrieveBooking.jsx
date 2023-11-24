import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";

import ManageReservationService from "../../services/ManageReservationService";
import { useUserInfoSession } from "../../components/header/user-context";

const RetrieveBooking = (props) => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const { userInfoSession } = useUserInfoSession();

  const fetchAllReservationsForUser = () => {
    ManageReservationService.getAllReservation(
      userInfoSession.userId
    ).then((res) => {
      setBookingDetails(res.data);
    });
  };

  // On Page Load
  useEffect(() => {
    fetchAllReservationsForUser();
  }, []);

  const handleView = (bookingId, userId) => {
    props.history.push(`/view-reservation/${bookingId}/${userId}`);
  };

  return (
    <Grid container spacing={2}>
      {bookingDetails && (
        <Grid item xs={12}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Typography variant="h5">Booking Details</Typography>
          </div>
          <TableContainer style={{ borderRadius: 10 }} component={Paper} >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "50px", backgroundColor: "black", color: "white" }}>Booking ID</TableCell>
                  <TableCell style={{ width: "50px", backgroundColor: "black", color: "white" }}>Departure</TableCell>
                  <TableCell style={{ width: "80px", backgroundColor: "black", color: "white" }}>Arrival</TableCell>
                  <TableCell style={{ width: "100px", backgroundColor: "black", color: "white" }}>Departure Date and Time</TableCell>
                  <TableCell style={{ width: "100px", backgroundColor: "black", color: "white" }}>Arrival Date and Time</TableCell>
                  <TableCell style={{ width: "50px", backgroundColor: "black", color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingDetails.map((booking) => (
                  <TableRow key={booking.bookingId}>
                    <TableCell>{booking.bookingId}</TableCell>
                    <TableCell>{booking.departure}</TableCell>
                    <TableCell>{booking.arrival}</TableCell>
                    <TableCell>
                      {booking.passenger.flightDetails[0].departureDate} {booking.passenger.flightDetails[0].departureTime}
                    </TableCell>
                    <TableCell>
                      {booking.passenger.flightDetails[0].arrivalDate} {booking.passenger.flightDetails[0].arrivalTime}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "black", color: "white" }}
                        className="action-button"
                        onClick={() =>
                          handleView(
                            booking.bookingId,
                            booking.passenger.userId
                          )
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default RetrieveBooking;
