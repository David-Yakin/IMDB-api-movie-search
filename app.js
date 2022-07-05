import { IMDB_API_KEY } from "./env.js";
const button = document.getElementById("start-search");
const searchInput = document.getElementById("to-search");
const searchResults = document.getElementById("search-results");
const errorSpan = document.getElementById("error-span");

const MOVIES_URL = `https://imdb-api.com/en/API/SearchAll/${IMDB_API_KEY}`;
const noImagePic = "./images/movieNoImage.jpg";

searchInput.addEventListener("input", e => validateField(e.target.value));
button.addEventListener("click", startSearchingMovies);

function validateField(value) {
  const regex = /[^A-Za-z0-9 \s]/g;
  if (!value || value.match(regex)) {
    errorSpan.innerHTML = "Please insert a valid movie name";
    return button.setAttribute("disabled", "disabled");
  }
  errorSpan.innerHTML = "";
  button.removeAttribute("disabled");
}

getData("superman");

function startSearchingMovies() {
  const term = searchInput.value;
  getData(term);
}

async function getData(term) {
  try {
    const data = await fetch(`${MOVIES_URL}/${term}`);
    const { results } = await data.json();
    movieResults(results);
  } catch (err) {
    renderErrorPage();
  }
}

function movieResults(arrayOfMovies) {
  searchResults.innerHTML = "";
  for (let movie of arrayOfMovies) {
    renderCard(movie);
  }
}

function renderCard({ image, title, description }) {
  searchResults.innerHTML += `
  <div class="col my-2">
  <div class="card my-2" style="width: 18rem;">
      <img src="${image ? image : noImagePic}"
          class="card-img-top" alt="${title}">
      <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
      </div>
  </div>
</div>
  `;
}

function renderErrorPage() {
  searchResults.innerHTML = `
  <div class="container p-4 mb-4 bg-light rounded-3">
    <h2 class="display-4">
      <i class="fas fa-exclamation-triangle"></i> Error 404
    </h2>
    <h4 >Did not found the movie in IMDB</h4>
  </div>
  `;
}
