var selectors = {};
var classes = {};
var data = {};

// DOM REFERENCES START VVV----------------------------------------------------------------VVV
// queryInputEl is the text input
var queryInputEl = document.querySelector("#query-input");
// queryFormEl is the entire form element
var queryFormEl = document.querySelector("#query-form");
// for manipulating any eventual data labels on buttons
var querySearchOption = document.querySelector("#query-search-option");
// DOM REFERENCES END ^^^----------------------------------------------------------------^^^

// FUNCTION SECTION START VVV----------------------------------------------------------------VVV

var getMovieInfo = function (query) {
	// format the api url
	var apiUrl = "https://imdb-api.com/en/API/SearchMovie/k_vm8gj4hz/" + query;
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
