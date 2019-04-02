import auth0 from 'auth0-js';

export default class Auth {
	constructor(history) {
		this.history = history;
		this.auth0 = new auth0.WebAuth({
			domain: process.env.REACT_APP_AUTH0_DOMAIN,
			clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
			redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
			responseType: 'token id_token', //access token ==> authorization token to make api calls,  id_token ==> authentication token
			scope: 'openid profile email' // permissions
		});

		this.login = this.login.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
	}

	login() {
		this.auth0.authorize();
	}

	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (err) {
				alert(
					`Some error occured ${err.error}. Check console for details`
				);
				console.log(err);
			} else if (
				authResult &&
				authResult.accessToken &&
				authResult.idToken
			) {
				this.setSession(authResult);
			}
			this.history.push('/'); //React router redirect to home page
		});
	}

	setSession(authResult) {
		const expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		); //Calculate when token will expire
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
	}

	isAuthenticated() {
		return (
			new Date().getTime() <
			JSON.parse(localStorage.getItem('expires_at'))
		);
	}
}
