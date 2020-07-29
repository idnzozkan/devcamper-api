const express = require('express');
const router = express.Router();
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamps');
const advancedResults = require('../middlewares/advancedResults');

// Include other resource routers
const courseRouter = require('./courses');

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)

module.exports = router;