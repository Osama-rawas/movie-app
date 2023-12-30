const APIURL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=8188f3eef73eaa3c3bb13b53e7a57033&page=2";
const APIkey = "8188f3eef73eaa3c3bb13b53e7a57033";
// https://api.themoviedb.org/3/movie/157336?api_key=8188f3eef73eaa3c3bb13b53e7a57033
// https://api.themoviedb.org/3/movie/157336/videos?api_key=8188f3eef73eaa3c3bb13b53e7a57033
const imgPath = "https://image.tmdb.org/t/p/w500";
// ||"https://image.tmdb.org/t/p/w1280" defferint in size
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?query=&include_adult=false&language=en-US&api_key=8188f3eef73eaa3c3bb13b53e7a57033&page=1";
const main = document.querySelector(".main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

console.log(main);
getMovies(APIURL);
async function getMovies(url) {
  const resp = await fetch(url);
  const respdata = await resp.json();
  showMovies(respdata.results);
  console.log(respdata.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    const { poster_path, original_title, vote_average, overview } = movie;
    const overViewText = overview;
    movieEl.innerHTML = `<img
    src="${imgPath + poster_path}"
    alt="${original_title}"
  />
  <div class="movie-info">
    <h3>${original_title}</h3>
    <span class='${getClassByRate(vote_average)}'>${vote_average.toFixed(
      1
    )}</span>
  </div>
  <div class='overview'>
  <h4>OverView:</h4>
  ${overViewText}
  </div>
    `;
    console.log(overViewText);

    main.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&api_key=8188f3eef73eaa3c3bb13b53e7a57033&page=1`;
  if (searchTerm) {
    getMovies(SEARCHAPI);

    search.value = "";
  }
});

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else return "red";
}
