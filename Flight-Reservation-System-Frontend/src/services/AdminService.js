import axios from "axios";

const BOOKING_API_BASE_URL = "http://localhost:8080/adminControl";

class AdminService {
  saveFlightDetails(admin, flightobj) {
    return axios.post(BOOKING_API_BASE_URL + "/saveflight/" + admin, flightobj);
  }

  getAllFlightsDetails(admin=1) {
    return axios.get(BOOKING_API_BASE_URL + "/getAllFlights/" + admin);
  }

  updateFlightsDetailsAsAdmin(admin, flightNumber, flightobj) {
    console.log(flightobj)
    return axios.put(
      BOOKING_API_BASE_URL + "/updateFlight/" + admin + "/" + flightNumber,
      flightobj
    );
  }

  DeleteFlightDetails(admin=0, flightNumber, flightobj) {
    return axios.delete(
      BOOKING_API_BASE_URL + "/deleteFlight/" + admin + "/" + flightNumber,
      {data: flightobj}
    );
  }

  getAllReservation(flightNumber) {
    return axios.get(
      BOOKING_API_BASE_URL + "/viewAllReservation/" + flightNumber
    );
  }
}

export default new AdminService();