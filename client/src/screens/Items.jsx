import React, { Component } from 'react'
import Layout from '../components/shared/Layout'
import { getItems } from '../services/items'

export default class Items extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }
  async componentDidMount() {
    this.fetchItems()
  }

  fetchItems = async () => {
    try {
      const items = await getItems()
      this.setState({ items })
    } catch (err) {
      console.error(err)
    }
  }
  renderButton = id => {
    if (this.props.user) {
      return (
        <button
          onClick={() =>
            this.props.history.push(`${this.props.match.url}/${id}`)
          }
        >
          See More
        </button>
      )
    } else {
      return null
    }
  }

  renderItems = () => {
    if (this.state.items.length) {
      return this.state.items.map(item => {
        return (
          <div className="item" key={item.id}>
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
    const { user, items } = this.props
    if (user) {
      return (
        <Layout>
          <h4>Items</h4>
          {!items ? <h3>No Items at this time.</h3> : null}
          <div className="item-container">{this.renderItems()}</div>
        </Layout>
      )
    } else {
      return (
        <div className="landing">
          <h2>Welcome to the Items App!</h2>
          <div className="main">
            {!this.state.items.length ? <h3>No Items at this time.</h3> : null}
            <div className="item-container">{this.renderItems()}</div>
          </div>
        </div>
      )
    }
  }
}
