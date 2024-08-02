import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const FormAround = () => {
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
          "http://localhost:8000/api/categoryar"
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
    formData.append("name_around", data.name_around);
    formData.append("description_around", data.description_around);
    formData.append("picture_around", data.picture_around[0]);
    formData.append("address_around", data.address_around);
    formData.append("town_around", data.town_around);
    formData.append("zipcode_around", data.zipcode_around);
    formData.append("lat_around", data.lat_around);
    formData.append("long_around", data.long_around);
    formData.append("id_category_ar", data.id_category_ar);

    try {
      await axios.post("http://localhost:8000/api/around", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Envoi réussi !");
      setErrorMessage("");
      navigate("/around");
    } catch (error) {
      console.error("Erreur lors de l'envoi d'un around game", error);
      setErrorMessage(
        "Erreur lors de l'envoi d'un around game: " +
          (error.response?.data?.message || error.message)
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="aroundForm">
      <h1>Partager un bar, restaurant, autres</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom: </label>
          <input
            type="text"
            {...register("name_around", { required: "Nom obligatoire" })}
          />
          {errors.name_around && (
            <p className="error-message">{errors.name_around.message}</p>
          )}
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            {...register("description_around", {
              required: "Description obligatoire",
            })}
          />
          {errors.description_around && (
            <p className="error-message">{errors.description_around.message}</p>
          )}
        </div>
        <div>
          <label>Image: </label>
          <input
            type="file"
            {...register("picture_around", { required: "Image obligatoire" })}
          />
          {errors.picture_around && (
            <p className="error-message">{errors.picture_around.message}</p>
          )}
        </div>
        <div>
          <label>Adresse: </label>
          <input
            type="text"
            {...register("address_around", {
              required: "Adresse obligatoire",
            })}
          />
          {errors.address_around && (
            <p className="error-message">{errors.address_around.message}</p>
          )}
        </div>
        <div>
          <label>Ville: </label>
          <input
            type="text"
            {...register("town_around", { required: "Ville obligatoire" })}
          />
          {errors.town_around && (
            <p className="error-message">{errors.town_around.message}</p>
          )}
        </div>
        <div>
          <label>Code postal : </label>
          <input
            type="text"
            {...register("zipcode_around", {
              required: "Code postal obligatoire",
            })}
          />
          {errors.zipcode_around && (
            <p className="error-message">{errors.zipcode_around.message}</p>
          )}
        </div>
        <div>
          <label>Latitude: </label>
          <input
            type="text"
            {...register("lat_around", { required: "Latitude obligatoire" })}
          />
          {errors.lat_around && (
            <p className="error-message">{errors.lat_around.message}</p>
          )}
        </div>
        <div>
          <label>Longitude: </label>
          <input
            type="text"
            {...register("long_around", { required: "Longitude obligatoire" })}
          />
          {errors.long_around && (
            <p className="error-message">{errors.long_around.message}</p>
          )}
        </div>
        <div>
          <label>Catégorie: </label>
          <select
            {...register("id_category_ar", {
              required: "Catégorie obligatoire",
            })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_category_ar}
              </option>
            ))}
          </select>
          {errors.id_category_ar && (
            <p className="error-message">{errors.id_category_ar.message}</p>
          )}
        </div>
        <button type="submit">Envoyé</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FormAround;
