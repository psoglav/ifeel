const mongoose = require('mongoose')
const nanoid = require('nanoid').nanoid

const Chat = new mongoose.Schema({
  _id: { type: String, default: nanoid },
  users: Array,
  messages: Array,
})

module.exports = mongoose.model('chats', Chat)