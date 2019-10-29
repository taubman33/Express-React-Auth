import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import Home from './components/routes/Home'
import Header from './components/routes/Header'
import AuthenticatedRoute from './components/routes/AuthenticatedRoute'
import SignIn from './components/routes/SignIn'
import Landing from './components/routes/Landing'

class App extends Component {
	constructor() {
		super()

		this.state = {
			user: null,
			alerts: []
		}
	}

	setUser = (user) => this.setState({ user })

	clearUser = () => this.setState({ user: null })

	alert = ({ heading, message, variant }) => {
		this.setState({
			alerts: [...this.state.alerts, { heading, message, variant }]
		})
	}

	render() {
		const { alerts, user } = this.state
		console.log(user)
		return (
			<>
				<Header />
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
						{/* <AuthenticatedRoute
							user={user}
							render={() => (
								<Route exact path='/authenticated' render={() => <Home />} />
							)}
						/> */}
					</Switch>
				</main>
			</>
		)
	}
}

export default withRouter(App)
