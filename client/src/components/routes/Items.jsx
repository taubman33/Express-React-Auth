import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
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
		if (this.state.items.length) {
			return this.state.items.map((item) => {
				return (
					<div className='item'>
						<h4>{item.title}</h4>
						<a href={item.link}>See More</a>
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
		// const items = this.state.items.map((item) => (
		// 	<li key={item.id}>
		// 		<Link to={`/items/${item.id}`}>{item.title}</Link>
		// 	</li>
		// ))

		return (
			<Layout>
				<h4>Items</h4>
				{this.renderItems()}
			</Layout>
		)
	}
}

export default Items
