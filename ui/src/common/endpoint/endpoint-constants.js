const METHOD_NAMES = [
    'searchMovie',
    'login',
    'register',
    'addMovieToWatchlist',
    'removeMovieFromWatchlist',
    'getAllWatchlistItemsFromUser',
    'addReview',
    'updateReview',
    'removeReview',
    'getAllReviewsFromUser',
    'getAllReviewsForMovie',
    'addList',
    'getList'
];

const PATHS = {
    LOGIN: 'login',
    REGISTER: 'register',
    SEARCH_MOVIE: 'searchMovie',
    ADD_USER_WATCHLIST: 'addMovieToWatchlist',
    REMOVE_USER_WATCHLIST: 'removeMovieFromWatchlist',
    GET_USER_WATCHLIST: 'getAllWatchlistItemsFromUser',
    ADD_REVIEW: 'addReview',
    UPDATE_REVIEW: 'updateReview',
    REMOVE_REVIEW: 'removeReview',
    GET_REVIEWS_USER: 'getAllReviewsFromUser',
    GET_REVIEWS_MOVIE: 'getAllReviewsForMovie',
    SAVE_LIST: 'addList',
    GET_LIST: 'getList'
};

export {
    METHOD_NAMES,
    PATHS
}
