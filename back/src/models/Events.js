const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const EventSchema = new mongoose.Schema({
  event_name: String,
  district: String,
  street: String,
  number: String,
  commentary: String,
  uf: String,
  city: String,
  user_id: String,
  photo: String,
}, {
  timestamps: true
})
EventSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Events', EventSchema)
