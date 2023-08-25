const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thought')

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [thoughtsSchema],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]

  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model(`user`, userSchema);

module.exports = User;