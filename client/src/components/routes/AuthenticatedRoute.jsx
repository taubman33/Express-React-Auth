import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './Auth'
const AuthenticatedRoute = ({
	component: Component,
	children,
	user,
	render,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (user && render) {
					return <Route {...rest} render={render} />
				} else {
					return (
						<Redirect
							to={{
								pathname: '/',
								state: {
									from: props.location
								}
							}}
						/>
					)
				}
			}}
		/>
	)
}

export default AuthenticatedRoute
