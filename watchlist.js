let movie = localStorage.getItem("newArr");
let moviesArr = JSON.parse(movie);
function showMovies() {
  document.getElementById("watchlist").innerHTML = moviesArr.join("");
}
showMovies();

if (document.getElementById("watchlist").innerHTML) {
  document.querySelector(".list-title").style.display = "none";
  document.querySelector(".list-button").style.display = "none";
  document.getElementById("watchlist").style.marginTop = "30px";
  document
    .querySelectorAll(".plus")
    .forEach((item) => (item.style.display = "none"));
}

document.querySelectorAll(".minus").forEach((item, index) => {
  item.addEventListener("click", (e) => {
    item.parentElement.parentElement.parentElement.innerHTML = " ";
    moviesArr.splice(index, 1);
    if (moviesArr.length == 0) {
      document.querySelector(".list-button").style.display = "flex";
      document.querySelector(".list-title").style.display = "block";
    }
    localStorage.setItem("newArr", JSON.stringify(moviesArr));
  });
});
