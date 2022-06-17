const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
    },
    {
    toJSON: {
        getters: true
    },
        id: false
    }
);

const ThoughSchema = new Schema({
    thoughtText: {
        type: String,
        requried: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
    },
    {
    toJSON: {
        getters: true,
        virtuals: true
    },
        id: false
    }
);

const Thought = model('Thought', ThoughSchema);

module.exports = Thought;