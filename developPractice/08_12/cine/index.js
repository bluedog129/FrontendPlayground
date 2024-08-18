import { showMovieDetails, initializeModal } from "./modal.js";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQyNmNkY2U4NmExNGNhYjRkNzljZTRmZDNhYzczMCIsIm5iZiI6MTcyMzQ1MDQ3MS42MTU4MDQsInN1YiI6IjY2YjlhOWY0ODZjZDZjOWVjYmE4MDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5MqE7u7nSse6AZNP7FDX30_vIrItBdYeh0-50gwsGII";

const $searchInput = document.querySelector(".search-bar input");
const $eventList = document.querySelector(".event-list");
const $pagination = document.querySelector(".pagination");

let currentCategory = "";
let allMovies = [];
let currentPage = 1;
const moviesPerPage = 20;

function fetchMovies(category, page = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  let url;
  switch (category) {
    case "topRated":
      url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
      break;
    case "upComing":
      url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
      break;
    case "nowPlaying":
      url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
      break;
    default:
      console.error("Invalid category");
      return Promise.reject("Invalid category");
  }

  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

function renderMovieList(movies) {
  $eventList.innerHTML = "";
  movies.forEach((movie) => {
    const $listItem = document.createElement("li");
    $listItem.className = "event-item";
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "./img/no_image.jpg";
    $listItem.innerHTML = `
      <div class="event-item-image">
        <img src="${imageUrl}" alt="${movie.title}" class="${
      movie.poster_path ? "" : "no-image"
    }" onerror="this.src='./img/no_image.jpg'; this.classList.add('no-image');" />
      </div>
      <div class="event-item-content">
        <h3>${movie.title}</h3>
        <p class="rating">Rating: ${movie.vote_average.toFixed(1)}</p>
        <p class="release-date">Release Date: ${movie.release_date}</p>
      </div>
    `;
    $listItem.addEventListener("click", () => showMovieDetails(movie.id));
    $eventList.appendChild($listItem);
  });
}

function renderPagination(totalPages) {
  $pagination.innerHTML = "";
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  addPageButton("&lt;&lt;", 1);
  addPageButton("&lt;", Math.max(1, currentPage - 1));

  for (let i = startPage; i <= endPage; i++) {
    addPageButton(i, i, i === currentPage);
  }

  addPageButton("&gt;", Math.min(totalPages, currentPage + 1));
  addPageButton("&gt;&gt;", totalPages);
}

function addPageButton(text, page, isActive = false) {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.classList.add("page-button");
  if (isActive) {
    button.classList.add("active");
  }
  button.addEventListener("click", () => loadMovies(currentCategory, page));
  $pagination.appendChild(button);
}

function loadMovies(category, page = 1) {
  currentPage = page;
  currentCategory = category;

  fetchMovies(category, currentPage)
    .then((response) => {
      if (response.results && Array.isArray(response.results)) {
        allMovies = response.results;
        renderMovieList(allMovies);
        renderPagination(response.total_pages);
      } else {
        console.error("Unexpected response format:", response);
      }
    })
    .catch((error) => {
      console.error(`Error fetching ${category} movies:`, error);
    });
}

function filterInputMovies(searchTerm) {
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderMovieList(filteredMovies);
}

document.getElementById("topRated").addEventListener("click", (e) => {
  e.preventDefault();
  loadMovies("topRated");
});

document.getElementById("upComing").addEventListener("click", (e) => {
  e.preventDefault();
  loadMovies("upComing");
});

document.getElementById("nowPlaying").addEventListener("click", (e) => {
  e.preventDefault();
  loadMovies("nowPlaying");
});

$searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  filterInputMovies(searchTerm);
});

function init() {
  loadMovies("topRated");
  initializeModal();
}

init();
