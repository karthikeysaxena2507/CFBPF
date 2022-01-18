import React from "react";
import './App.css';
import Home from "../pages/Home";
import Rates from "../pages/Rates";
import ExtendedQuestions from "../pages/ExtendedQuestions";
import  { BrowserRouter as Router, Route } from "react-router-dom";
import ExtendedRates from "../pages/ExtendedRates";

const App = () => {

    return (
    <Router>
      <Route exact path = "/" component = {Home} />
      <Route exact path = "/rates/:id" component = {Rates} />
      <Route exact path = "/lender/:id" component = {ExtendedQuestions} />
      <Route exact path = "/extendedRates/:id" component = {ExtendedRates} />
    </Router>
    );

}

export default App;
