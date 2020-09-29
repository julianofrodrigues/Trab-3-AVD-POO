const Event = require('../models/Events')
const Feedback = require('../models/Feedbacks')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const upload = multer({dest: 'uploads/resizes'});

module.exports = {
  // Lista os Events do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { name: { $regex: '.*' + termo + '.*' } },
        { place: { $regex: '.*' + termo + '.*' } },
        { commentary: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const event = await Event.paginate(search, { sort: `-${sort}`});
    let array = []

    const someFunction = (myArray) => {
      const promises = myArray.map(async (o) => {
        const likes = await Feedback.paginate({event_id: o._id, status: 2});
        const dislikes = await Feedback.paginate({event_id: o._id, status: 1});
  console.log(o)
        return {
          _id: o._id,
          event_name: o.event_name,
          district: o.district,
          street: o.street,
          number: o.number,
          commentary: o.commentary,
          uf: o.uf,
          city: o.city,
          user_id: o.user_id,
          photo: o.photo,
          createdAt: o.createdAt,
          updatedAt: o.updatedAt,
          __v: o.__v,
          likes: likes.total,
          dislikes: dislikes.total
        }
      });
      return Promise.all(promises);
  }

    array = await someFunction(event.docs)
    event.docs = array
    return res.json(event)
  },
  
  // Retoma Event requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const event = await Event.findById(id);
    return res.status(200).json(event)
  },

  // gravar os events
  async store(req, res) {
    try {
      let event = await Event.create(req.body)
      const id = event._id
      delete event._id
      const { filename: image} = req.file
      const [name, ext] = image.split('.')
      const fileName = `${name}_${id}.jpg`

      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70})
        .toFile(
          path.resolve(req.file.destination, 
            'resizes', fileName)
        )
      fs.unlinkSync(req.file.path)

      //req.io.emit('event', event)

      event.photo = fileName

      await Event.findByIdAndUpdate( { _id: id }, event )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o event
  async destroy(req, res) {
    const { id } = req.params
    const { user_id = '' } = req.query
    const event = await Event.findById(id)
    message = true
    if (event.user_id === user_id) {
      await Event.findByIdAndRemove(id)
      return res.status(200).json(true)
    }
    else {
      return res.status(400).json({error: err.message })
    }
  },

  // Altera o event
  async update(req, res) {
    const { id } = req.params
    const event = await Event.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(event)
  },
}
