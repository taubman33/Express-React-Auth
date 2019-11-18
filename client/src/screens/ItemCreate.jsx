import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../components/shared/ItemForm'
import Layout from '../components/shared/Layout'
import { createItem } from '../services/items'

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

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedItem = Object.assign(this.state.item, updatedField)

    this.setState({ item: editedItem })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addItem(this.state.item)
    createItem(this.state.item)
      .then(res =>
        res.status === 201
          ? this.setState({ createdItem: res.data.item })
          : null
      )
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
          cancelPath="/"
        />
      </Layout>
    )
  }
}

export default ItemCreate
