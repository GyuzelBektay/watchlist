const moviesList = document.getElementById("initial-list");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", () => {
  getData();
  if (idArr.length == 0) {
    moviesList.textContent = "wait...";
  }
  if (idArr.length > 0) {
    idArr = [];
  }
});

let idArr = [];

async function getData() {
  const searchWord = searchInput.value;
  let res = await fetch(
    `https://www.omdbapi.com/?s=${searchWord}&apikey=725421e8`
  );
  let data = await res.json();

  if (data.Response == "False") {
    moviesList.textContent = "no results found...";
  }

  const arr = data.Search;
  pushID(arr);
  getRest();
}

async function getRest() {
  let renderedInfo = [];
  for (let id of idArr) {
    let res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=725421e8`);
    let data = await res.json();
    renderedInfo.push(render([data]));
  }
  moviesList.innerHTML = renderedInfo;
}

function render(data) {
  const movies = data
    .map((item) => {
      return `<div class="flex-1">
               <div class="image-wrap">
                  <img class="movie-image" src="${item.Poster}">
              </div>
              <div class="movie-wrap">
                  <div class="movie-title">
                      <p>${item.Title}</p>
                      <i class="fa-regular fa-star"></i>
                      <p>${item.imdbRating}</p>
                  </div>
                  <div class="movie-description">
                      <p class="movie-dur">${item.Runtime}</p>
                      <p class="movie-type">${item.Genre}</p>
                      <i id="${item.imdbID}" class="fa-solid fa-circle-plus plus"></i>
                      <i id="${item.imdbID}" class="fa fa-minus-circle minus hidden"></i>
                      <p>Watchlist</p>
                  </div>
                  <p class="about-movie">${item.Plot}</p>
                  </div>
                  </div>`;
    })
    .join("");
  return movies;
}
function pushID(data) {
  for (let id of data.map((item) => item.imdbID)) {
    idArr.push(id);
  }
}

let newWatchList = [];

moviesList.addEventListener("click", (e) => {
  for (let id of idArr) {
    if (e.target.id == id) {
      newWatchList.push(id);
    }
  }

  document.querySelectorAll(".plus").forEach((item) => {
    if (e.target.id === item.id) {
      item.style.display = "none";
      document.querySelectorAll(".minus").forEach((item) => {
        if (e.target.id === item.id) {
          item.classList.remove("hidden");
        }
      });
    }
  });

  renderWatchList();
});

let newArr = [];

async function renderWatchList() {
  let renderedWatchList = [];
  for (let id of newWatchList) {
    let res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=725421e8`);
    let data = await res.json();
    renderedWatchList.push(render([data]));
  }
  newArr = Array.from(renderedWatchList);
  localStorage.setItem("newArr", JSON.stringify(newArr));
  console.log(newArr);
}
