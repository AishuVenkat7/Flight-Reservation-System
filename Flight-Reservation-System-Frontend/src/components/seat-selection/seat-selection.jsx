import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useUserInfoSession } from '../header/user-context';
import SeatBookingServices from '../../services/seat-booking-services';
import './seat-selection.css';

const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectPayment, setSelectPayment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [amountToBePaid, setAmountToBePaid] = useState(0);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [allSeats, setAllSeats] = useState([]);
  const [seatPrices, setSeatPrices] = useState({});

  const history = useHistory();
  const isEconomyClass = (seat) => getClassFromSeatNumber(seat.seatNumber) === 'Economy Class';

  const { userInfoSession, appendToUserInfoSession } = useUserInfoSession();

  useEffect(() => {
    const seatsInformation = async () => {
      const data = await SeatBookingServices.getAllSeats(
        userInfoSession.selectedFlightNumber
      );

      const availableSeats = data.filter((seat) => seat.passengerId === -1);
      const bookedSeats = data.filter((seat) => seat.passengerId !== -1);

      setAvailableSeats(availableSeats);
      setAllSeats([...availableSeats, ...bookedSeats]); // Combine both available and booked seats
      setSeatPrices(generateSeatPrices(availableSeats));
    };
    seatsInformation();
  }, [userInfoSession.selectedFlightNumber]);

  const generateSeatPrices = (seats) => {
    const prices = {};
    seats.forEach((seat) => {
      prices[seat.seatNumber] =
        seat.price + Math.floor(Math.random() * 399) - 199;
    });
    return prices;
  };

  const extractNumericPart = (seatNumber) => {
    const numericPart = seatNumber.replace(/^\D+/g, '');
    return parseInt(numericPart, 10);
  };

  const handleSeatClick = (seatNumber, seatClass) => {
    setSelectedSeat((prevSeat) =>
      prevSeat === seatNumber ? null : seatNumber
    );
    setSelectedClass(seatClass);

  };

  const handlePayment = () => {
    if (
      selectedSeat &&
      availableSeats.map((seat) => seat.seatNumber).includes(selectedSeat)
    ) {
      const fetchBookInformation = async () => {
        const data = await SeatBookingServices.bookSeats(
          userInfoSession.selectedFlightNumber,
          userInfoSession.userId,
          selectedSeat,
          selectedClass,
          seatPrices[selectedSeat]
        );
        console.log('Seat booking info from Backend: ', data);
      };
      fetchBookInformation();

      setAmountToBePaid(seatPrices[selectedSeat]);
      setSelectPayment(true);
      appendToUserInfoSession(
        {
            selectedSeat: selectedSeat,
            selectedClass: selectedClass,
            amountToBePaid: seatPrices[selectedSeat],
        }
      );
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (selectPayment) {
      history.push('/payment', { selectedSeat, amountToBePaid });
    }
  }, [selectPayment, history, selectedSeat, amountToBePaid]);

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const isSeatBooked = (seat) => seat && seat.passengerId !== -1;

  const getClassFromSeatNumber = (seatNumber) => {
    if (seatNumber.startsWith('F')) {
      return 'First Class';
    } else if (seatNumber.startsWith('B')) {
      return 'Business Class';
    } else if (seatNumber.startsWith('E')) {
      return 'Economy Class';
    }
    return 'Unknown Class';
  };

  const sortedClasses = ['First Class', 'Business Class', 'Economy Class'];

  return (
    <div className="seat-selection-container">
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
        Select Your Seat
      </h2>
      <div className="container">
        {sortedClasses.map((classType) => (
          <div
            key={classType}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            <h3>{classType}</h3>
            <div className="seat-row">
              {allSeats
                .filter(
                  (seat) => getClassFromSeatNumber(seat.seatNumber) === classType
                )
                .sort((a, b) =>
                  extractNumericPart(a.seatNumber) -
                  extractNumericPart(b.seatNumber)
                )
                .reduce((rows, seat, index) => {
                  const rowIndex = Math.floor(index / (classType === 'Economy Class' ? 4 : 3));
                  if (!rows[rowIndex]) {
                    rows[rowIndex] = [];
                  }
                  rows[rowIndex].push(seat);
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <div key={rowIndex} className={`seat-${classType.toLowerCase()}-row`}>
                    {row.map((seat) => (
                      <div
                        key={seat.seatNumber}
                        className={`seat ${
                          selectedSeat === seat.seatNumber ? 'selected' : ''
                        } ${isSeatBooked(seat) ? 'booked' : ''}`}
                        onClick={() =>
                          handleSeatClick(seat.seatNumber, seat.seatClass)
                        }
                      >
                        {seat.seatNumber}
                        <br />
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="selected-seats">
        <p>{`Selected Seat: ${selectedSeat || 'None'}`}</p>
        {selectedSeat && (
          <p>{`Cost: ₹${seatPrices[selectedSeat]}`}</p>
        )}
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ backgroundColor: '#000', color: '#fff' }}
          onClick={handlePayment}
        >
          Confirm Seat
        </Button>
        <Button
          style={{ backgroundColor: '#ccc', color: '#000', marginLeft: '10px' }}
          onClick={() => {
            setSelectedSeat(null);
            setSelectedClass(null);
            setAmountToBePaid(0);
          }}
        >
          Clear Selection
        </Button>
      </div>
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>
          <ErrorOutline />
          Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSeatBooked(selectedSeat)
              ? 'This seat is already booked'
              : 'Please select a seat before confirming'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModalClose}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SeatSelection;