import React from 'react'
import {Link} from 'react-router'

let Movie = React.createClass({
	render: function() {
		let style = {
			backgroundImage: 'url(' + this.props.path + ')'
		}

		return (
		  <div className="movie">
			<div className="poster-movie-image" style={style} title={this.props.name}></div>
			<div className="poster-movie-content">
				<div className={"action-button add-to-list" + (this.props.isFavorite ? ' active':'')}
					onClick={this.props.onToogleFavorite.bind(this, this.props.movieId)}>
					❤
				</div>
				<div className={"action-button move-left" + (this.props.showMoveLeftRight ? '' : ' hide')}
					onClick={this.props.onMoveFavorite.bind(this, this.props.movieId, 'left')}>
					<div className="revert">➜</div>
				</div>
				<div className={"action-button move-right" + (this.props.showMoveLeftRight ? '' : ' hide')}
					onClick={this.props.onMoveFavorite.bind(this, this.props.movieId, 'right')}>
					➜
				</div>
				<div className="movie-title">{this.props.name}</div>
			</div>
		  </div>
		)
	}
})

let MovieList = React.createClass({
	render: function() {
		let nodes = Object.keys(this.props.movies).map(function(k) {
			let movie = this.props.movies[k];
			return (
				<Movie
					key={k}
					movieId={k}
					path={"src/assets/images/"+movie.fileName}
					name={movie.name}
					isFavorite={this.props.myFavoriteMovieIds.indexOf(k)>-1}
					showMoveLeftRight={this.props.showMoveLeftRight}
					onToogleFavorite={this.props.onToogleFavorite}
					onMoveFavorite={this.props.onMoveFavorite}
				/>
			)
		}.bind(this))

		return (<div className="movie-list">{nodes}</div>)
	}
})


let Tabs = React.createClass({
	render: function() {
		return (
			<div className="tabs">
				<Link to='/AllMovies' activeClassName="active"> All Movies </Link>
				<Link to='/MyFavorites' activeClassName="active"> My Favorites </Link>
			</div>
		)
	}
})

let SearchBar = React.createClass({
	render: function() {
		return (
			<div className="search-bar">
				<input type="search" text={this.props.text} placeholder="Search movies ..." onChange={function(e) {
					this.props.onChangeSearchText(e.target.value.trim())
				}.bind(this)}/>
			</div>
		)
	}
})

module.exports = {
	Tabs: Tabs,
	SearchBar: SearchBar,
	MovieList: MovieList,
	Movie:　Movie
}
