import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signInUser } from '../../services/auth'

class SignUp extends Component {
	constructor() {
		super()

		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		}
	}

	handleChange = (event) =>
		this.setState({
			[event.target.name]: event.target.value
		})

	onSignUp = (event) => {
		event.preventDefault()

		const { alert, history, setUser } = this.props

		signUp(this.state)
			.then(() => signInUser(this.state))
			.then((res) => setUser(res.data.user))
			.then(() => history.push('/'))
			.catch((error) => {
				console.error(error)
				this.setState({ email: '', password: '', passwordConfirmation: '' })
			})
	}

	render() {
		const { email, username, password, passwordConfirmation } = this.state

		return (
			<div className='row'>
				<div className='col-sm-10 col-md-8 mx-auto mt-5'>
					<h3>Sign Up</h3>
					<form onSubmit={this.onSignUp}>
						<label>Username</label>
						<input
							required
							type='text'
							name='username'
							value={username}
							placeholder='Enter username'
							onChange={this.handleChange}
						/>
						<label>Email address</label>
						<input
							required
							type='email'
							name='email'
							value={email}
							placeholder='Enter email'
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
						<label>Password Confirmation</label>
						<input
							required
							name='passwordConfirmation'
							value={passwordConfirmation}
							type='password'
							placeholder='Confirm Password'
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

export default withRouter(SignUp)
