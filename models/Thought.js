const mongoose = require('mongoose');
const { Schema, model } = mongoose;
//const { Thought } = require('.');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
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

const thoughtSchema = new mongoose.Schema({
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
  reactions: [reactionSchema]
})

thoughtSchema.virtual('format').get(function () {
  return this.createdAt.toLocaleString();
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;