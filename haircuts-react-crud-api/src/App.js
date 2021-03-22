import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddHairCut from "./components/add-haircut.component";
import HairCut from "./components/haircut.component";
import HairCutsList from "./components/haircuts-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/haircuts"} className="navbar-brand">
            PeopleCert Education
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/haircuts"} className="nav-link">
                HairCuts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/haircuts"]} component={HairCutsList} />
            <Route exact path="/add" component={AddHairCut} />
            <Route path="/haircuts/:id" component={HairCut} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
