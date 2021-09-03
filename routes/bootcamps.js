const express = require('express');
const router = express.Router();
const { getbootcamps, creatbootcamp, getsinglebootcamp, deletebootcamp, updatebootcamp } = require('../controllers/bootcamps')

router.route('/')
    .get(getbootcamps)
    .post(creatbootcamp);

router.route('/:id')
    .delete(deletebootcamp)
    .put(updatebootcamp)
    .get(getsinglebootcamp)

module.exports = router;