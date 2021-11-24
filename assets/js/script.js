var selectors = {};
var classes = {};
var data = {};

// DOM REFERENCES START VVV----------------------------------------------------------------VVV
// queryInputEl is the text input
var queryInputEl = document.querySelector("#query-input");
// queryFormEl is the entire form element
var queryFormEl = document.querySelector("#query-form");
// selector to create div where movie search results will be displayed
var movieContainerEl = document.querySelector("#movies-container");
// selector for movie search term
var movieSearchTerm = document.querySelector("#movie-search-term");
// for manipulating any eventual data labels on buttons
var querySearchOption = document.querySelector("#query-search-option");
// DOM REFERENCES END ^^^----------------------------------------------------------------^^^

// FUNCTION SECTION START VVV----------------------------------------------------------------VVV

//use API `fetch` request to get movie titles w/ related data as JSON
var getMovieInfo = function (movieSearchTerm) {
	// format the api url
	var apiUrl = "https://imdb-api.com/en/API/SearchMovie/k_vm8gj4hz/" + movieSearchTerm;

	// make a `get` request to url
	fetch(apiUrl).then(function (response) {
		// request was successful
		if (response.ok) {
			response.json().then(function (data) {
				console.log("data = ", data);
				displayMovies(data, user);
			});
		} else {
			alert("Unable to connect to Open Movie Database"); // ??? Not allowed to use `alerts` in this project?
		}
	});
};

// Create DOM eleents from the JSON data acquired in `getMovieInfo` function
var displayMovies = function (movies, searchTerm) {
	// check if api search returned any results
	if (movies.length === 0) {
		movieContainerEl.textContent = "No movies found";
		return;
	}

	movieSearchTerm.textContent = searchTerm;

	// loop over api search results
	for (var i = 0; i < movies.length; i++) {
		// format how movie names are displayed as "TITLE (RELEASE YEAR)"
		var movieTitle = movies[i].fullTitle;

		// create container for each movie result
		var movieEl = document.createElement("a");
		movieEl.classList = ""; /* ??? Add classes to turn each movie into a card */
		movieEl.setAttribute("href", "")
	}
};

// Captures form data and sends it to _____ function for fetch request.     N.B. e = "event"
var formSubmitHandler = function (e) {
	// prevent page refresh
	e.preventDefault();

	// get value from input element
	var query = queryInputEl.value.trim();
};
// FUNCTION SECTION END ^^^----------------------------------------------------------------^^^

// EVENT LISTENERS START: event listeners for form & button container VVV----------------------------------------------------------------VVV
queryFormEl.addEventListener("submit", formSubmitHandler);
// EVENT LISTENERS END ^^^----------------------------------------------------------------^^^
