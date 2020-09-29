const Feedback = require('../models/Feedbacks')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const upload = multer({dest: 'uploads/resizes'});

module.exports = {
  // gravar os feedbacks
  async store(req, res) {
    try {
      let { event_id = '', user_id = '' } = req.body;
      const search = { event_id: event_id, user_id: user_id }

      sort = 'createdAt'
      event_id = event_id ? event_id : ''
      user_id = user_id ? user_id : ''
  
      let feedback = await Feedback.paginate(search, {sort: `-${sort}`});
      if (feedback.total === 1) {
        id = feedback.docs[0]._id
        await Feedback.findByIdAndUpdate( { _id: id }, req.body )
      }
      else {
        feedback = await Feedback.create(req.body)
      }

      return res.status(200).json(feedback)
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
}
