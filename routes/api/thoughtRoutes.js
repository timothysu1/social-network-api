const router = require('express').Router();
const { } = require('../../controllers/thoughtContoller');

// /api/thoughts
router.route('/').get().post();

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get().put().delete();

// /api/thougts/:thoughtId/reactions
router.router('/:thoughtId/reactions').post();

// /api/thougts/:thoughtId/reactions/:reactionId
router.router('/:thoughtId/reactions/:reactionId').delete();

module.exports = router;
