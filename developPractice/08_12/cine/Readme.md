# CINE : Movie Rangking

이 웹사이트는 사용자에게 실시간 영화 정보를 제공하는 플랫폼입니다. <br>
현재 개봉 중인 영화, 인기 영화 순위, 평점 등을 실시간으로 업데이트하여 사용자에게 전달합니다. <br>
이를 통해 사용자는 보다 신속하고 편리하게 최신 영화 정보를 확인할 수 있습니다. <br>

## 핵심 서비스

- 실시간 개봉 중 영화, 개봉 예정 영화에 대한 정보 제공
- 평점을 기준으로 영화 순위를 정렬하여 제공
- 연도 별로 영화를 필터 해주는 기능 (마찬가지로 평점을 기준으로 정렬되어 제공)
- 각 영화 별 상세 정보 제공 (장르, 평점, 트레일러, 개봉연도, 출연진 등)

## 주요 기능 구현 과정

### API 사용

- API 키 준비

```
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQyNmNkY2U4NmExNGNhYjRkNzljZTRmZDNhYzczMCIsIm5iZiI6MTcyMzQ1MDQ3MS42MTU4MDQsInN1YiI6IjY2YjlhOWY0ODZjZDZjOWVjYmE4MDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5MqE7u7nSse6AZNP7FDX30_vIrItBdYeh0-50gwsGII",
    },
  };
```

TMDB API를 사용하기 위해서는 유효한 API 키가 필요합니다. API 키는 TMDB 웹사이트에서 계정을 만들고 발급받을 수 있습니다.

- fetchTopRatedMovies 함수 동작 설명

```
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
```

이 코드는 Promise 체인을 사용하여 비동기 작업을 처리합니다. API 요청이 성공하면 JSON 데이터를 반환하고, 실패하면 오류를 던집니다. 이를 통해 함수를 호출하는 쪽에서 .then()과 .catch()를 사용하여 성공과 실패 케이스를 모두 처리할 수 있습니다.
<br><br>
위와 같은 과정으로 Upcoming, Now playing 과 같은 나머지 데이터도 불러옵니다.

### 카테고리 업데이트 (Top rated, Upcoming, Now playing을 누를 때 마다 해당 리스트 가져오도록 구현)

```
// topRated 카테고리 이벤트
document.getElementById("topRated").addEventListener("click", (e) => {
  e.preventDefault();
  loadMovies("topRated");
});
```

Upcoming, Now playing 또한 같은 코드로 이벤트를 적용합니다. <br>
여기서 loadMovies함수에 각 카테고리 문자열을 인자로 보내는 것이 중요합니다.<br>

```
function loadMovies(category, page = 1) {
  // 페이지 업데이트
  currentPage = page;

  let fetchFunction;
  switch (category) {
    case "topRated":
      fetchFunction = fetchTopRatedMovies;
      break;
    case "upComing":
      fetchFunction = fetchUpcomingMovies;
      break;
    case "nowPlaying":
      fetchFunction = fetchNowPlayingMovies;
      break;
    default:
      console.error("Invalid category");
      return;
  }
```

이 함수는 인자로 전달된 category에 따라 어떤 API를 호출할지를 결정합니다. switch 문을 사용하여 카테고리에 해당하는 API 호출 함수를 fetchFunction에 할당합니다.<br>

```
  fetchFunction(currentPage)
    .then((response) => {
      if (response.results && Array.isArray(response.results)) {
        allMovies = response.results;
        renderMovieList(allMovies);
        renderPagination(response.total_pages);
        currentCategory = category; // 카테고리 업데이트
      } else {
        console.error("Unexpected response format:", response);
      }
    })
    .catch((error) => {
      console.error(`Error fetching ${category} movies:`, error);
    });
```

API 호출이 성공하면, 가져온 영화 데이터(response.results)를 allMovies에 저장하고, 이를 화면에 렌더링합니다(renderMovieList 함수 호출).<br>
영화 목록과 함께 페이지네이션을 렌더링하는 renderPagination 함수도 호출됩니다.<br>
마지막으로, currentCategory 변수를 업데이트하여 현재 선택된 카테고리를 저장합니다.<br>

```
function renderMovieList(movies) {
  $eventList.innerHTML = ""; // 기존 내용을 지우고 새로 렌더링
  movies.forEach((movie) => {
    const $listItem = document.createElement("li");
    $listItem.className = "event-item";
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "./no_image.jpg";
    $listItem.innerHTML = `
      <img src="${imageUrl}" alt="${movie.title}" onerror="this.src='./img/no_image.jpg';" />
      <div class="event-item-content">
        <h3>${movie.title}</h3>
        <p class="rating">Rating: ${movie.vote_average}</p>
        <p class="release-date">Release Date: ${movie.release_date}</p>
      </div>
    `;
    $eventList.appendChild($listItem);
  });
}

```

