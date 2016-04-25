import 'styles/main';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, IndexRoute, Link, hashHistory, IndexRedirect } from 'react-router'
import reducers from 'reducers'
import components from 'components'
import containers, {createSetVisibilityFilterAction} from 'containers'

let store = createStore(reducers)

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={containers.App}>
				<IndexRedirect to="/AllMovies" />
				<Route
					path="/AllMovies"
					component={containers.AllMoviePage}
					onEnter={function() {store.dispatch(createSetVisibilityFilterAction('ALL_MOVIES'))}}
				/>
				<Route
					path="/MyFavorites"
					component={containers.MyFavoritePage}
					onEnter={function() {store.dispatch(createSetVisibilityFilterAction('MY_FAVORITES'))}}
				/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
