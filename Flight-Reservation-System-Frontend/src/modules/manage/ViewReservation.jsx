import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogContentText,
} from "@material-ui/core"; 
import ManageReservationService from "../../services/ManageReservationService";
import BookingService from "../../services/BookingService";
import "./view-reservation.css";

const ViewReservation = (props) => {
  const { bookingId } = useParams();
  const { userId } = useParams();
  const [bookingDetail, setBookingDetail] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [flightNumber, setFlightNumber] = useState();
  const [seats, setSeatDetails] = useState();
  const [originalSeatDetails, setOriginalSeatDetails] = useState();
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState({
    firstName: bookingDetail?.passenger.firstName || "",
    lastName: bookingDetail?.passenger.lastName || "",
    emailId: bookingDetail?.passenger.emailId || "",
  });

  const [paymentConfirmationOpen, setPaymentConfirmationOpen] = useState(false);
  const [paymentText, setPaymentText] = useState();

  const fetchData = () => {
    ManageReservationService.getOneReservation(bookingId, userId).then(
      (res) => {
        console.log(res.data);
        setBookingDetail(res.data);
        setFlightNumber(res.data.passenger.flightDetails[0].flightNumber);
        setOriginalSeatDetails(res.data.passenger.flightDetails[0].seat);
        setEditedFields(
          res.data.passenger.firstName,
          res.data.passenger.lastName,
          res.data.passenger.emailId
        );
      }
    );
  };

  useEffect(() => {
    console.log("view")
    fetchData();
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setEditedFields({
      ...editedFields,
      [fieldName]: value,
    });
  };

  const handleEdit = () => {
    BookingService.getAllSeatsFromAFlight(flightNumber).then((res) => {
      setSeatDetails(res.data);
      setEditMode(true);
      setShowSaveCancel(true);
    });
  };

  const handleRedirect = () => {
    props.history.push(`/manage`);
  };

  const handleAddSeat = (seatNumber, seatClass, price) => {
    const updatedBookingDetail = {
      ...bookingDetail,
      passenger: {
        ...bookingDetail.passenger,
        flightDetails: [
          {
            ...bookingDetail.passenger.flightDetails[0],
            seat: {
              seatNumber: seatNumber,
              seatClass: seatClass,
              price: price,
            },
          },
        ],
        payment: [
          {
            paymentId: bookingDetail.passenger.payment[0].paymentId,
            totalTravelFair: price,
          },
        ],
      },
    };

    setBookingDetail(updatedBookingDetail);
  };

  const handleCancelChanges = () => {
    handleAddSeat(
      originalSeatDetails.seatNumber,
      originalSeatDetails.seatClass,
      originalSeatDetails.price
    );
    setEditMode(false);
    setShowSaveCancel(false);
  };

  const handleSave = () => {
    setEditMode(false);
    setShowSaveCancel(false);
    try {
      const updatedReservation = {
        bookingId: bookingDetail.bookingId,
        arrival: bookingDetail.arrival,
        passenger: {
          userId: bookingDetail.passenger.userId,
          emailId: editedFields.emailId
            ? editedFields.emailId
            : bookingDetail.passenger.emailId,
          admin: 0,
          firstName: editedFields.firstName
            ? editedFields.firstName
            : bookingDetail.passenger.firstName,
          lastName: editedFields.lastName
            ? editedFields.lastName
            : bookingDetail.passenger.lastName,
          phoneNumber: bookingDetail.passenger.phoneNumber,
          flightDetails: [
            {
              flightNumber:
                bookingDetail.passenger.flightDetails[0].flightNumber,
              departure: bookingDetail.departure,
              arrival: bookingDetail.arrival,
              departureDate:
                bookingDetail.passenger.flightDetails[0].departureDate,
              arrivalDate: bookingDetail.passenger.flightDetails[0].arrivalDate,
              departureTime:
                bookingDetail.passenger.flightDetails[0].departureTime,
              arrivalTime: bookingDetail.passenger.flightDetails[0].arrivalTime,
              seatAvailability:
                bookingDetail.passenger.flightDetails[0].seatAvailability,
              seat: {
                seatNumber:
                  bookingDetail.passenger.flightDetails[0].seat.seatNumber,
                seatClass:
                  bookingDetail.passenger.flightDetails[0].seat.seatClass,
                price: bookingDetail.passenger.flightDetails[0].seat.price,
                booked: true,
              },
            },
          ],
          payment: [
            {
              paymentId: bookingDetail.passenger.payment[0].paymentId,
              totalTravelFair:
                bookingDetail.passenger.flightDetails[0].seat.price,
              flightNumber:
                bookingDetail.passenger.flightDetails[0].flightNumber,
            },
          ],
        },
        flightNumber: bookingDetail.passenger.flightDetails[0].flightNumber,
        departure: bookingDetail.departure,
      };
      console.log(
        "updated reservation=> " + JSON.stringify(updatedReservation)
      );

      ManageReservationService.updateReservation(
        bookingId,
        userId,
        updatedReservation
      ).then((res) => {
        console.log("update reservation", res.data);
        setBookingDetail(res.data);
      });

      if (
        originalSeatDetails.price >
        bookingDetail.passenger.flightDetails[0].seat.price
      ) {
        setPaymentText("Remaining balance will be credited to your account");
      } else if (
        originalSeatDetails.price <
        bookingDetail.passenger.flightDetails[0].seat.price
      ) {
        setPaymentText("Remaining balance will be debited from your account");
      } else {
        setPaymentText("All changes are saved!");
      }

      setPaymentConfirmationOpen(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleCloseDialog = () => {
    setPaymentConfirmationOpen(false);
  };
  
  const handleConfirmDelete = (bookingId, userId) => {
    try {
      ManageReservationService.deleteReservation(bookingId, userId).then(
        (res) => {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            props.history.push(`/manage`);
          }, 1000);
          setShowConfirmation(false);
        }
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <Grid container spacing={2}>
      {bookingDetail && (
        <Grid item xs={12}>
          <Paper style={{ padding: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Typography variant="h3">Booking Details</Typography>
          </div>
            <Divider style={{ margin: "10px 0" }} />
            <div className="confirmation-container">
  <table className="confirmation-table">
    <tbody>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Booking ID</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.bookingId}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Flight Number</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.flightNumber}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Departure</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.departure}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Arrival</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.arrival}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Departure date</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.passenger.flightDetails[0].departureDate}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Departure time</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.passenger.flightDetails[0].departureTime}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Arrival date</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.passenger.flightDetails[0].arrivalDate}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Arrival time</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.passenger.flightDetails[0].arrivalTime}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Email</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {editMode ? (
            <input
            type="text"
            value={editedFields.emailId}
            onChange={(e) => handleFieldChange("emailId", e.target.value)}
            defaultValue={bookingDetail.passenger.emailId}
            style={{ fontSize: "14px", width: "350px", height: "30px" }}
          />               
          ) : (
            bookingDetail.passenger.emailId
          )}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>First Name</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {editMode ? (
            <input
              type="text"
              value={editedFields.firstName}
              onChange={(e) => handleFieldChange("firstName", e.target.value)}
              defaultValue={bookingDetail.passenger.firstName}
              style={{ fontSize: "14px", width: "350px", height: "30px" }}
            />
          ) : (
            bookingDetail.passenger.firstName
          )}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Last Name</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {editMode ? (
            <input
              type="text"
              value={editedFields.lastName}
              onChange={(e) => handleFieldChange("lastName", e.target.value)}
              defaultValue={bookingDetail.passenger.lastName}
              style={{ fontSize: "14px", width: "350px", height: "30px" }}
            />
          ) : (
            bookingDetail.passenger.lastName
          )}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Seat Number</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.passenger.flightDetails[0].seat.seatNumber}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Seat Class</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.passenger.flightDetails[0].seat.seatClass}
        </td>
      </tr>
      <tr className="confirmation-table-row">
        <td className="confirmation-table-header first-column">
          <strong>Total Travel Fare</strong>
        </td>
        <td className="confirmation-table-header second-column">
          {bookingDetail.passenger.payment[0].totalTravelFair}
        </td>
      </tr>
    </tbody>
  </table>
  <Divider style={{ margin: "10px 0" }} />
