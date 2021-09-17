// GLOBAL VARS
const genres = [];
let strBookmarks = localStorage.getItem("bookmarks") || "[]";
let bookmarks =  JSON.parse(strBookmarks) || [];
let movies = allmovies.slice(0,50);



// SEARCH FORM
const elMovieSearchForm = document.querySelector('.js-movie-search-form');
const elMovieSearchInput = elMovieSearchForm.querySelector('.js-movie-search-input');
const elGenresSelect = elMovieSearchForm.querySelector('select');
const elMinYearInput = elMovieSearchForm.querySelector('.js-start-year-input');
const elMaxYearInput = elMovieSearchForm.querySelector('.js-end-year-input');
const elSortSelect = elMovieSearchForm.querySelector('.js-sort-select');


// LISTS
const elMoviesList = document.querySelector('.movies__list');
const elWatchList = document.querySelector(".bookmarks");
const elWatchListOpenerBtn = document.querySelector(".js-movie-watch-list");


// TEMPLATE
const elMoviesItemTemplate = document.querySelector('#movies-item-template').content;
const elBookmarksTemplate = document.querySelector("#bookmarks-template").content;

// MODAL
const elMovieInfoModal = document.querySelector('.movie-info-modal');
const elMovieInfoModalTitle = elMovieInfoModal.querySelector('.movie-info-modal__title');
const elMovieInfoModalRating = elMovieInfoModal.querySelector('.movie-info-modal__rating');
const elMovieInfoModalYear = elMovieInfoModal.querySelector('.movie-info-modal__year');
const elMovieInfoModalDuration = elMovieInfoModal.querySelector('.movie-info-modal__duration');
const elMovieInfoModalIFrame = elMovieInfoModal.querySelector('.movie-info-modal__iframe');
const elMovieInfoModalCategories = elMovieInfoModal.querySelector('.movie-info-modal__categories');
const elMovieInfoModalSummary = elMovieInfoModal.querySelector('.movie-info-modal__summary');
const elMovieInfoModalImdbLink = elMovieInfoModal.querySelector('.movie-info-modal__imdb-link');


// FUNCTIONS
// ganrlarni qabul qilib olyabmiz
function getUniqueGenres () {
  movies.forEach(movie => {
    movie.categories.forEach(category => {
      if (!genres.includes(category)) {
        genres.push(category);
      }
    });
  });
  genres.sort();
}

//  Genrelarni arraydan hammasini olib janrlarga chiqaramiz
function showGenreOptions() {
  const elGenresFragment = document.createDocumentFragment();
  genres.forEach(genre => {
    const elGenreOption = document.createElement('option');
    elGenreOption.textContent = genre;
    elGenreOption.value = genre;
    elGenresFragment.appendChild(elGenreOption);
  });
  elGenresSelect.appendChild(elGenresFragment);
}

// HOURS TO MINUTES
function getHoursStringFromMinutes (minutes) {
  return `${Math.floor(minutes / 60)} hrs ${minutes % 60} mins`;
}
var b = new RegExp("","gi");
console.log(b);
// HAMMASINI KORSATISH
function showMovies (movies, searchWord) {
  elMoviesList.innerHTML = '';
  const elMoviesFragment = document.createDocumentFragment();
  for (let movie of movies) {
    const elNewMoviesItem = elMoviesItemTemplate.cloneNode(true);
    elNewMoviesItem.querySelector('.movie__img').src = movie.youtubePoster;
    elNewMoviesItem.querySelector('.movie__img').alt = `${movie.title} poster`;



    elNewMoviesItem.querySelector('.movie__title').innerHTML = movie.title;

     if (searchWord.source !=="(?:)" && searchWord) {
      elNewMoviesItem.querySelector('.movie__title').innerHTML = movie.title.replace(searchWord,`<mark class="p-0 bg-warning">${searchWord.source}</mark>`);
    }
    elNewMoviesItem.querySelector('.movie__rating').textContent = movie.imdbRating;
    elNewMoviesItem.querySelector('.movie__year').textContent = movie.year;
    elNewMoviesItem.querySelector('.movie__duration').textContent = getHoursStringFromMinutes(movie.runtime);
    elNewMoviesItem.querySelector('.movie__categories').textContent = movie.categories.join(', ');
    elNewMoviesItem.querySelector('.js-more-info-button').dataset.imdbId = movie.imdbId;
    elNewMoviesItem.querySelector('.movie__bookmark').dataset.bId = movie.imdbId;



    elMoviesFragment.appendChild(elNewMoviesItem);
  }

  elMoviesList.appendChild(elMoviesFragment);
}

