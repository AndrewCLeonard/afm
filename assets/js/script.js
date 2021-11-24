var selectors = {};
var classes = {};
var data = {};

// DOM REFERENCES START VVV----------------------------------------------------------------VVV

// queryFormEl is the entire form element
var queryFormEl = document.querySelector("#query-form");

// queryInputEl is the text input
var queryInputEl = document.querySelector("#query-input");

// LAYOUT: selector to create div where movie search results will be displayed
var movieContainerEl = document.querySelector("#movies-container");

// selector for movie search term
var movieSearchTerm = document.querySelector("#movie-search-term");

// for manipulating any eventual data labels on buttons
var querySearchOption = document.querySelector("#query-search-option");

// DOM REFERENCES END ^^^----------------------------------------------------------------^^^

// FUNCTION SECTION START VVV----------------------------------------------------------------VVV

// step #3: `formSubmitHandler` sends search query as parameter to `getMovieInfo` here.
// this uses API `fetch` request to get movie titles w/ related data as JSON
//
var getMovieInfo = function (movieSearchTerm) {
	// format the api url
	var apiUrl = "https://imdb-api.com/en/API/SearchMovie/k_vm8gj4hz/" + movieSearchTerm;

	// make a `get` request to url
	fetch(apiUrl).then(function (response) {
		// request was successful
		if (response.ok) {
			response.json().then(function (data) {
				console.log("api data = ", data);
				displayMovies(data, movieSearchTerm);
			});
		} else {
			alert("Unable to connect to Open Movie Database"); // ??? Not allowed to use `alerts` in this project?
		}
	});
};
// step #4:
// Create DOM elements from the JSON data acquired in `getMovieInfo` function
var displayMovies = function (movies, searchTerm) {
	// check if api search returned any results
	if (movies.length === 0) {
		movieContainerEl.textContent = "No movies found";
		return;
	}

	movieSearchTerm.textContent = searchTerm;

	// loop over api search results
	for (var i = 0; i < movies.length; i++) {
		// format how movie names are displayed as "TITLE (RELEASE YEAR)" by using `.fullTitle`
		var movieTitle = movies[i].fullTitle;

		// create container for each movie result
		var movieEl = document.createElement("a");
		/* ??? Add classes to turn each movie into a card */
		movieEl.classList = "";
		// set link for each card. ??? Link to the IMDb page showing full cast & crew?
		movieEl.setAttribute("href", "");

		// create a span element to hold movie info
		var movieTitleEl = document.createElement("span");
		movieTitleEl.textContent = movieTitle;

		// append to container
		movieEl.appentChild(movieTitleEl);
	}
};

// step #2: Captures form data and sends it to `getMovieInfo` for fetch request.     N.B. e = "event"
var formSubmitHandler = function (e) {
	// prevent page refresh
	e.preventDefault();

	// get value from input element
	var query = queryInputEl.value.trim(); // ??? `value` not working?

	if (query) {
		getMovieInfo(query);

		// clear old content
		queryInputEl.value = "";
		// movieContainerEl.textContent = ""; // ??? add back in once this section is ready
	} else {
		alert("Please enter a search term"); // ??? Not allowed to use alerts? Make it add this message to the DOM?
	}
};
// FUNCTION SECTION END ^^^----------------------------------------------------------------^^^

// EVENT LISTENERS START: event listeners for form & button container VVV----------------------------------------------------------------VVV
// step #1: when button is clicked, search term is submitted, and the text is sent to `formSubmitHandler
queryFormEl.addEventListener("submit", formSubmitHandler);
// EVENT LISTENERS END ^^^----------------------------------------------------------------^^^
