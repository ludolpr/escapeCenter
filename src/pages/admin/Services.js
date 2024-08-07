import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
});

const handleResponse = (response) => response.data;
const handleError = (error) => {
  console.error("API erreur de données", error);
  throw error;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour les utilisateurs
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getUsers = () =>
  api.get("/user").then(handleResponse).catch(handleError);

export const getUser = (id) =>
  api.get(`/user/${id}`).then(handleResponse).catch(handleError);

export const updateUser = (id, data) =>
  api.put(`/user/${id}`, data).then(handleResponse).catch(handleError);

export const deleteUser = (id) =>
  api.delete(`/user/${id}`).then(handleResponse).catch(handleError);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour les rôles
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getRoles = () =>
  api.get("/role").then(handleResponse).catch(handleError);

export const updateRole = (id, data) =>
  api.put(`/role/${id}`, data).then(handleResponse).catch(handleError);

export const deleteRole = (id) =>
  api.delete(`/role/${id}`).then(handleResponse).catch(handleError);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour les catégories escape game
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCategorieseg = () =>
  api.get("/categoryeg").then(handleResponse).catch(handleError);

export const updateCategoryeg = (id, data) =>
  api.put(`/categoryeg/${id}`, data).then(handleResponse).catch(handleError);

export const deleteCategoryeg = (id) =>
  api.delete(`/categoryeg/${id}`).then(handleResponse).catch(handleError);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour les catégories des alentours
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCategoriesar = () =>
  api.get("/categoryar").then(handleResponse).catch(handleError);

export const updateCategoryar = (id, data) =>
  api.put(`/categoryar/${id}`, data).then(handleResponse).catch(handleError);

export const deleteCategoryar = (id) =>
  api.delete(`/categoryar/${id}`).then(handleResponse).catch(handleError);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour les escape game
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getEscapes = () =>
  api.get("/escape").then(handleResponse).catch(handleError);

export const getEscape = (id) =>
  api.get(`/escape/${id}`).then(handleResponse).catch(handleError);

export const updateEscape = (id, data) =>
  api.put(`/escape/${id}`, data).then(handleResponse).catch(handleError);

export const deleteEscape = (id) =>
  api.delete(`/escape/${id}`).then(handleResponse).catch(handleError);

export const addEscape = (escape) =>
  api.post("/escape", escape).then(handleResponse).catch(handleError); // Add this

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour les alentours
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getArounds = () =>
  api.get("/around").then(handleResponse).catch(handleError);

export const getAround = (id) =>
  api.get(`/around/${id}`).then(handleResponse).catch(handleError);

export const updateAround = (id, data) =>
  api.put(`/around/${id}`, data).then(handleResponse).catch(handleError);

export const deleteAround = (id) =>
  api.delete(`/around/${id}`).then(handleResponse).catch(handleError);

export const addAround = (around) =>
  api.post("/around", around).then(handleResponse).catch(handleError); // Add this

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour les blogs
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getBlogs = () =>
  api.get("/blog").then(handleResponse).catch(handleError);

export const getBlog = (id) =>
  api.get(`/blog/${id}`).then(handleResponse).catch(handleError);

export const addBlog = (blog) =>
  api.post("/blog", blog).then(handleResponse).catch(handleError);

export const updateBlog = (id, data) =>
  api.put(`/blog/${id}`, data).then(handleResponse).catch(handleError);

export const deleteBlog = (id) =>
  api.delete(`/blog/${id}`).then(handleResponse).catch(handleError);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour Category Form
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const addCategoryeg = (category) =>
  api.post("/categoryeg", category).then(handleResponse).catch(handleError);

export const addCategoryar = (category) =>
  api.post("/categoryar", category).then(handleResponse).catch(handleError);
