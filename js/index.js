// slidebar
document.getElementById("toggleSidebar").onclick = function () {
    document.getElementById("sidebar").classList.toggle("active");
};


// para 
const apiKey = "eba8b9a7199efdcb0ca1f96879b83c44";
const container = document.getElementById("moviesContainer");
const searchInput = document.getElementById("searchInput");
const typemove = "YOUR_API_KEY"; 


// Fetch Movies
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

// display movies  Cards
function displayMovies(list) {
  container.innerHTML = "";

  list.forEach((movie) => {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "no-image.jpg";

    container.innerHTML += `
      <div class="col-md-3 col-sm-6">
        <div class="movie-card shadow-lg">

          <img src="${poster}" alt="Poster">

          <div class="movie-info w-100">
            <h5>${movie.title || movie.name}</h5>
            <p>${movie.overview?.slice(0, 80) || "No overview available"}...</p>
            <p>⭐ ${movie.vote_average}</p>
            <p>📅 ${movie.release_date || movie.first_air_date || "N/A"}</p>
          </div>

        </div>
      </div>
    `;
  });
}

// Load  movies 
getMovies(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);

// search movies
searchInput.addEventListener("input", async () => {
  const q = searchInput.value.trim();

  if (q.length === 0) {
    getMovies(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);
    return;
  }

  getMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${q}`
  );
});




// set movie
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

// catagory
function getCategory(type) {
  let url = "";

  switch (type) {
    case "now_playing":
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
      break;

    case "popular":
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
      break;

    case "top_rated":
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
      break;

    case "trending":
      url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
      break;

    case "upcoming":
      url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
      break;

    case "contact":
      alert("Contact page coming soon.");
      return;
  }

  getMovies(url);
}

//
document.querySelectorAll("#sidebar li").forEach(li => {
  li.addEventListener("click", () => {
    const type = li.getAttribute("data-type");
    getCategory(type);
  });
});



