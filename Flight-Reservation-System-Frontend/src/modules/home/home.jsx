import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, CssBaseline, Container, Toolbar } from "@material-ui/core";
import "./home.css";

import Header from "../../components/header/header";
import ErrorBoundaries from "../../components/error-boundaries/error-boundaries";
import { useUserInfoSession } from "../../components/header/user-context";
const Confirmation = lazy(() => import("../confirmation/confirmation"));
const FlightSearch = lazy(() => import("../search/flight-search"));
const FlightBooking = lazy(() => import("../booking/flight-booking"));
const Payment = lazy(() => import("../booking/payment"));
const SeatSelection = lazy(() => import("../../components/seat-selection/seat-selection"));
const ManageBooking = lazy(() => import("../manage/RetrieveBooking"));
const ViewReservation = lazy(() => import("../manage/ViewReservation"));
const About = lazy(() => import("../../modules/about/about"));
const Help = lazy(() => import("../../modules/help/help"));
const Admin = lazy(() => import("../admin/admin"));
const AdminEditFlight = lazy(() => import("../admin/AdminEditFlight"));
const AdminAddFlight = lazy(() => import("../admin/AdminAddFlight"));

const Home = () => {
  const { userInfoSession } = useUserInfoSession();
  let isAdmin = 0;

  if (userInfoSession) {
    isAdmin = userInfoSession.admin;
  }

  const shouldShowManageTab = () => {
    return userInfoSession ? true : false;
  };

  const [tabs, setTabs] = useState([
    { label: 'Book', path: '/', show: true },
    { label: 'Manage', path: '/manage', show: shouldShowManageTab() },
    { label: 'About', path: '/about', show: true },
    { label: 'Help', path: '/help', show: true },
    { label: 'Admin', path: '/admin', show: true },
  ]);

  const updateAdminTab = () => {
    const updatedTabs = [...tabs];
    const adminTab = updatedTabs.find((tab) => tab.label === 'Admin');
    console.log("in admin tab: %d", isAdmin)
    if (adminTab) {
      adminTab.show = isAdmin === 1;
    }

    const manageTab = updatedTabs.find((tab) => tab.label === 'Manage');
    if (manageTab) {
      manageTab.show = shouldShowManageTab();
    }

    setTabs(updatedTabs);
  };

  useEffect(() => {
    updateAdminTab();
  }, [isAdmin, userInfoSession]);

  const handleShowTab = (tabIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex] = { ...updatedTabs[tabIndex], show: true };
    setTabs(updatedTabs);
  };

  return (
    <div className="root">
      <CssBaseline />
      <Router>
        <Header tabs={tabs} onShowTab={handleShowTab} />
        <Toolbar />
        <Container>
          <Grid container styles={{ marginTop: 100 }}>
            <Grid item xs={12} sm={12}>
              <ErrorBoundaries>
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route path={`/`} exact={true} component={FlightSearch} />
                    <Route
                      exact={true}
                      path={`/flight-search`}
                      component={FlightSearch}
                    />
                    <Route
                      exact={true}
                      path={`/flight-booking`}
                      component={FlightBooking}
                    />
                    <Route
                      exact={true}
                      path={`/manage`}
                      component={ManageBooking}
                    />
                    <Route
                      exact={true}
                      path={`/admin`}
                      component={Admin}
                    />
                    <Route
                      exact={true}
                      path={`/about`}
                      component={About}
                    />
                    <Route
                      exact={true}
                      path={`/help`}
                      component={Help}
                    />
                    <Route
                      exact={true}
                      path={`/payment`}
                      component={Payment}
                    />
                    <Route
                      exact={true}
                      path={`/confirmation`}
                      component={Confirmation}
                    />
                    <Route
                      exact={true}
                      path={`/seat-selection`}
                      component={SeatSelection}
                    />
                    <Route
                      exact={true}
                      path={`/view-reservation/:bookingId/:userId`}
                      component={ViewReservation}
                    />
                    <Route
                      exact={true}
                      path={`/admin`}
                      component={Admin}
                    />
                    <Route
                      exact={true}
                      path={`/edit-flight/:flightNumber`}
                      component={AdminEditFlight}
                    />
                    <Route
                      exact={true}
                      path={`/add-flight/`}
                      component={AdminAddFlight}
                    />
                  </Switch>
                </Suspense>
              </ErrorBoundaries>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </div>
  );
};

export default Home;
