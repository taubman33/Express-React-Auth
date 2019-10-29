import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signInUser } from '../../services/auth'

class SignIn extends Component {
	constructor() {
		super()

		this.state = {
			username: '',
			password: ''
		}
	}

	handleChange = (event) =>
		this.setState({
			[event.target.name]: event.target.value
		})

	onSignIn = (event) => {
		event.preventDefault()

		const { history, setUser } = this.props

		signInUser(this.state)
			.then((res) => setUser(res.data.token))
			.then(() => history.push('/'))
			.catch((error) => {
				console.error(error)
				this.setState({ username: '', password: '' })
			})
	}

	render() {
		const { username, password } = this.state

		return (
			<div className='row'>
				<div className='form-container'>
					<h3>Sign In</h3>
					<form onSubmit={this.onSignIn}>
						<label>Username</label>
						<input
							required
							type='text'
							name='username'
							value={username}
							placeholder='Enter Username'
							onChange={this.handleChange}
						/>
						<label>Password</label>
						<input
							required
							name='password'
							value={password}
							type='password'
							placeholder='Password'
							onChange={this.handleChange}
						/>
						<button variant='primary' type='submit'>
							Submit
						</button>
					</form>
				</div>
			</div>
		)
	}
}

export default SignIn
