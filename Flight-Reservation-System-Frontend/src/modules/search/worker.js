import {put, call} from "redux-saga/effects";

import actions from "../../constants/actions";
import {filterBySourceDest} from "../../services/global-services";
import {get} from "../../utils/xhr";

import FlightJSON from "../../mocks/flights-one-way-mumbai.json";

export function* fetFlightList(payload) {
    // put API URL here
    const url = "http://localhost:8080/booking/getFlightsOnArrivalAndDeparture/" +
        payload.source + "/" + payload.destination + "/" + payload.deptDate;

    const jsonResponse = [...FlightJSON];
    try {
        let response;
        response = yield call(get, url);
        if (!response) {
            response = filterBySourceDest(payload, jsonResponse);
        }

        yield put({
            type: actions.GET_FLIGHT_LIST_SUCCESS,
            result: response,
            error: null
        });
    } catch (error) {
        const errorObj = JSON.parse(error.message);

        yield put({
            type: actions.GET_FLIGHT_LIST_ERROR,
            result: null,
            error: {
                statusCode: errorObj.statusCode,
                message: errorObj.errorMessage
            }
        });
    }
}
