const { Router } = require('express');
const controllers = require('../controllers')
const router = Router();
const jwt = require('jsonwebtoken')
const TOKEN_KEY = 'areallylonggoodkey';

const restrict = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, TOKEN_KEY);
        res.locals.user = data;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).send('Unauthorized');
    }
}

router.get('/', (req, res) => res.send('This is root!'))

router.post('/sign-up', controllers.signUp)
router.post('/sign-in', controllers.signIn)
router.post('/change-password', controllers.changePassword)

router.get('/items', restrict, controllers.getAllItems)
router.get('/items/:id', controllers.getItemById)
router.post('/items', controllers.createItem)
router.put('/items/:id', controllers.updateItem)
router.delete('/items/:id', controllers.deleteItem)

module.exports = router;