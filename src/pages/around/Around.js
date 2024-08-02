import React from "react";
import axios from "axios";
import FormAround from "./FormAround";

const baseURL = "http://127.0.0.1:8000/api/around";

const AroundGame = () => {
  const [around, setAround] = React.useState([]);
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
  if (error) return <p>Quelque chose ne passe pas: {error.message}</p>;

  return (
    <div className="formContainer">
      <FormAround />
      <div className="aroundGame">
        {around.length > 0 ? (
          around.map((item) => (
            <div key={item.id} className="aroundItem">
              <h2 className="aroundTitle">Titre :{item.name_around}</h2>
              <p>Description: {item.description_around}</p>
              <img
                src={`http://127.0.0.1:8000/storage/uploads/around/${item.picture_around}`}
                alt={item.name_around}
              />
              <p>
                <strong>Adresse:</strong> {item.address_around}
              </p>
              <p>
                <strong>Ville:</strong> {item.town_around}
              </p>
              <p>
                <strong>Code postal:</strong> {item.zipcode_around}
              </p>
              <p>
                <strong>Coordonnées:</strong> {item.lat_around},
                {item.long_around}
              </p>
              <p>
                <strong>Catégorie ID:</strong> {item.id_category_ar}
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

export default AroundGame;
