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
		localStorage.setItem('token', resp.data.token)
		return resp.data
	} catch (error) {
		throw error
	}
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
		return resp.data.items
	} catch (error) {
		throw error
	}
}

export const getItemById = async (id) => {
	try {
		const resp = await api.get(`/items/${id}`)
		return resp.data.item
	} catch (error) {
		throw error
	}
}

export const addItem = async (item) => {
	try {
		const resp = await api.post('/items', item)
		return resp.data
	} catch (error) {
		throw error
	}
}

export const updateItem = async (id, item) => {
	try {
		const resp = await api.put(`'/items/${id}`, item)
		return resp.data
	} catch (error) {
		throw error
	}
}

export const deleteItem = async (id) => {
	try {
		const resp = await api.delete(`/items/${id}`)
		return resp.data
	} catch (error) {
		throw error
	}
}
