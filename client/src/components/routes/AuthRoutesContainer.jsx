import React, { Component } from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import Item from './Item'
import Items from './Items'
import ItemCreate from './ItemCreate'
import ItemEdit from './ItemEdit'
import { getItems } from '../../services/items'

export default class AuthRoutesContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}

	async componentDidMount() {
		try {
			console.log('mounted routes')
			const items = await getItems()
			this.setState({ items })
		} catch (err) {
			console.error(err)
		}
	}

	addItem = (item) => this.setState({ items: [...this.state.items, item] })

	render() {
		const { user } = this.props
		const { items } = this.props
		return (
			<>
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
					render={(props) => <ItemCreate {...props} addItem={this.addItem} />}
				/>
			</>
		)
	}
}
