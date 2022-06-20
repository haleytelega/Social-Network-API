const { Thought, User } = require('../models');

const thoughtController = {
    //getting all Thought
    getAllThought(req, res) {
        Thought.find({})
        .then(Thought => res.json(Thought))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
    },

    //creating a new Thought
    createThought({ params, body }, res) {
        console.log('---------->', body)
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(thought => res.json(thought))
            .catch(err => res.status(400).json(err));
        },

    //get one Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(Thought => {
            if (!Thought) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
        }
        res.json(Thought);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    //update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }) //must have new: true to return new version of the document
        .then(Thought => {
            if (!Thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(Thought);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a Thought
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id})
        .then(Thought => {
            if (!Thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(Thought);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;