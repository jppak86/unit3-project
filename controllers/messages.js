import { Message } from "../models/message.js"

function index(req, res) {
  Message.find({})
	.then(messages => {
    res.json(messages)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function create(req, res) {
  Message.create(req.body)
  .then(message => res.json(message))
  .catch(err => res.json(err))
}

function deleteMessage(req, res) {
  Message.findByIdAndDelete(req.params.id)
  .then(message => res.json(message))
  .catch(err => res.json(err))
}

function update(req, res) {
  Message.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(message => res.json(message))
  .catch(err => res.json(err))
}

function show(req, res) {
  Message.findById(req.params.id)
  .then(message => res.json(message))
  .catch(err => res.json(err))
}

export {
  index,
  create,
  update,
  deleteMessage as delete,
  show
}