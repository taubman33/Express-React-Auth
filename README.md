# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting Started

1. Fork
2. Clone

# Express - React - Authentication

```sh
cd express-react-authentication-exercise
```

## Sign Up

Let's create an axios POST request sending the user credentials. The server will respond with the JSON Web Token (JWT) which we will store in localStorage for subsequent requests.

client/src/services/auth.js
```js
import api from './apiConfig'

export const signUp = async credentials => {
    try {
        const resp = await api.post('/sign-up', credentials)
        localStorage.setItem('token', resp.data.token)
        return resp.data
    } catch (error) {
        throw error
    }
}
```

Now let's head to the server and do the following:
- create the password digest
- create the user and store them in the database
- create a payload
- create a JSON Web Token (JWT) from the payload
- respond with the newly created user and the JSON Web Token (JWT)

controllers/index.js
```js
const SALT_ROUNDS = 11
const TOKEN_KEY = 'areallylonggoodkey'

const signUp = async (req, res) => {
	try {
		console.log(req.body)
		const { username, email, password } = req.body
		const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
		const user = await User.create({
			username,
			email,
			password_digest
		})
		const payload = {
			id: user.id,
			username: user.username,
			email: user.email
		}

		const token = jwt.sign(payload, TOKEN_KEY)
		return res.status(201).json({ user, token })
	} catch (error) {
		console.log(
			'You made it to the signUp controller, but there was an error :('
		)
		return res.status(400).json({ error: error.message })
	}
}
```

## Sign In

The sign in axios call is similar to sign up except we're hitting the `/sign-in` endpoint on our server.

client/src/services/auth.js
```js
export const signInUser = async credentials => {
  try {
    const resp = await api.post('/sign-in', credentials)
    localStorage.setItem('token', resp.data.token)
    return resp.data
  } catch (error) {
    throw error
  }
}
```

For sign in on the server-side, we take the username the client sends us and look up that user in the database so we can get that user's password digest. We then compare the hash the password the client sent us and compare the hashed password with the password digest, if they're a match we generate a JSON Web Token (JWT) and respond with the user and JSON Web Token (JWT).

controllers/index.js
```js
const signIn = async (req, res) => {
	try {
		console.log(req.body)
		const { username, password } = req.body
		const user = await User.findOne({
			where: {
				username
			}
		})
		if (await bcrypt.compare(password, user.dataValues.password_digest)) {
			const payload = {
				id: user.id,
				username: user.username,
				email: user.email
			}

			const token = jwt.sign(payload, TOKEN_KEY)
			return res.status(201).json({ user, token })
		} else {
			res.status(401).send('Invalid Credentials')
		}
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}
```

## Accessing a Protected Resource

We have sign up and sign in working. We now want to **restrict** users from interacting with the following routes in our API:

| HTTP Verb | Endpoint   |
|-----------|------------|
| POST      | /items     |
| PUT       | /items/:id |
| DELETE    | /items/:id |

Add the following routes:

routes/index.js
```js
router.post('/items', restrict, controllers.createItem)
router.put('/items/:id', restrict, controllers.updateItem)
router.delete('/items/:id', restrict, controllers.deleteItem)
```

Notice the `restrict` function in these routes. When we add, `restrict` the route invokes the `restrict` function, the function will check if there is a legitimate JSON Web Token (JWT) present, if there is the route will be rendered.

Let's create the `restrict` function.

helpers/index.js
```js
module.exports = (req, res, next) => {
	const jwt = require('jsonwebtoken')
	const TOKEN_KEY = 'areallylonggoodkey'
	try {
		const token = req.headers.authorization.split(' ')[1]
		const data = jwt.verify(token, TOKEN_KEY)
		res.locals.user = data
		next()
	} catch (error) {
		console.log(error)
		res.status(403).send('Unauthorized')
	}
}
```

## Bonus

Build out functionality for a Change Password feature
