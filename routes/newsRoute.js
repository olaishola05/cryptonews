const express = require('express');
const router = express.Router();

const { getAllNews, getANews, searchNews } = require('../controllers/news');

router.route('/').get(getAllNews);
router.route('/search').get(searchNews);
router.route('/:id').get(getANews);

module.exports = router;
