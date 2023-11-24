import axios from "axios";

const BOOKING_API_BASE_URL = "http://localhost:8080/booking";

class BookingService {
  getFlightByArrivalAndDeparture(departure, arrival, departureDate) {
    return axios.get(
      BOOKING_API_BASE_URL +
        "/getFlightsOnArrivalAndDeparture/" +
        departure +
        "/" +
        arrival +
        "/" +
        departureDate
    );
  }

  getAllSeatsFromAFlight(flightNumber) {
    return axios.get(BOOKING_API_BASE_URL + "/getAllSeats/" + flightNumber);
  }

  bookFlightForAPassenger(userId, flightDetails) {
    return axios.post(
      BOOKING_API_BASE_URL + "/bookFlights/" + userId,
      flightDetails
    );
  }

  bookSeatForAPassenger(flightNumber, userId, seat) {
    return axios.post(
      BOOKING_API_BASE_URL + "/bookSeats/" + flightNumber + "/" + userId,
      seat
    );
  }
}

export default new BookingService();
