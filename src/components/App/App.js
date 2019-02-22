import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import HopComparisonPage from '../HopComparisonPage/HopComparisonPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';
import AddHopPage from '../AddHopPage/AddHopPage';
import AdminPage from '../AdminPage/AdminPage';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import HopListPage from '../HopListPage/HopListPage';
import HopVarietyPage from '../HopVarietyPage/HopVarietyPage';

class App extends Component {

  // When this component mounts dispatch a request to the server for the users
  componentDidMount () {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  // Show this component on the DOM
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <ProtectedRoute
              exact path="/home"
              component={UserPage}
            />
            <Route
              exact path="/about"
              component={AboutPage}
            />
            <Route
              exact path="/hop_comparison"
              component={HopComparisonPage}
            />
            <Route
              exact path="/hop_list"
              component={HopListPage}
            />
            <Route
              exact path="/hops/:id"
              component={HopVarietyPage}
            />
            <ProtectedRoute
              exact path="/admin"
              component={AdminPage}
              adminRoute={true}
            />
            <ProtectedRoute
              exact path="/add_hop"
              component={AddHopPage}
              adminRoute={true}
            />
            <ProtectedRoute
              exact path="/update_hop/:id"
              component={AddHopPage}
              adminRoute={true}
            />
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
