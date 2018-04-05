'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require("mongoose-times"),
    validators = require('mongoose-validators'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    mongoosePaginate = require('mongoose-paginate');

var listAgent = new Schema({
    name: { type: String }
})

var agentsSchema = new Schema({
    IdUser: { type: String },
    List: [listAgent]
})

agentsSchema.plugin(timestamps);
agentsSchema.plugin(mongoosePaginate);

var agents = mongoose.model('Agents', agentsSchema);

module.exports = agents;