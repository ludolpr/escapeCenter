import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
});

const handleResponse = (response) => response.data;
const handleError = (error) => {
  console.error("API erreur de données", error);
  throw error;
};

const ProfilPerso = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/currentuser`).then(handleResponse);
      setUser(response);
      setLoading(false);
    } catch (err) {
      handleError(err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p>Chargement de votre profil...</p>;
  if (error) return <p>Erreur lors du chargement du profil</p>;

  return (
    <div className="profile-container">
      {user && (
        <>
          <img
            src={user.picture_user}
            alt={`profile de ${user.name}`}
            className="profile-picture"
          />
          <h2>{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mot de passe:</strong> {user.password}
          </p>
        </>
      )}
    </div>
  );
};

export default ProfilPerso;
