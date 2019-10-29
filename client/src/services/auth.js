import apiUrl from '../apiConfig'

import Axios from 'axios'
const JwtToken = localStorage.getItem('token') || null

const api = Axios.create({
	baseURL: apiUrl,
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
})

export const signUp = async (credentials) => {
	try {
		const resp = await api.post('/sign-up', credentials)
		return resp.data
	} catch (error) {}
}

export const signInUser = async (credentials) => {
	try {
		const resp = await api.post('/sign-in', credentials)
		localStorage.setItem('token', resp.data.token)
		return resp.data
	} catch (error) {
		throw error
	}
}

export const signOut = async (user) => {
	try {
		await localStorage.clear()
		return true
	} catch (error) {
		throw error
	}
}

export const changePassword = async (passwords, user) => {
	try {
		const resp = await api.post('/')
	} catch (error) {
		throw error
	}
}

export const getItems = async () => {
	try {
		const resp = await api.get('/items')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const addItem = async () => {
	try {
		const resp = await api.post('/items')
	} catch (error) {}
}
