import { combineReducers } from "redux";

import flightSearch from "./modules/search/reducer";

const rootReducer = combineReducers({
  flightSearch
});

export default rootReducer;
