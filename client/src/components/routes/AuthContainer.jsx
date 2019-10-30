import React, { Component } from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import Item from './Item'
import Items from './Items'
import ItemCreate from './ItemCreate'
import ItemEdit from './ItemEdit'

export default class AuthContainer extends Component {
	render() {
		const { user } = this.props
		return (
			<>
				<AuthenticatedRoute
					exact
					path='/items'
					user={user}
					render={(props) => <Items {...props} />}
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
					render={(props) => <ItemCreate {...props} />}
				/>
			</>
		)
	}
}
