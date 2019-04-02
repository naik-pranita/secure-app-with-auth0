import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home';
import { Route } from 'react-router-dom';
import Profile from './components/profile/Profile';
import Nav from './components/nav/Nav';
import Auth from './auth/Auth';
import Callback from './Callback';

class App extends Component {
	constructor(props) {
		super(props);
		this.auth = new Auth(this.props.history); //Auto inject history from react router
	}

	render() {
		return (
			<div className="App">
				<Nav />
				<Route
					exact
					path="/"
					render={props => <Home auth={this.auth} {...props} />}
				/>
				<Route
					path="/callback"
					render={props => <Callback auth={this.auth} {...props} />}
				/>
				<Route path="/profile" component={Profile} />
			</div>
		);
	}
}

export default App;