function showBookmarksList(allbookmarks) {
  elWatchList.innerHTML = "";
  let elBookmarksFragment = document.createDocumentFragment();
  for (const bookmark of bookmarks) {
    // GETTING TEMPLATE FOR EVERY BOOKMARK WITH ALL HMTLS
    const elNewBookmarksItem = elBookmarksTemplate.cloneNode(true);

    // SETTING VALUES OF ARRAY THAT IS IN OBJECT
    elNewBookmarksItem.querySelector(".item-bookmarks__name").textContent = bookmark.title;
    elNewBookmarksItem.querySelector(".item-bookmarks__img").src = bookmark.youtubePoster;
    elNewBookmarksItem.querySelector(".item-bookmarks__cancel").dataset.imdbId = bookmark.imdbId;

    // ADDING TO FRAGMENT TO KEEP ALL ITEMS
    elBookmarksFragment.appendChild(elNewBookmarksItem);
  }
  // ADDING TO WATCH LIST
  elWatchList.appendChild(elBookmarksFragment);
}

// MODAL NI KORSATISHDA YORDAM BERUVCHI FUNCTION
function updateMovieInfoModal (imdbId) {
  const movie = movies.find(movie => movie.imdbId === imdbId);

  elMovieInfoModalTitle.textContent = movie.title;
  elMovieInfoModalRating.textContent = movie.imdbRating;
  elMovieInfoModalYear.textContent = movie.year;
  elMovieInfoModalDuration.textContent = getHoursStringFromMinutes(movie.runtime);
  elMovieInfoModalIFrame.src = `https://www.youtube-nocookie.com/embed/${movie.youtubeId}`;
  elMovieInfoModalCategories.textContent = movie.categories.join(', ');
  elMovieInfoModalSummary.textContent = movie.summary;
  elMovieInfoModalImdbLink.href = `https://www.imdb.com/title/${movie.imdbId}`;
}

// TOPIB BERADIGAN KINOLARNI FUNCTION
function findMovies (titleRegex) {
  return movies.filter(movie => {
    const meetsCriteria = movie.title.match(titleRegex) && (elGenresSelect.value === 'All' || movie.categories.includes(elGenresSelect.value)) && (elMinYearInput.value.trim() === '' || movie.year >= Number(elMinYearInput.value)) && (elMaxYearInput.value.trim() === '' || movie.year <= Number(elMaxYearInput.value));
    return meetsCriteria;
  });
}

// SORTING
function sortMovies(movies, sortType) {

  // AZ BILAN SORT QILISH
  if (sortType === 'az') {
    movies.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
  } else if (sortType === 'za') {
    movies.sort((a, b) => {
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    });
  } else if (sortType === 'rating_asc') {
    movies.sort((a, b) => a.imdbRating - b.imdbRating);
  } else if (sortType === 'rating_desc') {
    movies.sort((a, b) => b.imdbRating - a.imdbRating);
  } else if (sortType === 'year_asc') {
    movies.sort((a, b) => a.year - b.year);
  } else if (sortType === 'year_desc') {
    movies.sort((a, b) => b.year - a.year);
  }
}

