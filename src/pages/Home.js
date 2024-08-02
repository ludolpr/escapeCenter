import React from "react";
import escapeRoom from "../../src/images/escapeRoom.png";
import BasicMap from "../components/BasicMap";

const Home = () => {
  return (
    <div className="mainContent">
      <h1 className="title">Escape Center</h1>
      <div className="firstContainer">
        <div className="leftContainer">
          <p>
            Découvrez les meilleurs escape games près de chez vous avec Escape
            Center ! Que vous soyez un amateur de défis ou un joueur
            expérimenté, nous vous aidons à trouver l'escape game parfait pour
            votre prochaine aventure.
          </p>
          <p>
            <strong>Pourquoi Choisir Escape Center ?</strong>
            <ul>
              <li>
                <strong>Large Sélection :</strong> Nous répertorions les escape
                games les plus captivants et immersifs de votre région.
              </li>
              <li>
                <strong>Descriptions Détailées :</strong> Accédez à des
                informations complètes sur chaque escape game, incluant le
                thème, le niveau de difficulté, et les avis des joueurs.
              </li>
              <li>
                <strong>Recherche Facile :</strong> Utilisez nos filtres pour
                trouver rapidement l'escape game qui correspond à vos envies,
                que ce soit en famille, entre amis ou pour une occasion
                spéciale.
              </li>
              <li>
                <strong>Avis et Notes :</strong> Consultez les retours d’autres
                joueurs pour choisir l'expérience qui vous plaira le plus.
              </li>
            </ul>
          </p>
          <p>
            Plongez dans des univers fascinants, résolvez des énigmes complexes,
            et vivez des aventures inoubliables avec Escape Center. Commencez
            votre quête dès aujourd'hui ! Rejoignez-nous et devenez un maître de
            l'évasion.
          </p>
        </div>
        <div className="rightContainer">
          <img src={escapeRoom} alt="escape game" />
        </div>
      </div>
      <div className="secondContainer">
        <div className="topContainer">
          <BasicMap />
        </div>
        <div className="botContainer">
          <h2>Lieux Importants aux Alentours</h2>
          <p>
            Découvrez les endroits incontournables à proximité de nos escape
            games. Profitez de votre aventure en explorant des restaurants,
            cafés, musées, parcs et bien plus encore. Que vous cherchiez un
            endroit pour vous détendre après une session intense ou des
            activités pour prolonger votre journée, nous avons des
            recommandations pour vous.
          </p>

          <p>
            <ul>
              <li>
                <strong>Restaurants :</strong> Savourez des plats délicieux dans
                les meilleurs restaurants de la région.
              </li>
              <li>
                <strong>Cafés :</strong> Détendez-vous avec une boisson chaude
                dans des cafés accueillants.
              </li>
              <li>
                <strong>Musées :</strong> Explorez l'histoire et la culture
                locale dans les musées à proximité.
              </li>
              <li>
                <strong>Parcs :</strong> Profitez de la nature et de l'air frais
                dans les parcs environnants.
              </li>
              <li>
                <strong>Autres Attractions :</strong> Découvrez d'autres
                activités et lieux d'intérêt pour compléter votre journée.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
