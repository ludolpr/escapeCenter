import React from "react";
import axios from "axios";
import FormEscape from "./FormEscape";
import BasicMap from "../../components/BasicMap";

const baseURL = "http://127.0.0.1:8000/api/escape";

const EscapeGame = () => {
  const [escapes, setEscapes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setEscapes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Quelque chose ne passe pas: {error.message}</p>;

  return (
    <div className="formContainer">
      <FormEscape />
      <div className="escapeGame">
        {escapes.length > 0 ? (
          escapes.map((escape) => (
            <div key={escape.id} className="escapeItem">
              <h2 className="escapeTitle">Titre :{escape.name_escape}</h2>
              <p>Description: {escape.description_escape}</p>
              <img
                src={`http://127.0.0.1:8000/storage/uploads/escapes/${escape.picture_escape}`}
                alt={escape.name_escape}
              />
              <p>
                <strong>Adresse:</strong> {escape.address_escape}
              </p>
              <p>
                <strong>Ville:</strong> {escape.town_escape}
              </p>
              <p>
                <strong>Code postal:</strong> {escape.zipcode_escape}
              </p>
              <p>
                <strong>Coordonnées:</strong> {escape.lat_escape},
                {escape.long_escape}
              </p>
              <p>
                <strong>Catégorie ID:</strong> {escape.id_category_eg}
              </p>
            </div>
          ))
        ) : (
          <p>Pas de données disponibles</p>
        )}
      </div>
    </div>
  );
};

export default EscapeGame;
