import React, { useState } from "react";
import { addCategoryeg, addCategoryar } from "./Services";

const AddCategoryForm = ({ onAdd }) => {
  const [entity, setEntity] = useState("categoryeg");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (entity === "categoryeg") {
        await addCategoryeg({
          name_category_eg: name,
          description_category_eg: description,
        });
      } else if (entity === "categoryar") {
        await addCategoryar({
          name_category_ar: name,
          description_category_ar: description,
        });
      }
      onAdd();
      setName("");
      setDescription("");
    } catch (error) {
      console.error(`Erreur lors de l'ajout de la catégorie ${entity}:`, error);
    }
  };

  return (
    <div className="add-category-form">
      <h2>Ajouter {entity === "categoryeg" ? "Category EG" : "Category AR"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Choisir la catégorie:</label>
          <select value={entity} onChange={(e) => setEntity(e.target.value)}>
            <option value="categoryeg">Category EG</option>
            <option value="categoryar">Category AR</option>
          </select>
        </div>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
