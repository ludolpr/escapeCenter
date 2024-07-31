import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("picture", data.picture[0]);
    formData.append("address", data.address);
    formData.append("zipcode", data.zipcode);
    formData.append("town", data.town);
    formData.append("coords", data.coords);

    console.log("data send: ", data.picture[0]);

    //  controle de la data qui est envoyé
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert(
        "Erreur lors de l'inscription: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="register-page">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            {...register("name", { required: "Nom obligatoire" })}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>
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
            {...register("password", {
              required: "Mot de passe obligatoire",
              minLength: {
                value: 8,
                message: "Longueur minimale de 8 caractères",
              },
              pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                message:
                  "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spécial",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            {...register("picture_user", { required: "Image obligatoire" })}
          />
          {errors.picture && (
            <p className="error-message">{errors.picture.message}</p>
          )}
        </div>

        <button type="submit">Inscription</button>
      </form>
    </div>
  );
};

export default Register;