마지막으로 가져온 영화 데이터를 화면에 렌더링하는 함수입니다.<br><br>

### 페이지네이션(pagination) 구현

페이지네이션은 사용자가 한 번에 표시할 수 있는 영화 수를 제한하고, 여러 페이지에 걸쳐 영화를 나누어 볼 수 있게 하는 기능입니다.<br>

- renderPagination(totalPages)

```
function renderPagination(totalPages) {
  $pagination.innerHTML = "";
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // First page button
  addPageButton("&lt;&lt;", 1);

  // Previous page button
  addPageButton("&lt;", Math.max(1, currentPage - 1));

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    addPageButton(i, i, i === currentPage);
  }

  // Next page button
  addPageButton("&gt;", Math.min(totalPages, currentPage + 1));

  // Last page button
  addPageButton("&gt;&gt;", totalPages);
}
```

이 함수는 총 페이지 수(totalPages)를 받아, 현재 페이지(currentPage)를 기준으로 최대 5개의 페이지 번호 버튼을 생성합니다.<br>
startPage는 표시할 첫 번째 페이지 번호를 의미하며, 현재 페이지에서 앞뒤로 일정 범위의 페이지를 표시합니다.<br>
endPage는 표시할 마지막 페이지 번호를 의미하며, startPage에서 5개의 페이지를 표시하되, 총 페이지 수를 초과하지 않도록 합니다.<br>
첫 페이지 (<<), 이전 페이지 (<), 다음 페이지 (>), 마지막 페이지 (>>) 버튼도 생성하여 사용자가 페이지 간에 쉽게 이동할 수 있도록 합니다.<br><br>

addPageButton() <br>
이 함수는 페이지 버튼을 실제로 생성하고, 클릭 이벤트를 추가하여 페이지 전환을 가능하게 합니다.

```
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
```

초기화: init() 함수가 호출되어 초기 카테고리(Top Rated)의 첫 번째 페이지가 로드됩니다.<br>
페이지네이션 렌더링: 첫 페이지 로드 후, 페이지네이션 버튼들이 화면에 표시됩니다.<br>
페이지 전환: 사용자가 페이지네이션 버튼을 클릭하면 loadMovies 함수가 호출되어 해당 페이지의 영화 목록이 로드되고, 페이지네이션 버튼이 다시 렌더링됩니다.<br>

### 연도 별로 영화를 필터 해주는 기능

API 요청 시 연도 필터링 <br>

- 사용자가 특정 연대를 선택하면, 해당 연대에 맞는 영화 데이터가 API를 통해 필터링되어 요청됩니다. <br>
  연대는 primary_release_date.gte 및 primary_release_date.lte 매개변수를 통해 지정된 범위로 설정됩니다.<br>

```
  function fetchMovies(category, page = 1, decade = "") {
    let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`;

    if (decade && decade !== "") {
      const [startYear, endYear] = getYearRangeFromDecade(decade);
      url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    }
    // 나머지 API URL 구성 로직...
  }

  function getYearRangeFromDecade(decade) {
    const decadeStart = parseInt(decade);
    return decade === "pre1950"
      ? [1900, 1949] // 1950년대 이전
      : [decadeStart, decadeStart + 9];
  }
```

### 각 영화 별 상세 정보 (장르, 평점, 트레일러, 개봉연도, 출연진 등)

- 영화 상세정보 API 호출

사용자가 특정 영화를 클릭하면 해당 영화의 ID를 이용해 TMDB API를 호출하여 영화의 세부 정보를 가져옵니다.<br>
이 API 호출은 영화의 기본 정보, 출연진, 관련 영화, 트레일러를 포함하여 다양한 데이터를 가져오도록 구성됩니다.<br>

```
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
```

- 영화 상세 정보 표시

Modal을 통한 정보 표시
위에서 가져온 데이터를 바탕으로, showMovieDetails 함수는 모달 창을 통해 영화의 상세 정보를 사용자에게 제공합니다.<br>
이 모달에는 영화의 포스터, 제목, 개봉연도, 평점, 장르, 개요, 출연진, 관련 영화, 트레일러 등이 포함됩니다.<br>

```
function showMovieDetails(movieId) {
  const $modal = document.getElementById("movieModal");

  Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId),
    fetchRelatedMovies(movieId),
    fetchMovieTrailer(movieId),
  ])
    .then(([details, credits, relatedMovies, trailerData]) => {
      // 모달 데이터 표시 로직
    })
    .catch((err) => console.error(err));
}
```

이 기능은 사용자가 특정 영화를 클릭했을 때, 영화에 대한 종합적인 정보를 제공하여 사용자가 영화 선택을 더 쉽게 할 수 있도록 돕습니다.<br>

## 활용 API

https://api.themoviedb.org/3/movie
