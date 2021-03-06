const express = require('express');
const router = express.Router();
const UsersCTRL = require('../controller/user');
const AgentsCTRL = require('../controller/agents');
const IntentsCTRL = require('../controller/intents');
const fs = require('fs');
const validator = require('validator');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.get("/", function (req, res) {
    res.status(200).json({ message: 'hello', error: false })
})

router.get("/user", function (req, res) {
    var getUser = UsersCTRL.FindAll()
    getUser.then(function (result) {
        res.status(200).json({ message: result, error: false })
    }, function (err) {
        res.status(200).json({ message: err, error: true })
    })
})

router.post("/user", function (req, res) {
    var user = req.body;
    var setUser = {};
    setUser.FirstName = user.FirstName ? user.FirstName : '';
    setUser.LastName = user.LastName ? user.LastName : '';
    setUser.FullName = (user.FirstName && user.LastName) ? user.FirstName + " " + user.LastName : '';
    if (user.Username) setUser.Username = user.Username;
    else { res.status(200).json({ message: 'Username is required', error: false }); return; }
    if (user.Mail) setUser.Mail = user.Mail; else { res.status(200).json({ message: 'Mail is required', error: false }); return; }
    if (user.Password) setUser.Password = user.Password; else { res.status(200).json({ message: 'Password is required', error: false }); return; }
    var status = UsersCTRL.Create(setUser);
    status.then(function (result) {
        res.status(200).json({ message: 'User has added', error: false })
    }, function (err) {
        res.status(200).json({ message: { code: err.code, index: err.index, errmsg: err.errmsg + 'Username or Mail exist in our Database' }, error: true })
    })
})

router.put("/user", function (req, res) {
    var user = req.body.user;
    var status = UsersCTRL.UpdateOneByUsername(user.Username, user);
    status.then(function (result) {
        res.status(200).json({ message: 'User has updated', error: false })
    }, function (err) {
        res.status(200).json({ message: { code: err.code, index: err.index, errmsg: err }, error: true })
    })
})

router.delete("/user", function (req, res) {
    var user = req.body.user;
    var status = UsersCTRL.DeleteOneByUsername(user.Username);
    status.then(function (result) {
        res.status(200).json({ message: 'User has deleted', error: false })
    }, function (err) {
        res.status(200).json({ message: { code: err.code, index: err.index, errmsg: err }, error: true })
    })
})

router.post("/signin", function (req, res) {
    var user = req.body;
    var setUser = {};
    if (user.Username) setUser.Username = user.Username; else { res.status(200).json({ message: 'Username is required', error: false }); return; }
    if (user.Password) setUser.Password = user.Password; else { res.status(200).json({ message: 'Password is required', error: false }); return; }
    var status = UsersCTRL.signIn(req, user.Username, user.Password);
    status.then(function (result) {
        //res.status(200).json({login: true, error: false, result: result})
        res.redirect("/dashboard")
    }, function (err) {
        res.status(200).json({ login: false, error: true, err: err })
    })
})

router.post("/signup", function (req, res) {
    var user = req.body;
    var setUser = {};
    setUser.FirstName = user.FirstName ? user.FirstName : '';
    setUser.LastName = user.LastName ? user.LastName : '';
    setUser.FullName = (user.FirstName && user.LastName) ? user.FirstName + " " + user.LastName : '';
    if (user.Username) setUser.Username = user.Username;
    else { res.status(200).json({ message: 'Username is required', error: false }); return; }
    if (user.Mail) setUser.Mail = user.Mail; else { res.status(200).json({ message: 'Mail is required', error: false }); return; }
    if (user.Password) setUser.Password = user.Password; else { res.status(200).json({ message: 'Password is required', error: false }); return; }
    var status = UsersCTRL.signUp(req, setUser);
    status.then(function (result) {
        //res.status(200).json({login: true, error: false, result: result})
        res.redirect("/dashboard")
    }, function (err) {
        res.status(200).json({ login: false, error: true, err: err })
    })
})

router.get("/signout", function (req, res) {
    req.session.reset();
    res.redirect("/")
})

router.get("/agents", function (req, res) {
    var agents = AgentsCTRL.getAllUser(req.session.user._id);
    agents.then(function (result) {
        res.status(200).json({error: false, result: result })
    }, function (err) {
        res.status(200).json({ error: true, err: err })
    })
})
router.post("/agents", function (req, res) {
    var agents = AgentsCTRL.createAgentUser(req.session.user._id, req.body.name)
    agents.then(function(result){
        res.status(200).json({ error: false, result: result })
    }, function(err){
        res.status(200).json({ error: true, err: err })
    })
})

router.get("/intents/:id", function (req, res) {
    console.log("/intents/:id", req.params.id)
    var intents = IntentsCTRL.getAllUser(req.session.user._id, req.params.id);
    intents.then(function (result) {
        res.status(200).json({error: false, result: result })
    }, function (err) {
        res.status(200).json({ error: true, err: err })
    })
})
router.post("/intents", function (req, res) {
    var intents = IntentsCTRL.createIntentUser(req.session.user._id, req.body.agentId.id, req.body.intent.name)
    intents.then(function(result){
        res.status(200).json({ error: false, result: result })
    }, function(err){
        res.status(200).json({ error: true, err: err })
    })
})

module.exports = router;