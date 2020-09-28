const User = require('../models/Users')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const upload = multer({dest: 'uploads/resizes'});

module.exports = {
  // Login
  async login(req, res) {
    let { page = 1, sort = 'createdAt' } = req.query;
    let { email = '', password = '' } = req.body;
    const search = { email: email, password: password }

    page = page ? page : 1
    sort = sort ? sort : 'createdAt'
    email = email ? email : ''
    password = password ? password : ''

    if (!email && !password) res.json('error')
    const user = await User.paginate(search, { page , limit: 5, sort: `-${sort}`});

    message = false
    if (user.total === 1) message = true
    return res.json(message)
  },
  // gravar os users
  async store(req, res) {
    try {
      let user = await User.create(req.body)
      const id = user._id
      delete user._id

      await User.findByIdAndUpdate( { _id: id }, user )

      return res.status(200).json()
      } catch (err) {
          return res.status(400).json({error: err.message })
      }
  },
}
