const router = require('express').Router();
const { getAllThought, createThought, getThoughtById, updateThought, deleteThought } = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThought)
    .post(createThought);


router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;