import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import { GoogleOAuthProvider } from '@react-oauth/google';



import Home from "./modules/home/home";

import rootReducer from "./rootReducer";
import rootSaga from "./sagas";
import {UserSessionProvider} from "./components/header/user-context";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
        <Router>
            <UserSessionProvider>
            <Home/>
            </UserSessionProvider>
        </Router>
    </Provider>
    </GoogleOAuthProvider>,
    rootElement
);
