import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";
import Logout from "../../pages/auth/Logout";

const RouteContainer = () => {
  return (
    <Router>
      <Navbar />
      <div className="root">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default RouteContainer;
