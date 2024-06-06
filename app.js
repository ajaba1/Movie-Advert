// step one
// we need a form

// steep 2
// creating a skeleton for the design

// step 3
// styling the website

// step 4

// connect our javascript
// 1- target out our imput field and
// Add a click event to the search botton

const TEXTINPUTFIELD = document.getElementById("text-input-field");
const searchBtn = document.getElementById("search-btn");
let MOVIE_INFO_CONTAINER = document.getElementById("movie-info-container");

console.log(TEXTINPUTFIELD);
console.log(searchBtn);

// create a function called getMovieInfo
const getMovieInfo = async (e) => {
  // this is to prevent the form from auto refreshing
  e.preventDefault();

  // movie title
  const movieTitle = TEXTINPUTFIELD.value.trim();
  console.log(movieTitle);
  MOVIE_INFO_CONTAINER.innerHTML = `<section class="flex justify-center max-w-[600px] bg-white p-4 rounded-md">
  <div class="loader"></div>
  <h1 class="text-[2rem] bg-white p-2 rounded-md">Getting Movie...</h1>
  </section>`;
  try {
    // make an https request to the movie api
    const data = await fetch(
      `http://www.omdbapi.com/?apikey=73f8062d&t=${movieTitle}`
    );

    const movieInfo = await data.json();
    console.log(movieInfo);

    // chech if movie was not found
    if (movieInfo.Error) {
      MOVIE_INFO_CONTAINER.innerHTML = `<h1 class="text-[4rem] text-red-400 bg-white">${movieInfo.Error}</h1>`;
      return;
    }
    // show the actual movie info
    MOVIE_INFO_CONTAINER.innerHTML = `<section
          class="flex flex-col lg:flex-row gap-5 max-w-[600px] w-full justify-between bg-white p-4 rounded-lg"
        >
          <div>
            <h2 class="text-3xl font-bold tracking-wider">${movieInfo.Title}</h2>
            <p><strong class="mr-2">Year:</strong>span>${movieInfo.Year}</span></p>
            <p>
              <strong class="mr-2">Releases:</strong
              ><span class="text-gray-500">${movieInfo.Released}</span>
            </p>
            <p>
              <strong class="mr-2">Duration:</strong
              ><span class="text-gray-500">${movieInfo.Runtime}</span>
            </p>
            <p>
              <strong class="mr-2">Genre:</strong
              ><span class="text-gray-500">${movieInfo.Genre}</span>
            </p>
            <p>
              <strong class="mr-2">Director:</strong
              ><span class="text-gray-500">director</span>
            </p>
            <p>
              <strong class="mr-2">Plot:</strong
              ><span class="text-gray-500">${movieInfo.Plot}</span>
            </p>
            <p>
              <strong class="mr-2">Award:</strong
              ><span class="text-gray-500">${movieInfo.Awards}</span>
            </p>
          </div>
          <div>
            <img
              class="max-w-[600px] w-full rounded-md"
              src=${movieInfo.Poster}
              alt="Movie Poster"
            />
          </div>
        </section>`;
  } catch (error) {
    console.log(error);
  }
};
searchBtn.addEventListener("click", getMovieInfo);
