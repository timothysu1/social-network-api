const mongoose = require('mongoose')

const reactionSchema = new mongoose.Schema({
  ractionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Type.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

reactionSchema.virtual('format').get(function () {
  return this.createdAt.toLocaleString();
})

const thoughtsSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reaction: [reactionSchema]
})

thoughtsSchema.virtual('format').get(function () {
  return this.createdAt.toLocaleString();
})

