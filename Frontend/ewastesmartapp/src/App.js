import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import SignupScreen from "./components/screens/SignupScreen";
import LoginScreen from "./components/screens/LoginScreen";
import TaskTodoScreen from "./components/screens/TaskTodoScreen";
import TotalPointsScreen from "./components/screens/TotalPointsScreen";
import PointRedeemedScreen from "./components/screens/PointRedeemedScreen";
import PointBalanceScreen from "./components/screens/PointBalanceScreen";
import TaskScreen from "./components/screens/TaskScreen";

function App() {
  return (
    <>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/task/:id" element={<TaskScreen />} />
            <Route exact path="/signup" element={<SignupScreen />} />
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/todo" element={<TaskTodoScreen />} />
            <Route exact path="/points" element={<TotalPointsScreen />} />
            <Route exact path="/pointbal" element={<PointBalanceScreen />} />
            <Route
              exact
              path="/redeempoints"
              element={<PointRedeemedScreen />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
