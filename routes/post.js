const express = require('express');

const { requireSignin } = require('../controllers/auth');
const { getPosts, createPost } = require('../controllers/post');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/', getPosts);
router.post('/post', requireSignin, createPostValidator, createPost);

router.param('userId', userById);

module.exports = router;
