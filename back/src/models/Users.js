const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, {
  timestamps: true
})
UserSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Users', UserSchema)
