const IntentsDB = require('../models/intents');

var intents = {
    getAll: function () {
        return new Promise(function(resolve, reject){
            IntentsDB.find({}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else resolve(doc);
            });
        })
    },
    getAllUser: function (id, IdAgent) {
        return new Promise(function(resolve, reject){
            IntentsDB.findOne({IdUser: id, IdAgent: IdAgent}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else resolve(doc);
            });
        })
    },
    getAllIntent: function (id) {
        return new Promise(function(resolve, reject){
            IntentsDB.findById(id, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else resolve(doc);
            });
        })
    },
    createIntentUser: function (id, IdAgent, intent) {
        console.log(id, IdAgent, intent)
        return new Promise(function(resolve, reject){
            IntentsDB.findOne({IdUser: id, IdAgent: IdAgent}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) {
                    var newIntent = new IntentsDB({
                        IdUser: id,
                        IdAgent: IdAgent,
                        List: [{
                            name: intent
                        }]
                    })
                    newIntent.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
                else {
                    doc.List.push({
                        name: intent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    createIntent: function (id, idUser, IdAgent, intent) {
        return new Promise(function(resolve, reject){
            IntentsDB.findById(id, function (err, doc) {
                if (err) reject(err);
                else if (!doc) {
                    var newIntent = new IntentsDB({
                        IdUser: idUser,
                        IdAgent: IdAgent,
                        List: [{
                            name: intent
                        }]
                    })
                    newIntent.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
                else {
                    doc.List.push({
                        name: intent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    updateIntentUser: function (id, IdAgent, intent) {
        return new Promise(function(resolve, reject){
            IntentsDB.findOneAndUpdate({IdUser: id, IdAgent: IdAgent}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else {
                    doc.List.push({
                        name: intent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    updateIntent: function (id, intent) {
        return new Promise(function(resolve, reject){
            IntentsDB.findOneAndUpdate({id: id}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else {
                    doc.List.push({
                        name: intent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    removeIntentUser: function (id, IdAgent, intent) {
        return new Promise(function(resolve, reject){
            IntentsDB.remove({IdUser: id, IdAgent: IdAgent}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else {
                    doc.List.push({
                        name: intent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    removeIntent: function (id, intent) {
        return new Promise(function(resolve, reject){
            IntentsDB.remove({id: id}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else {
                    doc.List.push({
                        name: intent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    }
}

module.exports = intents;