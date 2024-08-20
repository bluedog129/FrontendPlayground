import { API_KEY } from "./config.js";
import { showMovieDetails, initializeModal } from "./modal.js";

const $searchInput = document.querySelector(".search-bar input");
const $eventList = document.querySelector(".event-list");
const $pagination = document.querySelector(".pagination");
const $navLinks = document.querySelectorAll(".nav__link");

let currentDecade = "all";
let allMovies = [];
let currentPage = 1;
const moviesPerPage = 20;

function fetchMovies(decade, page = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=${page}`;

  if (decade !== "all") {
    const [startYear, endYear] = getYearRangeFromDecade(decade);
    url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
  } else {
    url += `&primary_release_date.lte=1999-12-31`;
  }

  console.log("Fetching URL:", url);

  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

function getYearRangeFromDecade(decade) {
  const decadeStart = parseInt(decade);
  return decade === "pre1950" ? [1900, 1949] : [decadeStart, decadeStart + 9];
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
  button.addEventListener("click", () => loadMovies(currentDecade, page));
  $pagination.appendChild(button);
}

function loadMovies(decade, page = 1) {
  currentPage = page;
  currentDecade = decade;

  console.log("Loading movies - Decade:", decade, "Page:", page);
  fetchMovies(decade, currentPage)
    .then((response) => {
      if (response.results && Array.isArray(response.results)) {
        console.log("Fetched movies:", response.results);
        allMovies = response.results;
        renderMovieList(allMovies);
        renderPagination(response.total_pages);
      } else {
        console.error("Unexpected response format:", response);
      }
    })
    .catch((error) => {
      console.error(`Error fetching movies:`, error);
    });
}

function filterInputMovies(searchTerm) {
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderMovieList(filteredMovies);
}

function resetToMain() {
  currentDecade = "all";
  currentPage = 1;
  $searchInput.value = "";
  loadMovies(currentDecade, currentPage);
}

document.getElementById("logoLink").addEventListener("click", function (e) {
  e.preventDefault();
  resetToMain();
});

$navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const decade = e.target.dataset.decade;
    loadMovies(decade);
  });
});

$searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  filterInputMovies(searchTerm);
});

function init() {
  resetToMain();
  initializeModal();
}

init();
