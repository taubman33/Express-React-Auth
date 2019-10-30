import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './routes/Home'
import Header from './routes/Header'
import SignIn from './routes/SignIn'
import SignOut from './routes/SignOut'
import Landing from './routes/Landing'
import SignUp from './routes/SignUp'
import AuthenticatedRoute from './routes/AuthenticatedRoute'
import Item from './routes/Item'
import Items from './routes/Items'
import ItemCreate from './routes/ItemCreate'
import ItemEdit from './routes/ItemEdit'
import { getItems } from '../services/items'

export default class Container extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			items: []
		}
	}

	async componentDidMount() {
		try {
			const items = await getItems()
			this.setState({ items })
		} catch (err) {
			console.error(err)
		}
	}

	addItem = (item) => this.setState({ items: [...this.state.items, item] })

	setUser = (user) => this.setState({ user })

	clearUser = () => this.setState({ user: null })

	render() {
		const { user, items } = this.state
		return (
			<>
				<Header user={user} />
				<main className='container'>
					<Switch>
						<Route
							exact
							path='/'
							render={(props) =>
								user ? <Home /> : <Landing {...props} items={items} />
							}
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
							render={(props) => <Items {...props} user={user} items={items} />}
						/>
						<AuthenticatedRoute
							exact
							path='/items/:id'
							user={user}
							render={(props) => <Item {...props} />}
						/>
						<AuthenticatedRoute
							exact
							user={user}
							path='/items/:id/edit'
							render={(props) => <ItemEdit {...props} />}
						/>
						<AuthenticatedRoute
							user={user}
							path='/create'
							render={(props) => (
								<ItemCreate {...props} addItem={this.addItem} />
							)}
						/>
					</Switch>
				</main>
			</>
		)
	}
}
