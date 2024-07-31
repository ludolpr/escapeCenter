import React, { useState } from "react";
import { addAround } from "./Services";

const AddAroundForm = () => {
  const [around, setAround] = useState({
    name_around: "",
    description_around: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAround((prevAround) => ({
      ...prevAround,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAround(around);
      setAround({ name_around: "", description_around: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'around:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un nouveau Around</h2>
      <label>Nom:</label>
      <input
        type="text"
        name="name_around"
        value={around.name_around}
        onChange={handleChange}
      />
      <label>Description:</label>
      <input
        type="text"
        name="description_around"
        value={around.description_around}
        onChange={handleChange}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddAroundForm;
