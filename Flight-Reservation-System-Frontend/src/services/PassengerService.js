import axios from "axios";

const PASSENGER_API_BASE_URL = "http://localhost:8080/passenger";

class PassengerService {
  savePassengerDetails(passenger) {
    return axios.post(PASSENGER_API_BASE_URL + "/savePassenger", passenger);
  }

  getPassengerDetails(emailId, lastName) {
    return axios.get(
      PASSENGER_API_BASE_URL + "/getPassenger/" + emailId + "/" + lastName
    );
  }

  getPassengerDetailsById(userId) {
    return axios.get(PASSENGER_API_BASE_URL + "/getPassenger/" + userId);
  }
}

export default new PassengerService();
