ctrl + % ouvre la consol
rsc = créer une function déjà nomée

Tout se passe dans SRC -> effacer tout sauf App.js et index.js


Mon starter pack pour demarrer app en react télécharger le répos et faire -> npm i

HAVE FUN !!

sass --watch src/styles/index.scss:./src/styles/styles.css





cord dans le backend faire ccette commande : 

php artisan config:publish cors


puis exemple de config : 

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});