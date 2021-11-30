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

// step #4:
// Create DOM elements from the JSON data acquired in `getMovieInfo` function
var displayMovies = function (movies, searchTerm) {
	// check if api search returned any results
	if (!movies) {
		movieContainerEl.textContent = "No movies found";
		return;
	}

	movieSearchTerm.textContent = searchTerm;

	// loop over api search results
	for (var i = 0; i < movies.length; i++) {
		// format how movie names are displayed as "TITLE (RELEASE YEAR)" by using `.fullTitle`
		var movieTitle = movies[i].title;

		// create container for each movie result
		var movieEl = document.createElement("a");
		/* ??? Add classes to turn each movie into a card */
		movieEl.classList = "";
		// set link for each card. ??? Link to the IMDb page showing full cast & crew?
		movieEl.setAttribute("href", ""); // ??? Clicking on it shows a modal?

		// create a span element to hold movie info // ??? Is <span> (span is inline) *really* the best element to hold content? Using a <div> would provide block-level element
		// var movieTitleEl = document.createElement("span");
		movieEl.textContent = movieTitle;

		// append to container
		movieContainerEl.appendChild(movieEl);
		// movieEl.appentChild(movieTitleEl);
	}
};

/* step #2:
	- activated by `addEventListener` triggered when there's a "submit" anywhere on the form element
	Steps this function takes:
		- `preventDefault()` to page refresh
		- Takes string entered into form & trims extra spaces 
		- make sure it's valid
		- and send it to `getMovieInfo` for fetch request.     
		- N.B. e = "event"
 */
var formSubmitHandler = function (e) {
	// prevent page refresh
	e.preventDefault();

	// get value from input element
	var query = queryInputEl.value.trim();

	if (query) {
		getMovieInfo(query);
		console.log("getMovieInfo(query) = ", query);
		// clear old content
		queryInputEl.value = "";
		// movieContainerEl.textContent = ""; // ??? add back in once this section is ready
	} else {
		alert("Please enter a search term"); // ??? Not allowed to use alerts? Make it add this message to the DOM?
	}
	return query;
};

/* step #3: 
- `formSubmitHandler` sends search query as parameter to `getMovieInfo` here.
- this uses API `fetch` request to get movie titles w/ related data as JSON
- N.B. on lines 80 & 82, they're parameters, but the function call `displayMovies` has arguments */
var getMovieInfo = function (x) {
	// format the api url -- ??? test the optional chaining by intentionally goofing up the url
	var apiUrl = "https://imdb-api.com/en/API/SearchMovie/k_vm8gj4hz/" + x;

	// make a `get` request to url
	fetch(apiUrl).then(function (response) {
		// request was successful
		if (response.ok) {
			response.json().then(function (data) {
				console.log("api data = ", data);
				// question mark = "optional chain" ???
				displayMovies(data?.results, x); // Gotta get the locally scoped variable `query` into this function
			});
		} else {
			alert("Unable to connect to Open Movie Database"); // ??? Not allowed to use `alerts` in this project?
		}
	});
};

//Mobile Device: Collapsible SideNav
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

// FUNCTION SECTION END ^^^----------------------------------------------------------------^^^

// EVENT LISTENERS START: event listeners for form & button container VVV----------------------------------------------------------------VVV
// step #1: when button is clicked, search term is submitted, and the text is sent to `formSubmitHandler
queryFormEl.addEventListener("submit", formSubmitHandler);
// EVENT LISTENERS END ^^^----------------------------------------------------------------^^^
