import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up',
		data: {
			credentials: {
				email: credentials.email,
				username: credentials.username,
				password: credentials.password
			}
		}
	})
}

export const signInUser = (credentials) => {
	return axios({
		url: apiUrl + '/sign-in',
		method: 'POST',
		data: {
			credentials: {
				username: credentials.username,
				password: credentials.password
			}
		}
	})
}

export const signOut = async (user) => {
	try {
		await localStorage.clear()
		return true
	} catch (error) {
		throw error
	}
}

export const changePassword = (passwords, user) => {
	return axios({
		url: apiUrl + '/change-password',
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword
			}
		}
	})
}
