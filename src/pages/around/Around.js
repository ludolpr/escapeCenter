import React from "react";
import axios from "axios";
import FormAround from "./FormAround";
const baseURL = "http://127.0.0.1:8000/api/around";

const AroundGame = () => {
  const [around, setAround] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setAround(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Quelques choses ne passe pas: {error.message}</p>;

  return (
    <div className="formContainer">
      <FormAround />
      <div className="aroundGame">
        {around ? (
          <>
            <h2 className="aroundTitle">{around.name_around}</h2>
            <p>{around.description_around}</p>
            <img src={around.picture_around} alt={around.name_around} />
            <p>
              <strong>Adresse:</strong> {around.address_around},{" "}
              {around.town_around}
            </p>
            <p>
              <strong>Code postal:</strong> {around.zipcode_around}
            </p>
            <p>
              <strong>Coordonnées:</strong> {around.lat_around},
              {around.long_around}
            </p>
            <p>
              <strong>Categorie ID:</strong> {around.id_category_ag}
            </p>
          </>
        ) : (
          <p>Pas de données</p>
        )}
      </div>
    </div>
  );
};

export default AroundGame;
