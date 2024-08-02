import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddCategoryForm from "./AddCategoryForm";
import AddBlogForm from "./AddBlogForm";
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
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
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
              item.name_around ||
              item.name_blog}
            <Link to={`/AdminEdit/${item.id}`}>
              <button>Voir</button>
            </Link>
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
              value={data.name}
              onChange={onChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
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
              value={data.name_role}
              onChange={onChange}
            />
          </>
        );
      case "categoryeg":
        return (
          <>
            <label>Nom:</label>
            <input
              type="text"
              name="name_category_eg"
              value={data.name_category_eg}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_category_eg"
              value={data.description_category_eg}
              onChange={onChange}
            />
          </>
        );
      case "categoryar":
        return (
          <>
            <label>Nom:</label>
            <input
              type="text"
              name="name_category_ar"
              value={data.name_category_ar}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_category_ar"
              value={data.description_category_ar}
              onChange={onChange}
            />
          </>
        );
      case "escape":
        return (
          <>
            <label>Nom:</label>
            <input
              type="text"
              name="name_escape"
              value={data.name_escape}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_escape"
              value={data.description_escape}
              onChange={onChange}
            />
          </>
        );
      case "around":
        return (
          <>
            <label>Nom:</label>
            <input
              type="text"
              name="name_around"
              value={data.name_around}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_around"
              value={data.description_around}
              onChange={onChange}
            />
          </>
        );
      case "blogs":
        return (
          <>
            <label>Titre:</label>
            <input
              type="text"
              name="name_blog"
              value={data.name_blog}
              onChange={onChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description_blog"
              value={data.description_blog}
              onChange={onChange}
            />
            <label>Image URL:</label>
            <input
              type="text"
              name="picture_blog"
              value={data.picture_blog}
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
              <strong>{key}:</strong> {data[key]}
            </p>
          ))}
          <button onClick={onEdit}>Modifier</button>
          <button onClick={onDelete}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categoryeg, setCategoryeg] = useState([]);
  const [categoryar, setCategoryar] = useState([]);
  const [escapes, setEscapes] = useState([]);
  const [around, setAround] = useState([]);
  const [blogs, setBlogs] = useState([]);

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
          blogsRes,
        ] = await Promise.all([
          getUsers(),
          getRoles(),
          getCategorieseg(),
          getCategoriesar(),
          getEscapes(),
          getArounds(),
          getBlogs(),
        ]);

        setUsers(usersRes);
        setRoles(rolesRes);
        setCategoryeg(categoryegRes);
        setCategoryar(categoryarRes);
        setEscapes(escapesRes);
        setAround(aroundRes);
        setBlogs(blogsRes);
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
        return getRoles(id);
      case "categoryeg":
        return getCategorieseg(id);
      case "categoryar":
        return getCategoriesar(id);
      case "escape":
        return getEscape(id);
      case "around":
        return getAround(id);
      case "blogs":
        return getBlog(id);
      default:
        throw new Error("Entity non reconnu");
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await updateEntityData(selectedEntity, selectedData.id, selectedData);
      setIsEditing(false);
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
      case "blogs":
        return updateBlog(id, data);
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
      case "blogs":
        return deleteBlog(id);
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
      case "blogs":
        setBlogs(blogs.filter((blog) => blog.id !== id));
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
            "blogs",
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
        {selectedEntity === "blogs" && <AddBlogForm />}
        {selectedEntity === "escape" && <AddEscapeForm />}
        {selectedEntity === "around" && <AddAroundForm />}
        {selectedEntity === "users" && (
          <EntityList
            entity="Utilisateurs"
            data={users}
            onSelect={handleSelect}
          />
        )}
        {selectedEntity === "roles" && (
          <EntityList entity="Rôles" data={roles} onSelect={handleSelect} />
        )}
        {selectedEntity === "categoryeg" && (
          <EntityList
            entity="Categories EG"
            data={categoryeg}
            onSelect={handleSelect}
          />
        )}
        {selectedEntity === "categoryar" && (
          <EntityList
            entity="Categories AR"
            data={categoryar}
            onSelect={handleSelect}
          />
        )}
        {selectedEntity === "escape" && (
          <EntityList entity="Escape" data={escapes} onSelect={handleSelect} />
        )}
        {selectedEntity === "around" && (
          <EntityList entity="Around" data={around} onSelect={handleSelect} />
        )}
        {selectedEntity === "blogs" && (
          <EntityList entity="Blogs" data={blogs} onSelect={handleSelect} />
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

export default Admin;
