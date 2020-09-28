const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const EventSchema = new mongoose.Schema({
  name: String,
  place: String,
  photo: String,
  commentary: String,
  user_id: String,
}, {
  timestamps: true
})
EventSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Events', EventSchema)
