import React, { useState, useEffect } from "react";
import { addBlog, getUsers } from "./Services";

const AddBlogForm = () => {
  const [blog, setBlog] = useState({
    name_blog: "",
    description_blog: "",
    picture_blog: null,
    id_user: "", // Initialisez avec une chaîne vide pour l'id de l'utilisateur
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await getUsers();
        setUsers(usersRes);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlog((prevBlog) => ({
      ...prevBlog,
      picture_blog: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_blog", blog.name_blog);
    formData.append("description_blog", blog.description_blog);
    formData.append("picture_blog", blog.picture_blog);
    formData.append("id_user", blog.id_user);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      await addBlog(formData);
      setBlog({
        name_blog: "",
        description_blog: "",
        picture_blog: null,
        id_user: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du blog:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un nouveau blog</h2>
      <label>Titre:</label>
      <input
        type="text"
        name="name_blog"
        value={blog.name_blog}
        onChange={handleChange}
      />
      <label>Description:</label>
      <input
        type="text"
        name="description_blog"
        value={blog.description_blog}
        onChange={handleChange}
      />
      <label>Image:</label>
      <input type="file" name="picture_blog" onChange={handleFileChange} />
      <label>Utilisateur:</label>
      <select name="id_user" value={blog.id_user} onChange={handleChange}>
        <option value="">Sélectionner un utilisateur</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddBlogForm;
