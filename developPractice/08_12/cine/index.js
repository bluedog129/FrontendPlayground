function fetchNowPlayingMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQyNmNkY2U4NmExNGNhYjRkNzljZTRmZDNhYzczMCIsIm5iZiI6MTcyMzQ1MDQ3MS42MTU4MDQsInN1YiI6IjY2YjlhOWY0ODZjZDZjOWVjYmE4MDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5MqE7u7nSse6AZNP7FDX30_vIrItBdYeh0-50gwsGII",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

function fetchTopRatedMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQyNmNkY2U4NmExNGNhYjRkNzljZTRmZDNhYzczMCIsIm5iZiI6MTcyMzQ1MDQ3MS42MTU4MDQsInN1YiI6IjY2YjlhOWY0ODZjZDZjOWVjYmE4MDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5MqE7u7nSse6AZNP7FDX30_vIrItBdYeh0-50gwsGII",
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

function fetchUpcomingMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQyNmNkY2U4NmExNGNhYjRkNzljZTRmZDNhYzczMCIsIm5iZiI6MTcyMzQ1MDQ3MS42MTU4MDQsInN1YiI6IjY2YjlhOWY0ODZjZDZjOWVjYmE4MDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5MqE7u7nSse6AZNP7FDX30_vIrItBdYeh0-50gwsGII",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

function renderMovieList(movies) {
  const eventList = document.querySelector(".event-list");
  eventList.innerHTML = ""; // 기존 내용을 지우고 새로 렌더링
  movies.forEach((movie) => {
    const listItem = document.createElement("li");
    listItem.className = "event-item";
    listItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <div class="event-item-content">
        <h3>${movie.title}</h3>
        <p class="rating">Rating: ${movie.vote_average}</p>
        <p class="release-date">Release Date: ${movie.release_date}</p>
      </div>
    `;
    eventList.appendChild(listItem);
  });
}

function init() {
  fetchTopRatedMovies()
    .then((response) => {
      if (response.results && Array.isArray(response.results)) {
        renderMovieList(response.results);
      } else {
        console.error("Unexpected response format:", response);
      }
    })
    .catch((error) => {
      console.error("Error fetching top rated movies:", error);
    });
}

init();
