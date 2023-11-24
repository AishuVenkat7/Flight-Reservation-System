import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button } from "@material-ui/core";
import CustomAlert from '../../components/custom-alert';
import { useUserInfoSession } from "../../components/header/user-context";
import SeatBookingServices from "../../services/seat-booking-services";

import './payment.css';

const seatPrice = Math.floor(Math.random() * 101);

function Payment() {
  const history = useHistory();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [name, setName] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [nameError, setNameError] = useState('');
  const [cvvError, setCVVError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const { userInfoSession, appendToUserInfoSession } = useUserInfoSession();
  const basePrice = userInfoSession.amountToBePaid;
  const totalAmount = basePrice + seatPrice;
  // const location = useLocation();

  const handlePayment = async (event) => {
    event.preventDefault();

    const cardNumberPattern = /^\d{16}$/;
    const namePattern = /^[A-Za-z\s]+$/;
    const cvvPattern = /^\d{3}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const sanitizedCardNumber = cardNumber.replace(/\s/g, '');

    let cardNumberError = '';
    if (!cardNumberPattern.test(sanitizedCardNumber)) {
      cardNumberError = 'Invalid card number';
    }

    let nameError = '';
    if (!namePattern.test(name)) {
      nameError = 'Invalid name';
    }

    let cvvError = '';
    if (!cvvPattern.test(cvv)) {
      cvvError = 'Invalid CVV';
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const [inputMonth, inputYear] = expiry.split('/');

    let expiryError = '';
    if (!expiryPattern.test(expiry)) {
      expiryError = 'Invalid expiry date (MM/YY)';
    } else if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      expiryError = 'Expiry date must be in the future';
    }

    setCardNumberError(cardNumberError);
    setNameError(nameError);
    setCVVError(cvvError);
    setExpiryError(expiryError);

    if (cardNumberError || nameError || cvvError || expiryError) {
      setPaymentSuccess(false);
      return false;
    }

    const getClassFromSeatNumber = (seatNumber) => {
      if (seatNumber && seatNumber.startsWith) { // Check if seatNumber is defined and has a startsWith method
        if (seatNumber.startsWith('F')) {
          return 'First Class';
        } else if (seatNumber.startsWith('B')) {
          return 'Business Class';
        } else if (seatNumber.startsWith('E')) {
          return 'Economy Class';
        }
      }
      return 'Unknown Class';
    };

    const fetchReservationResponse = async () => {
      const reservationResponse = await SeatBookingServices.createReservation(
        userInfoSession.selectedFlightNumber, 
        userInfoSession.userId, 
        userInfoSession.selectedSeat, 
        userInfoSession.amountToBePaid
        );
        console.log('Seat reservation info from Backend: ', reservationResponse);
        if (reservationResponse.bookingId) {
          setPaymentSuccess(true);
        } else {
          setPaymentError(true);
        }
    }
    fetchReservationResponse();
    appendToUserInfoSession({
      seatPrice: seatPrice,
    })
  };

  const getClassFromSeatNumber = (seatNumber) => {
    if (seatNumber && seatNumber.startsWith) { // Check if seatNumber is defined and has a startsWith method
      if (seatNumber.startsWith('F')) {
        return 'First Class';
      } else if (seatNumber.startsWith('B')) {
        return 'Business Class';
      } else if (seatNumber.startsWith('E')) {
        return 'Economy Class';
      }
    }
    return 'Unknown Class';
  };
  
  const handleAlertClose = () => {
    setPaymentSuccess(false);
    if (paymentSuccess) {
      history.push('/confirmation');
    }
  };

  const cardNumberErrorMessage = cardNumberError ? (
    <div className="error-message" style={{ color: 'red' }}>{cardNumberError}</div>
  ) : null;
  const nameErrorMessage = nameError ? (
    <div className="error-message" style={{ color: 'red' }}>{nameError}</div>
  ) : null;
  const cvvErrorMessage = cvvError ? (
    <div className="error-message" style={{ color: 'red' }}>{cvvError}</div>
  ) : null;
  const expiryErrorMessage = expiryError ? (
    <div className="error-message" style={{ color: 'red' }}>{expiryError}</div>
  ) : null;

  return (
    <div>
      <div className="flight-details-container">
        <h2>Cost Breakdown</h2>
        <table>
          <tbody>
            <tr>
              <td>Ticket Fare (Inclusive of all Taxes)</td>
              <td>₹{basePrice}</td>
            </tr>
            <tr>
              <td>Seat Selection Price</td>
              <td>
                ₹{seatPrice}
              </td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>₹{totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card p-3">
              <div className="card-body border p-0">
                <div className="collapse show p-3 pt-0">
                  <div className="row">
                    <div className="col-12">
                      <form action="" className="form">
                        <div className="row">
                          <div className="col-12">
                            <div className="form__div">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const sanitizedInput = inputValue.replace(/\D/g, '').substring(0, 16);
                                  const formattedInput = sanitizedInput.replace(/(\d{4})/g, '$1 ').trim();
                                  setCardNumber(formattedInput);
                                  setCardNumberError('');
                                }}
                              />
                              {cardNumberErrorMessage}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="form__div" style={{ display: 'flex' }}>
                              <div style={{ flex: 1, marginRight: '10px' }}>
                                <div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="MM / YY"
                                    value={expiry}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      const sanitizedInput = inputValue.replace(/\D/g, '').substring(0, 4);
                                      const formattedInput = sanitizedInput.replace(/(\d{2})(\d{0,2})/, '$1/$2');
                                      const [inputMonth, inputYear] = formattedInput.split('/');
                                      const isValidMonth = inputMonth >= '01' && inputMonth <= '12';
                                      const isValidYear = inputYear >= '23' && inputYear <= '28';
                                      setExpiry(formattedInput);
                                      setExpiryError(
                                        !isValidMonth || !isValidYear
                                          ? 'Invalid expiry date (MM / YY)'
                                          : ''
                                      );
                                    }}
                                  />
                                </div>
                                {expiryErrorMessage}
                              </div>

                              <div style={{ flex: 1 }}>
                                <div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      const sanitizedInput = inputValue.replace(/\D/g, '').substring(0, 3);
                                      setCVV(sanitizedInput);
                                      setCVVError(
                                        sanitizedInput.length !== 3
                                          ? 'CVV must be a 3-digit number'
                                          : ''
                                      );
                                    }}
                                  />
                                </div>
                                {cvvErrorMessage}
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form__div">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Firstname Lastname"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                  setNameError('');
                                }}
                              />
                              {nameErrorMessage}
                            </div>
                          </div>

                          <div style={{ marginBottom: '20px' }}></div>
                          <div className="col-12">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Button
                                style={{ backgroundColor: '#000', color: '#fff', flex: 1, marginRight: '5px' }}
                                onClick={handlePayment}
                              >
                                Confirm Payment
                              </Button>
                              <Button
                                style={{ backgroundColor: '#ccc', color: '#000', flex: 1, marginLeft: '5px' }}
                                onClick={() => {
                                  setCardNumber('1234 5678 9098 7654');
                                  setExpiry('12/24');
                                  setCVV('123');
                                  setName('Chai');
                                  setCardNumberError('');
                                  setNameError('');
                                  setCVVError('');
                                  setExpiryError('');
                                }}
                              >
                                Clear Selection
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomAlert
        title="Payment Successful"
        message="Your payment was successful!"
        open={paymentSuccess}
        onClose={handleAlertClose}
      />
        <CustomAlert
        title="Payment Failed! Please Retry"
        message="Your payment was denied please retry or use different card!"
        open={paymentError}
        onClose={handlePayment}
      />
    </div>
  );
}

export default Payment;
