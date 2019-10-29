import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../shared/Navbar.jsx'
import Nav from '../shared/Nav'
const authenticatedOptions = (
	<Fragment>
		<Nav />
		<NavLink to='/change-password'>Change Password</NavLink>
		<NavLink to='/sign-out'>Sign Out</NavLink>
	</Fragment>
)

const unauthenticatedOptions = (
	<Fragment>
		<NavLink to='/sign-up'>Sign Up</NavLink>
		<NavLink to='/sign-in'>Sign In</NavLink>
	</Fragment>
)

const alwaysOptions = (
	<Fragment>
		<NavLink to='/'>Home</NavLink>
	</Fragment>
)

const Header = ({ user }) => (
	<Navbar>
		{user && <span className='navbar-text mr-2'>Welcome, {user.email}</span>}
		{alwaysOptions}
		{user ? authenticatedOptions : unauthenticatedOptions}
	</Navbar>
)

export default Header
