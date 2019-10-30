import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../shared/ItemForm'
import Layout from '../shared/Layout'
import { addItem } from '../../services/items'

class ItemCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			item: {
				title: '',
				link: ''
			},
			createdItem: null
		}
	}

	handleChange = (event) => {
		const updatedField = { [event.target.name]: event.target.value }

		const editedItem = Object.assign(this.state.item, updatedField)

		this.setState({ item: editedItem })
	}

	handleSubmit = (event) => {
		event.preventDefault()

		addItem(this.state.item)
			.then((res) => this.setState({ createdItem: res.item }))
			.catch(console.error)
	}

	render() {
		const { handleChange, handleSubmit } = this
		const { createdItem, item } = this.state
		const { history } = this.props

		if (createdItem) {
			return <Redirect to={`/items`} />
		}

		return (
			<Layout>
				<ItemForm
					item={item}
					history={history}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					cancelPath='/'
				/>
			</Layout>
		)
	}
}

export default ItemCreate
