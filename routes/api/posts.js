const express = require('express');
const router = express.Router();

//@route    GET/api/posts
//@desc     Test Route
//@access   Public(means access route without any token)
router.get('/', (req, res) => res.send("Posts Route"))

module.exports = router;