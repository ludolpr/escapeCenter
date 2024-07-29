import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.data.access_token.token)
      );
      // console.log("data: ", data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setAuthError(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
      setLoading(true);
    }
  };

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Adresse mail obligatoire" })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            {...register("password", { required: "Mot de passe obligatoire" })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        {authError && <p className="error-message">{authError}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Connexion"}
        </button>
      </form>
    </div>
  );
};

export default Login;
