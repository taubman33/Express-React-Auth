import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'
const AuthenticatedRoute = ({
	component: Component,
	children,
	user,
	render,
	...rest
}) => {
	if (user && render) {
		return <Route {...rest} render={render} />
	} else {
		return (
			<Route
				{...rest}
				render={(props) =>
					user ? <Component {...props} /> : <Redirect to='/' />
				}
			/>
		)
	}
}

export default AuthenticatedRoute
