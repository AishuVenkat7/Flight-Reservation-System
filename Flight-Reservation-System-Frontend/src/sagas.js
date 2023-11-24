import { fork } from "redux-saga/effects";

import * as FlightSearch from "./modules/search/watcher";

export default function* rootSaga() {
  yield [fork(FlightSearch.watchFlightSearch)];
}
