import React, { useState } from "react";
import { addEscape } from "./Services";

const AddEscapeForm = () => {
  const [escape, setEscape] = useState({
    name_escape: "",
    description_escape: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEscape((prevEscape) => ({
      ...prevEscape,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEscape(escape);
      setEscape({ name_escape: "", description_escape: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'escape:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un nouveau Escape</h2>
      <label>Nom:</label>
      <input
        type="text"
        name="name_escape"
        value={escape.name_escape}
        onChange={handleChange}
      />
      <label>Description:</label>
      <input
        type="text"
        name="description_escape"
        value={escape.description_escape}
        onChange={handleChange}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddEscapeForm;
