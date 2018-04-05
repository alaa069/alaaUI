'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require("mongoose-times"),
    validators = require('mongoose-validators'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    mongoosePaginate = require('mongoose-paginate');

var listIntent = new Schema({
    name: { type: String }
})

var intentsSchema = new Schema({
    IdUser: { type: String },
    IdAgent: { type: String},
    List: [listIntent]
})

intentsSchema.plugin(timestamps);
intentsSchema.plugin(mongoosePaginate);

var intents = mongoose.model('Intents', intentsSchema);

module.exports = intents;