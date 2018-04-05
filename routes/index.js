const express = require('express');
const router = express.Router();
const url = require('url');
const request = require("request");
const path = require("path");
const config = require(path.join(__dirname, "..", "config", "config"));

router.get("/", function(req, res){
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.render("index")
    }
})

router.use('/dashboard', requireLogin, express.static('client/'));

var kawaii_response, response_text, response_text_post

router.use('/api/v2/nlu', requireLogin, function (req, res) {
    console.log('/api/v2/nlu')
    try {
        //Strip /api off request
        var request_url = req.originalUrl.split('/nlu')[1];

        if (!request_url) { res.status(500).json({ message: '', error: true, error: "Server Error" }); return; }

        console.log(req.method + ": " + request_url + " -> " + config.kawaiiserver + request_url);

        var path = url.parse(req.url).pathname.split('/').pop();

        if (req.method === 'GET') {
            kawaii_response = "";
            response_text = "";
            response_text_post = "";

            request(config.kawaiiserver + request_url, function (error, response, body) {
                try {
                    if (body !== undefined) {
                        if (path == 'parse') {
                            if (!req.query.model){ res.status(500).json({ message: '', error: true, error: "Invalid format: model is requires" }); return; }
                            if (!req.query.q){ res.status(500).json({ message: '', error: true, error: "Invalid format: q is requires" }); return; }
                            kawaii_response = body;
                            var kawaii_responses = JSON.parse(kawaii_response)
                            var intent_confidence = kawaii_responses[0].intent.confidence;
                            var j = 0
                            for (var i = 0; i < kawaii_responses.length; i++) {
                                if (intent_confidence < kawaii_responses[i].intent.confidence) {
                                    intent_confidence = kawaii_responses[i].intent.confidence
                                    j = i;
                                }
                                if (i + 1 == kawaii_responses.length) {
                                    kawaii_response = kawaii_responses[j]
                                    //getResponseText(kawaii_responses[j].intent.name, kawaii_responses[j].entities, res) // ====>  DataBase Respense 
                                    //augmentParse(res);   //  ====> Add Response from DB to Res JSON
                                    res.status(200).json(kawaii_response)
                                }
                            }
                        } else if (path == 'status') {
                            //sendOutput(200, res, body);
                            res.status(200).json(JSON.parse(body))
                        } else if (path == 'version') {
                            //sendOutput(200, res, body);
                            res.status(200).json(JSON.parse(body))
                        } else if (path == 'config') {
                            //sendOutput(200, res, body);
                            res.status(200).json(JSON.parse(body))
                        } else {
                            res.status(404).json({ message: '', error: true, error: "Server Error" })
                        }
                        // TODO: Check that the response includes the required fields, otherwise, return the incomplete flag? Maybe this should rather be in the backend
                    } else {
                        //sendOutput(404, res, '{"error" : "Server Error"}');
                        res.status(404).json({ message: '', error: true, error: "Server Error" })
                    }
                    //res.end();
                } catch (err) {
                    console.log(err);
                }
            });
        } else if (req.method === 'OPTIONS') {
            try {
                //sendOutput(200, res);
                res.status(200).json({ message: 'OPTIONS', error: false })
            } catch (err) {
                console.log(err);
            }
        } else {
            request({
                method: req.method,
                uri: config.kawaiiserver + request_url,
                body: JSON.stringify(req.body),
                headers: req.headers
            }, function (error, response, body) {
                try {
                    //sendOutput(200, res, "");
                    res.status(200).json({ message: '', error: false })
                    console.log(response);
                } catch (err) {
                    console.log(err);
                }
            });
        }

        if (path == 'parse') {
            //var model = getParameterByName('model', request_url) !== undefined ? getParameterByName('model', request_url) : "default";
            //logRequest(req, path, { model: model, intent: '', query: getParameterByName('q', request_url) });
        } else {
            //logRequest(req, path);
        }
    } catch (err) {
        console.log("Error: " + err);
    }
});

function requireLogin (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        req.session.user.PasswordView = '';
        next();
    }
};

/*router.get("*", function(req, res){
    res.redirect('/');
})*/

module.exports = router;