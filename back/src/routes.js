const { Router } = require('express')
const multer = require('multer')
const EventController = require('./controllers/EventController')
const UserController = require('./controllers/UserController')
const uploadConfig = require('./config/upload')
const routes = new Router();

const upload = multer(uploadConfig)

routes.get('/events', EventController.index)
routes.post('/events', upload.single('image'), EventController.store)
routes.put('/events/:id', EventController.update)
routes.delete('/events/:id', EventController.destroy)
routes.get('/events/:id', EventController.show)

routes.post('/users', UserController.store)
routes.post('/users/login', UserController.login)

module.exports = routes