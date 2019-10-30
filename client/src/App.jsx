import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import Home from './components/routes/Home'
import Header from './components/routes/Header'
import SignIn from './components/routes/SignIn'
import SignOut from './components/routes/SignOut'
import Landing from './components/routes/Landing'
import SignUp from './components/routes/SignUp'
import AuthContainer from './components/routes/AuthContainer'

class App extends Component {
	constructor() {
		super()

		this.state = {
			user: null
		}
	}

	setUser = (user) => this.setState({ user })

	clearUser = () => this.setState({ user: null })

	render() {
		const { user } = this.state
		// console.log(user)
		return (
			<>
				<Header user={user} />
				<main className='container'>
					<Switch>
						<Route
							exact
							path='/'
							render={user ? () => <Home /> : () => <Landing />}
						/>
						<Route
							path='/sign-in'
							render={(props) => <SignIn {...props} setUser={this.setUser} />}
						/>
						<Route
							path='/sign-up'
							render={(props) => <SignUp {...props} setUser={this.setUser} />}
						/>
						<Route
							exact
							path='/sign-out'
							render={(props) => (
								<SignOut {...props} clearUser={this.clearUser} user={user} />
							)}
						/>
						<AuthContainer user={user} />
					</Switch>
				</main>
			</>
		)
	}
}

export default withRouter(App)
