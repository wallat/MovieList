import React from 'react'
import { connect } from 'react-redux'
import components from 'components'

let createSetVisibilityFilterAction = function(filter) {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter: filter
	}
}

let SearchBarContainer = connect(
	function(state) {
		return {text: state.searchText}
	},
	function(dispatch) {
		return {
			onChangeSearchText: function(text) {
				dispatch({
					type: 'SET_SEARCH_TEXT',
					searchText: text
				})
			}
		}
	}
)(components.SearchBar)

let VisibleMovieListContainer = connect(
	function(state) {
		// get visible movies
		let movies = {}
		if (state.visibilityFilter=='MY_FAVORITES') { // only my favorite movies
			state.myFavoriteMovieIds.forEach(function(aMovieId) {
				movies[aMovieId] = state.movies[aMovieId];
			})
		} else if (state.visibilityFilter=='ALL_MOVIES'){ // all the movies
			if (state.searchText && state.searchText!='') { // Apply the search text
				Object.keys(state.movies).forEach(function(k) {
					let aMovie = state.movies[k];
					if (aMovie.name.toLowerCase().indexOf(state.searchText.toLowerCase())>-1) {
						movies[k] = aMovie;
					}
				})
			} else { // there's no search text, display all
				movies = state.movies;
			}
		}

		return {
			movies: movies,
			myFavoriteMovieIds: state.myFavoriteMovieIds,
			showMoveLeftRight: state.visibilityFilter=='MY_FAVORITES'
		}
	},
	function(dispatch) {
		return {
			onToogleFavorite: function(movieId) {
				dispatch({
					type: 'TOGGLE_MY_FAVORITE_MOVIE',
					movieId: movieId
				})
			},
			// @params direction string 'left' or 'right'
			onMoveFavorite: function(movieId, direction='left') {
				dispatch({
					type: 'MOVE_FAVORITE_MOVIE',
					movieId: movieId,
					direction: direction
				})
			}
		}
	}
)(components.MovieList)

let App = React.createClass({
	render: function() {
		return (
			<div className="page">
				<components.Tabs />
				{this.props.children}
				<div className="footer">
					@Up Chen
				</div>
			</div>
		)
	}
})

let AllMoviePage = function() {
	return (
		<div>
			<SearchBarContainer />
			<VisibleMovieListContainer />
		</div>
	)
}

let MyFavoritePage = function() {
	return (
		<div>
			<VisibleMovieListContainer />
		</div>
	)
}

module.exports = {
	createSetVisibilityFilterAction: createSetVisibilityFilterAction,
	AllMoviePage: AllMoviePage,
	MyFavoritePage: MyFavoritePage,
	App: App
}
