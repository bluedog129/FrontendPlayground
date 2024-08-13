const $searchInput = document.querySelector(".search-bar input");
const $eventList = document.querySelector(".event-list");
const $pagination = document.querySelector(".pagination");

let currentCategory = ""; // 현재 렌더링 중인 영화 카테고리
let allMovies = []; // 현재 카테고리의 모든 영화를 저장하는 배열
let currentPage = 1; // 현재 페이지
const moviesPerPage = 20; // 페이지당 보여주는 영화 수

function fetchNowPlayingMovies(page = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQyNmNkY2U4NmExNGNhYjRkNzljZTRmZDNhYzczMCIsIm5iZiI6MTcyMzQ1MDQ3MS42MTU4MDQsInN1YiI6IjY2YjlhOWY0ODZjZDZjOWVjYmE4MDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5MqE7u7nSse6AZNP7FDX30_vIrItBdYeh0-50gwsGII",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

function fetchTopRatedMovies(page = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQyNmNkY2U4NmExNGNhYjRkNzljZTRmZDNhYzczMCIsIm5iZiI6MTcyMzQ1MDQ3MS42MTU4MDQsInN1YiI6IjY2YjlhOWY0ODZjZDZjOWVjYmE4MDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5MqE7u7nSse6AZNP7FDX30_vIrItBdYeh0-50gwsGII",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

function fetchUpcomingMovies(page = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQyNmNkY2U4NmExNGNhYjRkNzljZTRmZDNhYzczMCIsIm5iZiI6MTcyMzQ1MDQ3MS42MTU4MDQsInN1YiI6IjY2YjlhOWY0ODZjZDZjOWVjYmE4MDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJