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
    }
};

module.exports = userController;