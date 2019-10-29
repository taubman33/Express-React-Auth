class Auth {
	constructor() {
		this.authenticated = false
	}

	login(cb) {
		this.authenticated = true
		cb()
	}
	logout(cb) {
		this.authenticated = true
		cb()
	}
	isAuthenticated() {
		this.authenticated = true
	}
}

export default new Auth()
