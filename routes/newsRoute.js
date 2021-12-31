const express = require('express');
const router = express.Router();

const { getAllNews, getNewsById, searchNews, getNewsByName } = require('../controllers/news');

router.route('/').get(getAllNews);
router.route('/:newsId').get(getNewsById);
router.route('/search/:source').get(searchNews);
// router.route('/?:newsName').get(getNewsByName);

module.exports = router;