</div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="black"
                className="action-button"
                onClick={handleRedirect}
                style={{ 
                  backgroundColor: "black", color: "white",
                  marginRight: "10px",
                  display: showSaveCancel ? "none" : "block",
                }}
              >
                Back to reservations
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                onClick={handleEdit}
                style={{
                  backgroundColor: "black", color: "white",
                  marginRight: "10px",
                  display: showSaveCancel ? "none" : "block",
                }}
              >
                Edit Reservation
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                onClick={handleSave}
                style={{
                  backgroundColor: "black", color: "white",
                  marginRight: "10px",
                  display: showSaveCancel ? "block" : "none",
                }}
              >
                Save changes
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                onClick={handleCancelChanges}
                style={{
                  backgroundColor: "black", color: "white",
                  marginRight: "10px",
                  display: showSaveCancel ? "block" : "none",
                }}
              >
                Cancel Changes
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={handleDelete}
              >
                Delete Reservation
              </Button>
            </div>

            <Divider style={{ margin: "10px 0" }} />
            {editMode && (
              <>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <br/><br/><br/>
                <Typography variant="h4">Upgrade Seats</Typography>
              </div>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ backgroundColor: "black", color: "white"  }}>
                          Seat Number
                        </TableCell>
                        <TableCell style={{ backgroundColor: "black", color: "white"  }}>
                          Seat Class
                        </TableCell>
                        <TableCell style={{ backgroundColor: "black", color: "white"  }}>
                          Seat Price
                        </TableCell>
                        <TableCell style={{ backgroundColor: "black", color: "white"  }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {seats
                        .filter((seat) => !seat.booked)
                        .map((seat, index) => (
                          <TableRow key={index}>
                            <TableCell>{seat.seatNumber}</TableCell>
                            <TableCell>{seat.seatClass}</TableCell>
                            <TableCell>{seat.price}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: "black", color: "white" }}
                                onClick={() =>
                                  handleAddSeat(
                                    seat.seatNumber,
                                    seat.seatClass,
                                    seat.price
                                  )
                                }
                              >
                                Add Seat
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Paper>
        </Grid>
      )}

      <Dialog
        open={showConfirmation}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="alert-title" id="alert-dialog-title">{" Confirm Delete "}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this reservation?
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
        <Button
          style={{ backgroundColor: "black", color: "white" }}
          onClick={() =>
            handleConfirmDelete(
              bookingDetail.bookingId,
              bookingDetail.passenger.userId
            )
          }
          color="primary"
          autoFocus
        >
          Yes
        </Button>
        <Button
          onClick={handleCancelDelete}
          color="primary"
          style={{ backgroundColor: "black", color: "white" }}
        >
          No
        </Button>
      </DialogActions>
      </Dialog>
      
      <Dialog
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="alert-title" id="alert-dialog-title">{" Success "}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Reservation deleted successfully!
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button 
          style={{ backgroundColor: "black", color: "white" }}
          onClick={() => setShowSuccessMessage(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/*  */}

      <Dialog
        open={paymentConfirmationOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="alert-title" id="alert-dialog-title">
          {"Changes Updated"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {paymentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button style={{ backgroundColor: "black", color: "white" }} onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ViewReservation;
