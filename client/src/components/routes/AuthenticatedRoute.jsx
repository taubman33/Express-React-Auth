import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import auth from './Auth'
const AuthenticatedRoute = ({
	component: Component,
	children,
	user,
	render,
	...rest
}) => {
	console.log(rest)
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
