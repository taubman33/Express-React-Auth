import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import Home from './components/routes/Home'
import Header from './components/routes/Header'
import AuthenticatedRoute from './components/routes/AuthenticatedRoute'
import SignIn from './components/routes/SignIn'
import SignOut from './components/routes/SignOut'
import Landing from './components/routes/Landing'
import Items from './components/routes/Items'
import Item from './components/routes/Item'
import ItemCreate from './components/routes/ItemCreate'
import ItemEdit from './components/routes/ItemEdit'
import SignUp from './components/routes/SignUp'

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
						<AuthenticatedRoute
							exact
							path='/items'
							user={user}
							render={() => <Items />}
						/>
						<AuthenticatedRoute
							exact
							path='/items/:id'
							user={user}
							render={() => <Item />}
						/>
						<AuthenticatedRoute
							exact
							user={user}
							path='/item/:id/edit'
							render={() => <ItemEdit />}
						/>
						<AuthenticatedRoute
							user={user}
							path='/create'
							render={(props) => <ItemCreate {...props} />}
						/>
					</Switch>
				</main>
			</>
		)
	}
}

export default withRouter(App)
