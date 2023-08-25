const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  //get thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select('-__v');
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //create new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $set: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({
        thought,
        userId: req.body.userId,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
        { new: true }
      ).select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId }).select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json({ message: 'Thought deleted' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //create reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      ).select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //remove thought
  async deleteReaction(req, res) {
    try {
      console.log(req.body.reactionId)
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.body.reactionId } } },
        { new: true }
      );
      console.log(thought)
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json({ message: 'Reaction deleted' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}