import { API_KEY } from "./config.js";

function fetchMovieDetails(movieId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

function fetchMovieCredits(movieId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

function fetchRelatedMovies(movieId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

function fetchMovieTrailer(movieId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

function showMovieDetails(movieId) {
  const $modal = document.getElementById("movieModal");
  const $body = document.body;

  Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId),
    fetchRelatedMovies(movieId),
    fetchMovieTrailer(movieId),
  ])
    .then(([details, credits, relatedMovies, trailerData]) => {
      const $modalBackdrop = document.querySelector(".modal-backdrop");
      const $modalPoster = document.querySelector(".modal-poster");
      const $modalTitle = document.querySelector(".modal-title");
      const $modalYearRuntime = document.querySelector(".modal-year-runtime");
      const $modalRating = document.querySelector(".modal-rating");
      const $modalGenres = document.querySelector(".modal-genres");
      const $modalOverview = document.querySelector(".modal-overview");
      const $castList = document.querySelector(".cast-list");

      // 백드롭 이미지 처리
      if (details.backdrop_path) {
        $modalBackdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path})`;
      } else {
        $modalBackdrop.style.backgroundImage = "none";
        $modalBackdrop.style.backgroundColor = "#f0f0f0";
      }

      // 포스터 이미지 처리
      $modalPoster.src = details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : "./img/no_image.jpg";
      $modalPoster.onerror = function () {
        this.src = "./img/no_image.jpg";
        this.classList.add("no-image");
      };

      $modalTitle.textContent = details.original_title;
      $modalYearRuntime.textContent = `${new Date(
        details.release_date
      ).getFullYear()} | ${details.runtime} min`;
      $modalRating.textContent = `Rating: ${details.vote_average.toFixed(1)}`;
      $modalGenres.textContent = `Genres: ${details.genres
        .map((genre) => genre.name)
        .join(", ")}`;
      $modalOverview.textContent = details.overview;

      const topCast = credits.cast
        .filter((member) => member.known_for_department === "Acting")
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4);

      $castList.innerHTML = topCast
        .map(
          (member) => `
        <div class="cast-member">
          <img src="${
            member.profile_path
              ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
              : "./img/no_image.jpg"
          }" 
               alt="${member.name}"
               onerror="this.src='./img/no_image.jpg'; this.classList.add('no-image');">
          <p>${member.name}</p>
        </div>
      `
        )
        .join("");

      const $relatedMovies = document.querySelector(".related-movies");
      $relatedMovies.innerHTML = relatedMovies.results
        .slice(0, 4)
        .map(
          (movie) => `
          <div class="related-movie">
            <img src="${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                : "./img/no_image.jpg"
            }" 
                 alt="${movie.title}"
                 onerror="this.src='./img/no_image.jpg'; this.classList.add('no-image');">
            <p>${movie.title}</p>
          </div>
        `
        )
        .join("");

      const $trailerButton = document.querySelector(".trailer-button");
      const trailer = trailerData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        $trailerButton.style.display = "block";
        $trailerButton.onclick = () => {
          window.open(
            `https://www.youtube.com/watch?v=${trailer.key}`,
            "_blank"
          );
        };
      } else {
        $trailerButton.style.display = "none";
      }

      $modal.style.display = "block";
      $body.classList.add("modal-open");
    })
    .catch((err) => console.error(err));
}

function initializeModal() {
  const $modal = document.getElementById("movieModal");
  const $body = document.body;

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      $modal.style.display = "none";
      $body.classList.remove("modal-open");
    }
  });

  window.addEventListener("click", function (event) {
    if (event.target == $modal) {
      $modal.style.display = "none";
      $body.classList.remove("modal-open");
    }
  });
}

export { showMovieDetails, initializeModal };
