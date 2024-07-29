import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Retirer l'access_token de la mémoire locale
    localStorage.removeItem("access_token");

    // Optionnellement, effacer l'ensemble du stockage local
    localStorage.clear();

    navigate("/login");
    // window.location.href = '/login';
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
