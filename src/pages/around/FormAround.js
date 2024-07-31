import React from "react";
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
    formData.append("id_category_ag", data.id_category_ag);

    try {
      const response = await axios.post(
        "http://localhost:800/api/around",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigate("/around");
    } catch (error) {
      console.error("Erreur lors de l'envoie d'un around game", error);
      alert(
        "Erreur lors de l'envoie d'un around game: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="aroundForm">
      <h1>Partager un bar, restaurent , autres</h1>
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
          <input
            type="text"
            {...register("id_category_ag", {
              required: "Catégorie obligatoire",
            })}
          />
          {errors.id_category_ag && (
            <p className="error-message">{errors.id_category_ag.message}</p>
          )}
        </div>
        <button type="submit">Envoyé</button>
      </form>
    </div>
  );
};

export default FormAround;
