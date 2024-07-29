import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("access_token");

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchUser();
    }
  }, [loading]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/currentuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data", error);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    console.log("User logged out");
  };

  return (
    <nav className="Navbar">
      <NavLink className="mainTitle" to="/">
        Escape center
      </NavLink>
      <ul className="NavLinks">
        <li>
          <NavLink className="NavItem" to="/">
            Accueil
          </NavLink>
        </li>
        {!token ? (
          <>
            <li>
              <NavLink className="NavItem" to="/login">
                Se connecter
              </NavLink>
            </li>
            <li>
              <NavLink className="NavItem" to="/register">
                S'enregistrer
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink className="NavItem" to="/blog">
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink className="NavItem" to="/escape">
                Escape game
              </NavLink>
            </li>
            <li>
              <NavLink className="NavItem" to="/around">
                Au alentour
              </NavLink>
            </li>
            <li>
              <NavLink className="NavItem" to="/profile">
                Profil
              </NavLink>
            </li>
            {user && user.id_role === 2 && (
              <li>
                <NavLink className="NavItem" to="/admin">
                  Admin Panel
                </NavLink>
              </li>
            )}
            <li>
              <button className="NavItem" onClick={logout}>
                Se deconnecter
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
