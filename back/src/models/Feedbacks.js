const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const FeedbackSchema = new mongoose.Schema({
  user_id: String,
  event_id: String,
  status: Number,
}, {
  timestamps: true
})
FeedbackSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Feedbacks', FeedbackSchema)
