import Movies from './movies'

const initialState = {
	visibilityFilter: 'ALL_MOVIES', // ALL_MOVIES or MY_FAVORITES
	searchText: '',
	myFavoriteMovieIds: JSON.parse(localStorage.getItem('myFavoriteMovieIds') || '[]'),
	movies: Movies
}

// reducers
export default function(state=initialState, action) {
	switch (action.type) {
		case 'SET_SEARCH_TEXT':
			return Object.assign({}, state, {searchText: action.searchText})

		case 'SET_VISIBILITY_FILTER':
			return Object.assign({}, state, {visibilityFilter: action.filter})

		case 'TOGGLE_MY_FAVORITE_MOVIE':
			let newFavoriteMovieIds

			if (state.myFavoriteMovieIds.indexOf(action.movieId)>-1) {
				// remove from list
				newFavoriteMovieIds = state.myFavoriteMovieIds.filter(function(aMovieId) {
					return aMovieId!=action.movieId
				})
			} else {
				// add to list
				newFavoriteMovieIds = [action.movieId, ...state.myFavoriteMovieIds] // push to head
			}

			localStorage.setItem('myFavoriteMovieIds', JSON.stringify(newFavoriteMovieIds));
			return Object.assign({}, state, {myFavoriteMovieIds: newFavoriteMovieIds})

		case 'MOVE_FAVORITE_MOVIE':
			let foundIndex = state.myFavoriteMovieIds.indexOf(action.movieId)

			if (foundIndex>-1) {
				let newFavoriteMovieIds = [...state.myFavoriteMovieIds], // copy
					hold

				if (action.direction=='left' && foundIndex>0) { // move left
					hold = newFavoriteMovieIds[foundIndex-1]
					newFavoriteMovieIds[foundIndex-1] = newFavoriteMovieIds[foundIndex]
					newFavoriteMovieIds[foundIndex] = hold
				} else if (action.direction=='right' && foundIndex<newFavoriteMovieIds.length-1) { // move right
					hold = newFavoriteMovieIds[foundIndex+1]
					newFavoriteMovieIds[foundIndex+1] = newFavoriteMovieIds[foundIndex]
					newFavoriteMovieIds[foundIndex] = hold
				}

				localStorage.setItem('myFavoriteMovieIds', JSON.stringify(newFavoriteMovieIds));
				return Object.assign({}, state, {myFavoriteMovieIds: newFavoriteMovieIds})
			}

		default:
			return state
	}
}
