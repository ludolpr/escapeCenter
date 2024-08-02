import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import auth from "../services/auth/token";

const token = localStorage.getItem("access_token");

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const role = auth.getRoles();

  useEffect(() => {
    if (token) {
      // setLoading(true);
      fetchUser();
    }
  }, [loading]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/currentuser", {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data", error);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    console.log("User deco");
    setLoading(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const escapeGames = await axios.get(
        `http://127.0.0.1:8000/api/escape_games?name_escape=${searchQuery}`
      );
      const arounds = await axios.get(
        `http://127.0.0.1:8000/api/arounds?name_around=${searchQuery}`
      );
      setSearchResults([...escapeGames.data, ...arounds.data]);
    } catch (error) {
      console.error("Error searching data", error);
    }
  };

  return (
    <nav className="Navbar">
      <NavLink className="mainTitle" to="/">
        Escape center
      </NavLink>
      {/* <form onSubmit={handleSearchSubmit} className="SearchForm">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Rechercher..."
          className="SearchInput"
        />
        <button type="submit" className="SearchButton">
          Rechercher
        </button>
      </form> */}
      <ul className="NavLinks">
        <li>
          <NavLink className="NavItem" to="/">
            Accueil
          </NavLink>
        </li>
        {!role ? (
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
              <NavLink className="NavItem" to="/profil">
                Profil
              </NavLink>
            </li>

            {role == 2 && (
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
      {/* mapping de mon resultat de recherche */}
      {searchResults.length > 0 && (
        <ul className="SearchResults">
          {searchResults.map((result) => (
            <li key={result.id}>{result.name_escape || result.name_around}</li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
