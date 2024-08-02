import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilPerso = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");
  console.log(token);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("http://127.0.0.1:8000/api/currentuser", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data);
          console.log("data :" + res);
          setLoading(false);
        });
    };

    fetchUser();
  }, []);

  if (loading) return <p>Chargement de votre profil...</p>;
  if (error) return <p>Erreur lors du chargement du profil: {error.message}</p>;
  return (
    <div className="profile-container">
      {user ? (
        <>
          <img
            src={`http://127.0.0.1:8000/storage/uploads/users/${user.picture_user}`}
            alt={`profile de ${user.name}`}
            className="profile-picture"
          />
          <h2>{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </>
      ) : (
        <p>Utilisateur non trouvé.</p>
      )}
    </div>
  );
};

export default ProfilPerso;
