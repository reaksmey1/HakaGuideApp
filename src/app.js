import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;