// QIDIRISHDA SUBMIT BOLGAN HODISA
function onMovieSearchFormSubmit (evt) {
  evt.preventDefault();

  const titleRegex = new RegExp(elMovieSearchInput.value.trim(), 'gi');
  const foundMovies = findMovies(titleRegex);

  if (foundMovies.length > 0) {
    sortMovies(foundMovies, elSortSelect.value);
    showMovies(foundMovies, titleRegex);
  } else {
    elMoviesList.innerHTML = '<div class="col-12">No film found</div>';
  }
}

// LIST BOSGANDA BUTTON UCHUN HOLAT
function onMoviesListInfoButtonClick(evt) {
  if (evt.target.matches('.js-more-info-button')) {
    updateMovieInfoModal(evt.target.dataset.imdbId);
  }
  saveAndRemoveOnBookmarks(evt);
}

function onMovieInfoModalHidden () {
  elMovieInfoModalIFrame.src = '';
}

// ADDING AND REMOVING MOVIES TO WATCHLIST
function saveAndRemoveOnBookmarks(evt) {
  // CHECKING TO ADD TO WATCHLIST
  if(evt.target.matches(".js-movie-bookmark-add")){
    // CHANGING THE STYLE
    evt.target.classList.add("movie__bookmark--checked");
    evt.target.classList.add("js-movie-bookmark-remove");
    evt.target.classList.remove("js-movie-bookmark-add");
    // ADDING TO BOOKMARK LIST
    bookmarks.push(findBookmarkMovie(evt.target.dataset.bId));
     strBookmarks = JSON.stringify(bookmarks);
    localStorage.setItem("bookmarks", strBookmarks);
    console.log(localStorage.getItem("bookmarks"));
    return;
    // CHECKING TO REMOVE TO WATCHLIST
  } else if(evt.target.matches(".js-movie-bookmark-remove")) {
    // CHANGING STYLE OF WATCHLIST BTN
    evt.target.classList.remove("movie__bookmark--checked");
    evt.target.classList.remove("js-movie-bookmark-remove");
    evt.target.classList.add("js-movie-bookmark-add");
    // REMOVING FROM BOOKMARKS
    bookmarks.splice(findMovieBookmarIndex(evt.target.dataset.bId,1))
    strBookmarks = JSON.stringify(bookmarks);
    localStorage.setItem("bookmarks", strBookmarks);
    console.log(localStorage.getItem("bookmarks"));
    return;
  }



}

// FIND BOOKMARK MOVIE RETURN FOUND MOVIE
function findBookmarkMovie(getId) {
  return movies.find((movie) => movie.imdbId == getId);
}

// FIND BOOKMARK MOVIE INDEX
function findMovieBookmarIndex(getId) {
  return bookmarks.findIndex((movie) => movie.imdbId == getId);
}

// WATCH LIST ADDEVENTLISTENER
elWatchListOpenerBtn.addEventListener("click",function (evt) {
  console.log("hello");
  // SHOWING ALL FILLMS OF BOOKMARKS
  showBookmarksList(bookmarks);
})

elWatchList.addEventListener("click", (evt) =>{
  if(evt.target.matches(".item-bookmarks__cancel")){
    let index = findMovieBookmarIndex(evt.target.dataset.imdbId);
    bookmarks.splice(index,1);

    // CONVERTING BOOKMARKS TO STRING

    strBookmarks = JSON.stringify(bookmarks);
    localStorage.setItem("bookmarks", strBookmarks);
    showBookmarksList(bookmarks);
  }

})


// EVENT LISTENERS
elMoviesList.addEventListener('click', onMoviesListInfoButtonClick);

// Stop iframe video playback on modal hide
elMovieInfoModal.addEventListener('hidden.bs.modal', onMovieInfoModalHidden);

if (elMovieSearchForm) {
  elMovieSearchForm.addEventListener('submit', onMovieSearchFormSubmit);
}


// INITIATION
getUniqueGenres();
showGenreOptions();
showMovies(movies.slice(0, 10),"");



