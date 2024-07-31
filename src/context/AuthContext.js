import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Création d'un contexte pour l'authentification
const AuthContext = createContext();

// Création du composant AuthProvider qui va fournir le contexte d'authentification à ses enfants
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // État pour stocker les informations de l'utilisateur

  // Utilisation d'un effet pour récupérer les informations de l'utilisateur lorsque le composant est monté
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token"); // Récupération du token d'accès depuis le stockage local
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Définition du header d'autorisation par défaut pour axios
        try {
          const response = await axios.get(
            "http://localhost:8000/api/currentuser"
          ); // Requête pour obtenir les informations de l'utilisateur courant
          setUser(response.data); // Mise à jour de l'état utilisateur avec les données reçues
        } catch (error) {
          console.error("Error fetching user", error); // Gestion des erreurs
        }
      }
    };

    fetchUser(); // Appel de la fonction pour récupérer l'utilisateur
  }, []); // Le tableau vide signifie que cet effet est exécuté une seule fois après le premier rendu

  // Fonction pour connecter l'utilisateur
  const login = (userData) => {
    setUser(userData); // Mise à jour de l'état utilisateur avec les données fournies
    localStorage.setItem("access_token", userData.access_token); // Stockage du token d'accès dans le stockage local
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userData.access_token}`; // Définition du header d'autorisation par défaut pour axios
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null); // Réinitialisation de l'état utilisateur
    localStorage.removeItem("access_token"); // Suppression du token d'accès du stockage local
    delete axios.defaults.headers.common["Authorization"]; // Suppression du header d'autorisation par défaut pour axios
  };

  return (
    // Fourniture du contexte AuthContext avec les valeurs user, login et logout aux composants enfants
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte AuthContext
export const useAuth = () => useContext(AuthContext);
