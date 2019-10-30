import React, { Component } from 'react'
import Layout from '../shared/Layout'
import { getItems } from '../../services/auth'

class Items extends Component {
	constructor(props) {
		super(props)
		this.state = {
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

	renderItems = () => {
		const { history } = this.props
		if (this.state.items.length) {
			return this.state.items.map((item) => {
				return (
					<div className='item' key={item.id}>
						<h4>{item.title}</h4>
						<button onClick={() => history.push(`/items/${item.id}`)}>
							See More
						</button>
					</div>
				)
			})
		} else {
			return (
				<div className='item'>
					<h3>No Items at this time.</h3>
				</div>
			)
		}
	}

	render() {
		return (
			<Layout>
				<h4>Items</h4>
				<div className='item-container'>{this.renderItems()}</div>
			</Layout>
		)
	}
}

export default Items
