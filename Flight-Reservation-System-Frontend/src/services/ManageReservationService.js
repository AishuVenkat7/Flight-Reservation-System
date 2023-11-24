import axios from "axios";

const MANAGE_RESERVATION_API_BASE_URL = "http://localhost:8080/manageBooking";

class ManageReservationService {
  getAllReservation(userId) {
    return axios.get(
      MANAGE_RESERVATION_API_BASE_URL + "/viewAllReservation/" + userId
    );
  }

  getAllReservationBasedOnEmail(lastName, emailId) {
    return axios.get(
      MANAGE_RESERVATION_API_BASE_URL +
        "/viewAllReservation/" +
        lastName +
        "/" +
        emailId
    );
  }

  getOneReservation(bookingId, userId) {
    return axios.get(
      MANAGE_RESERVATION_API_BASE_URL +
        "/viewSingleReservation/" +
        bookingId +
        "/" +
        userId
    );
  }

  updateReservation(bookingId, userId, updatedReservation) {
    return axios.put(
      MANAGE_RESERVATION_API_BASE_URL +
        "/updateReservation/" +
        bookingId +
        "/" +
        userId,
      updatedReservation
    );
  }

  deleteReservation(bookingId, userId) {
    return axios.delete(
      MANAGE_RESERVATION_API_BASE_URL +
        "/deleteReservation/" +
        bookingId +
        "/" +
        userId
    );
  }
}

export default new ManageReservationService();
