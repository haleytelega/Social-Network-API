const { User } = require('../models');

const userController = {
    //getting all users
    getAllUsers(req, res) {
        User.find({})
        .then(user => res.json(user))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
    },

    //creating a new user
    createUser({ body }, res) {
        User.create(body)
        .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        },

    //add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {friends: params.friendId } }
            )
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
                })
                .catch(err => res.json(err));
            },

    //get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(user => {
            if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }) //must have new: true to return new version of the document
        .then(user => {
            if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(user => {
            if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: {friends: params.friendId } }
        )
        .then(user => res.json(user))
        .catch(err => res.json(err));
    }
};

module.exports = userController;