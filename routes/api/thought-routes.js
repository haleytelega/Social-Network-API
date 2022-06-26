const router = require('express').Router();
const { getAllThought, createThought, getThoughtById, updateThought, deleteThought, getReaction, removeReaction } = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThought)
    .post(createThought);


router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions').post(getReaction);

router
    .route('/:thoughtId/:reactionsId').delete(removeReaction);

module.exports = router;