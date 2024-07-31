import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";
import Admin from "../../pages/admin/Dashboard";
import EscapeGame from "../../pages/escapeGame/EscapeGame";
import Around from "../../pages/around/Around";
import EventList from "../../pages/blog/EventList";
import ProfilPerso from "../../pages/profil/ProfilPerso";
import AdminEdit from "../../pages/admin/AdminEdit";
import auth from "../../services/auth/token";

const RouteContainer = () => {
  const role = auth.getRoles();
  return (
    // <AuthProvider>
    <Router>
      <Navbar />
      <div className="root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/escape" element={<EscapeGame />} />
          <Route path="/around" element={<Around />} />
          <Route path="/blog" element={<EventList />} />
          <Route path="/profil" element={<ProfilPerso />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/AdminEdit/:id" element={<AdminEdit />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    // </AuthProvider>
  );
};

export default RouteContainer;
