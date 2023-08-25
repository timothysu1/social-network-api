const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  //get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ id: req.params.userId })
        .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { users: req.params.userId },
        {
          username: req.body.username,
          email: req.body.email
        },
        { new: true }
      );
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json({ message: 'User deleted' })
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}