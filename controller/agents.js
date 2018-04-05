const AgentsDB = require('../models/agents');

var agent = {
    getAll: function () {
        return new Promise(function(resolve, reject){
            AgentsDB.find({}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else resolve(doc);
            });
        })
    },
    getAllUser: function (id) {
        return new Promise(function(resolve, reject){
            AgentsDB.findOne({IdUser: id}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else resolve(doc);
            });
        })
    },
    getAllAgent: function (id) {
        return new Promise(function(resolve, reject){
            AgentsDB.findById(id, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else resolve(doc);
            });
        })
    },
    createAgentUser: function (id, agent) {
        return new Promise(function(resolve, reject){
            AgentsDB.findOne({IdUser: id}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) {
                    var newAgent = new AgentsDB({
                        IdUser: id,
                        List: [{
                            name: agent
                        }]
                    })
                    newAgent.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
                else {
                    doc.List.push({
                        name: agent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    createAgent: function (id, idUser, agent) {
        return new Promise(function(resolve, reject){
            AgentsDB.findById(id, function (err, doc) {
                if (err) reject(err);
                else if (!doc) {
                    var newAgent = new AgentsDB({
                        IdUser: idUser,
                        List: [{
                            name: agent
                        }]
                    })
                    newAgent.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
                else {
                    doc.List.push({
                        name: agent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    updateAgentUser: function (id, agent) {
        return new Promise(function(resolve, reject){
            AgentsDB.findOneAndUpdate({IdUser: id}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else {
                    doc.List.push({
                        name: agent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    updateAgent: function (id, agent) {
        return new Promise(function(resolve, reject){
            AgentsDB.findOneAndUpdate({id: id}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else {
                    doc.List.push({
                        name: agent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    removeAgentUser: function (id, agent) {
        return new Promise(function(resolve, reject){
            AgentsDB.remove({IdUser: id}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else {
                    doc.List.push({
                        name: agent
                    })
                    doc.save(function(error, newdoc){
                        if (error) reject(error);
                        else resolve(newdoc);
                    })
                }
            });
        })
    },
    removeAgent: function (id, agent) {
        return new Promise(function(resolve, reject){
            AgentsDB.remove({id: id}, function (err, doc) {
                if (err) reject(err);
                else if (!doc) resolve('Empty')
                else {
                    doc.List.push({
                        name: agent
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

module.exports = agent;