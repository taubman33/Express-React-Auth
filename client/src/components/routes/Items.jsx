import React, { Component } from 'react'
import Layout from '../shared/Layout'
import { getItems } from '../../services/items'

class Items extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}

	async componentDidMount() {
		console.log(this.props)
		try {
			if (!this.props.items) {
				const items = await getItems()
				this.setState({ items })
			}
		} catch (err) {
			console.error(err)
		}
	}
	renderButton = (id) => {
		const { history, match } = this.props
		if (this.props.user) {
			return (
				<button onClick={() => history.push(`${match.url}/${id}`)}>
					See More
				</button>
			)
		} else {
			return null
		}
	}

	renderItems = () => {
		if (this.props.items) {
			return this.props.items.map((item) => {
				return (
					<div className='item' key={item.id}>
						<h4>{item.title}</h4>
						{this.renderButton(item.id)}
					</div>
				)
			})
		}
		if (this.state.items.length) {
			return this.state.items.map((item) => {
				return (
					<div className='item' key={item.id}>
						<h4>{item.title}</h4>
						{this.renderButton(item.id)}
					</div>
				)
			})
		} else {
			return null
		}
	}

	render() {
		if (this.props.user) {
			return (
				<Layout>
					<h4>Items</h4>
					{!this.props.items && !this.state.items.length ? (
						<h3>No Items at this time.</h3>
					) : null}
					<div className='item-container'>{this.renderItems()}</div>
				</Layout>
			)
		} else {
			return (
				<div className='landing'>
					<h2>Welcome to the Items App!</h2>
					<div className='main'>
						{!this.props.items && !this.state.items.length ? (
							<h3>No Items at this time.</h3>
						) : null}
						<div className='item-container'>{this.renderItems()}</div>
					</div>
				</div>
			)
		}
	}
}

export default Items
