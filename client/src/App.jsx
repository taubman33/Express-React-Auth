import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'

import AuthenticatedRoute from './components/routes/AuthenticatedRoute'
import AutoDismissAlert from './components/routes/AutoDismissAlert/AutoDismissAlert'
import Header from './components/routes/Header'
import SignUp from './components/routes/SignUp'
import SignIn from './components/routes/SignIn'
import SignOut from './components/routes/SignOut'
import ChangePassword from './components/routes/ChangePassword'

import Items from './components/routes/Items'
import Item from './components/routes/Item'
import ItemEdit from './components/routes/ItemEdit'
import ItemCreate from './components/routes/ItemCreate'
import Home from './components/routes/Home'

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

		return (
			<>
				<Header user={user} />
				{alerts.map((alert, index) => (
					<AutoDismissAlert
						key={index}
						heading={alert.heading}
						variant={alert.variant}
						message={alert.message}
					/>
				))}
				<main className='container'>
					<Switch>
						<Route exact path='/' render={Home} />
						{/* <Route
						exact
						path='/sign-up'
						render={() => <SignUp alert={this.alert} setUser={this.setUser} />}
					/>
					<Route
						path='/sign-in'
						render={() => <SignIn alert={this.alert} setUser={this.setUser} />}
					/>

					<AuthenticatedRoute
						user={user}
						path='/items'
						render={() => (
							<Items
								alert={this.alert}
								clearUser={this.clearUser}
								user={user}
							/>
						)}
					/>
					<AuthenticatedRoute
						user={user}
						path='/create-item'
						render={() => (
							<ItemCreate
								alert={this.alert}
								clearUser={this.clearUser}
								user={user}
							/>
						)}
					/>
					<AuthenticatedRoute
						user={user}
						path='/items/:id'
						render={() => (
							<Item alert={this.alert} clearUser={this.clearUser} user={user} />
						)}
					/>
					<AuthenticatedRoute
						user={user}
						path='/items/:id/edit'
						render={() => (
							<ItemEdit
								alert={this.alert}
								clearUser={this.clearUser}
								user={user}
							/>
						)}
					/>
					<AuthenticatedRoute
						user={user}
						path='/sign-out'
						render={() => (
							<SignOut
								alert={this.alert}
								clearUser={this.clearUser}
								user={user}
							/>
						)}
					/>
					<AuthenticatedRoute
						user={user}
						path='/change-password'
						render={() => <ChangePassword alert={this.alert} user={user} />}
          /> */}
					</Switch>
				</main>
			</>
		)
	}
}

export default withRouter(App)
