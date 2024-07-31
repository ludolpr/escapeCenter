import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const FormEscape = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categoryeg"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name_escape", data.name_escape);
    formData.append("description_escape", data.description_escape);
    formData.append("picture_escape", data.picture_escape[0]);
    formData.append("address_escape", data.address_escape);
    formData.append("town_escape", data.town_escape);
    formData.append("zipcode_escape", data.zipcode_escape);
    formData.append("lat_escape", data.lat_escape);
    formData.append("long_escape", data.long_escape);
    formData.append("id_category_eg", data.id_category_eg);

    try {
      await axios.post("http://localhost:8000/api/escape", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Escape game créé avec succès !");
      setErrorMessage("");
      navigate("/escape");
    } catch (error) {
      console.error("Erreur lors de l'envoi d'un escape game", error);
      setErrorMessage(
        "Erreur lors de l'envoi d'un escape game: " +
          (error.response?.data?.message || error.message)
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="escapeForm">
      <h1>Partager un escape game</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom de l'escape game:</label>
          <input
            type="text"
            {...register("name_escape", { required: "Nom obligatoire" })}
          />
          {errors.name_escape && (
            <p className="error-message">{errors.name_escape.message}</p>
          )}
        </div>
        <div>
          <label>Description de l'escape game:</label>
          <input
            type="text"
            {...register("description_escape", {
              required: "Description obligatoire",
            })}
          />
          {errors.description_escape && (
            <p className="error-message">{errors.description_escape.message}</p>
          )}
        </div>
        <div>
          <label>Image de l'escape game:</label>
          <input
            type="file"
            {...register("picture_escape", { required: "Image obligatoire" })}
          />
          {errors.picture_escape && (
            <p className="error-message">{errors.picture_escape.message}</p>
          )}
        </div>
        <div>
          <label>Adresse de l'escape game:</label>
          <input
            type="text"
            {...register("address_escape", {
              required: "Adresse obligatoire",
            })}
          />
          {errors.address_escape && (
            <p className="error-message">{errors.address_escape.message}</p>
          )}
        </div>
        <div>
          <label>Ville de l'escape game:</label>
          <input
            type="text"
            {...register("town_escape", { required: "Ville obligatoire" })}
          />
          {errors.town_escape && (
            <p className="error-message">{errors.town_escape.message}</p>
          )}
        </div>
        <div>
          <label>Code postal de l'escape game:</label>
          <input
            type="text"
            {...register("zipcode_escape", {
              required: "Code postal obligatoire",
            })}
          />
          {errors.zipcode_escape && (
            <p className="error-message">{errors.zipcode_escape.message}</p>
          )}
        </div>
        <div>
          <label>Latitude de l'escape game:</label>
          <input
            type="text"
            {...register("lat_escape", { required: "Latitude obligatoire" })}
          />
          {errors.lat_escape && (
            <p className="error-message">{errors.lat_escape.message}</p>
          )}
        </div>
        <div>
          <label>Longitude de l'escape game:</label>
          <input
            type="text"
            {...register("long_escape", { required: "Longitude obligatoire" })}
          />
          {errors.long_escape && (
            <p className="error-message">{errors.long_escape.message}</p>
          )}
        </div>
        <div>
          <label>Catégorie de l'escape game:</label>
          <select
            {...register("id_category_eg", {
              required: "Catégorie obligatoire",
            })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_category_eg}
              </option>
            ))}
          </select>
          {errors.id_category_eg && (
            <p className="error-message">{errors.id_category_eg.message}</p>
          )}
        </div>
        <button type="submit">Envoyer un escape game</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FormEscape;
