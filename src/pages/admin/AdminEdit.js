import React, { useState, useEffect } from "react";
import AddCategoryForm from "./AddCategoryForm";
import AddEscapeForm from "./AddEscapeForm";
import AddAroundForm from "./AddAroundForm";
import {
  getUsers,
  getRoles,
  getUser,
  updateUser,
  updateRole,
  deleteUser,
  deleteRole,
  getCategorieseg,
  getCategoriesar,
  updateCategoryeg,
  updateCategoryar,
  deleteCategoryeg,
  deleteCategoryar,
  getEscapes,
  getEscape,
  updateEscape,
  deleteEscape,
  getArounds,
  getAround,
  updateAround,
  deleteAround,
} from "./Services";

const EntityList = ({ entity, data, onSelect }) => (
  <div>
    <h2>{entity.charAt(0).toUpperCase() + entity.slice(1)}</h2>
    {data.length > 0 ? (
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name ||
              item.name_role ||
              item.name_category_eg ||
              item.name_category_ar ||
              item.name_escape ||
              item.name_around}
            <button onClick={() => onSelect(entity, item.id)}>Voir</button>
          </li>
        ))}
      </ul>
    ) : (
      <p>Pas de {entity}</p>
    )}
  </div>
);

const EditSection = ({
  entity,
  data,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onChange,
}) => {
  const renderFields = () => {
    switch (entity) {
      case "users":
        return (
          <>
            <label>Nom:</label>
            <input
              type="text"
              name="name"
              value={data.name || ""}
              onChange={onChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={data.email || ""}
              onChange={onChange}
            />
          </>
        );
      case "roles":
        return (
          <>
            <label>Nom:</label>
            <input
              type="text"
              name="name_role"
              value={data.name_role || ""}
              onChange={onChange}
            />
          </>
        );
      case "categoryeg":
        return (
          <>
            <label>ID:</label>
            <input type="text" name="id" value={data.id || ""} readOnly />
            <label>Nom:</label>
            <input
              type="text"
              name="name_category_eg"
              value={data.name_category_eg || ""}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_category_eg"
              value={data.description_category_eg || ""}
              onChange={onChange}
            />
          </>
        );
      case "categoryar":
        return (
          <>
            <label>ID:</label>
            <input type="text" name="id" value={data.id || ""} readOnly />
            <label>Nom:</label>
            <input
              type="text"
              name="name_category_ar"
              value={data.name_category_ar || ""}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_category_ar"
              value={data.description_category_ar || ""}
              onChange={onChange}
            />
          </>
        );
      case "escape":
        return (
          <>
            <label>ID:</label>
            <input type="text" name="id" value={data.id || ""} readOnly />
            <label>Nom:</label>
            <input
              type="text"
              name="name_escape"
              value={data.name_escape || ""}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_escape"
              value={data.description_escape || ""}
              onChange={onChange}
            />
          </>
        );
      case "around":
        return (
          <>
            <label>ID:</label>
            <input type="text" name="id" value={data.id || ""} readOnly />
            <label>Nom:</label>
            <input
              type="text"
              name="name_around"
              value={data.name_around || ""}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_around"
              value={data.description_around || ""}
              onChange={onChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="edit-section">
      <h2>Modifier {entity}</h2>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          {renderFields()}
          <button type="submit">Enregistrer</button>
        </form>
      ) : (
        <div>
          {Object.keys(data).map((key) => (
            <p key={key}>
              <strong>{key}:</strong>{" "}
              {typeof data[key] === "object"
                ? JSON.stringify(data[key])
                : data[key]}
            </p>
          ))}
          <button onClick={onEdit}>Modifier</button>
          <button onClick={onDelete}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

const AdminEdit = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categoryeg, setCategoryeg] = useState([]);
  const [categoryar, setCategoryar] = useState([]);
  const [escapes, setEscapes] = useState([]);
  const [around, setAround] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersRes,
          rolesRes,
          categoryegRes,
          categoryarRes,
          escapesRes,
          aroundRes,
        ] = await Promise.all([
          getUsers(),
          getRoles(),
          getCategorieseg(),
          getCategoriesar(),
          getEscapes(),
          getArounds(),
        ]);

        setUsers(usersRes);
        setRoles(rolesRes);
        setCategoryeg(categoryegRes);
        setCategoryar(categoryarRes);
        setEscapes(escapesRes);
        setAround(aroundRes);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelect = async (entity, id = null) => {
    setSelectedEntity(entity);
    setSelectedData(null);
    setIsEditing(false);

    if (id) {
      try {
        const data = await getEntityData(entity, id);
        setSelectedData(data);
      } catch (error) {
        console.error(
          `Erreur lors de la récupération des données de ${entity}:`,
          error
        );
      }
    }
  };

  const getEntityData = async (entity, id) => {
    switch (entity) {
      case "users":
        return getUser(id);
      case "roles":
        const roles = await getRoles();
        return roles.find((role) => role.id === id);
      case "categoryeg":
        const categorieseg = await getCategorieseg();
        return categorieseg.find((category) => category.id === id);
      case "categoryar":
        const categoriesar = await getCategoriesar();
        return categoriesar.find((category) => category.id === id);
      case "escape":
        return getEscape(id);
      case "around":
        return getAround(id);
      default:
        throw new Error("Entity non reconnu");
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await updateEntityData(selectedEntity, selectedData.id, selectedData);
      setIsEditing(false);
      handleSelect(selectedEntity); // Refresh the list after saving
    } catch (error) {
      console.error(
        `Erreur lors de la modification des données de ${selectedEntity}:`,
        error
      );
    }
  };

  const updateEntityData = async (entity, id, data) => {
    switch (entity) {
      case "users":
        return updateUser(id, data);
      case "roles":
        return updateRole(id, data);
      case "categoryeg":
        return updateCategoryeg(id, data);
      case "categoryar":
        return updateCategoryar(id, data);
      case "escape":
        return updateEscape(id, data);
      case "around":
        return updateAround(id, data);
      default:
        throw new Error("Entity non reconnu");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEntityData(selectedEntity, selectedData.id);
      removeFromState(selectedEntity, selectedData.id);
      setSelectedEntity(null);
      setSelectedData(null);
    } catch (error) {
      console.error(
        `Erreur lors de la suppression des données de ${selectedEntity}:`,
        error
      );
    }
  };

  const deleteEntityData = async (entity, id) => {
    switch (entity) {
      case "users":
        return deleteUser(id);
      case "roles":
        return deleteRole(id);
      case "categoryeg":
        return deleteCategoryeg(id);
      case "categoryar":
        return deleteCategoryar(id);
      case "escape":
        return deleteEscape(id);
      case "around":
        return deleteAround(id);
      default:
        throw new Error("Entity non reconnu");
    }
  };

  const removeFromState = (entity, id) => {
    switch (entity) {
      case "users":
        setUsers(users.filter((user) => user.id !== id));
        break;
      case "roles":
        setRoles(roles.filter((role) => role.id !== id));
        break;
      case "categoryeg":
        setCategoryeg(categoryeg.filter((category) => category.id !== id));
        break;
      case "categoryar":
        setCategoryar(categoryar.filter((category) => category.id !== id));
        break;
      case "escape":
        setEscapes(escapes.filter((theme) => theme.id !== id));
        break;
      case "around":
        setAround(around.filter((theme) => theme.id !== id));
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="containerAdmin">
      <div className="containerPills">
        <div className="pillsContainer">
          {[
            "users",
            "roles",
            "categoryeg",
            "categoryar",
            "escape",
            "around",
          ].map((entity) => (
            <button
              key={entity}
              className={`pill ${selectedEntity === entity ? "active" : ""}`}
              onClick={() => handleSelect(entity)}
            >
              {entity.charAt(0).toUpperCase() + entity.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="containerAdminData">
        {selectedEntity === "categoryeg" && (
          <AddCategoryForm entity="categoryeg" />
        )}
        {selectedEntity === "categoryar" && (
          <AddCategoryForm entity="categoryar" />
        )}
        {selectedEntity === "escape" && <AddEscapeForm />}
        {selectedEntity === "around" && <AddAroundForm />}
        {selectedEntity === "users" && (
          <EntityList entity="users" data={users} onSelect={handleSelect} />
        )}
        {selectedEntity === "roles" && (
          <EntityList entity="roles" data={roles} onSelect={handleSelect} />
        )}
        {selectedEntity === "categoryeg" && (
          <EntityList
            entity="categoryeg"
            data={categoryeg}
            onSelect={handleSelect}
          />
        )}
        {selectedEntity === "categoryar" && (
          <EntityList
            entity="categoryar"
            data={categoryar}
            onSelect={handleSelect}
          />
        )}
        {selectedEntity === "escape" && (
          <EntityList entity="escape" data={escapes} onSelect={handleSelect} />
        )}
        {selectedEntity === "around" && (
          <EntityList entity="around" data={around} onSelect={handleSelect} />
        )}
      </div>
      {selectedData && (
        <EditSection
          entity={selectedEntity}
          data={selectedData}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onDelete={handleDelete}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default AdminEdit;
