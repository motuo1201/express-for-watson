var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/assistant/create-session', function(req, res, next) {
  const AssistantV2 = require('ibm-watson/assistant/v2');

  const service = new AssistantV2({
    iam_apikey: process.env.REACT_APP_ASSISTANT_IAM_APIKEY,
    version: '2019-06-14',
    url: process.env.REACT_APP_ASSISTANT_URL
  });

  service.createSession({
    assistant_id: process.env.REACT_APP_ASSISTANT_ID
  })
  .then(watson_response => {
    console.log(JSON.stringify(watson_response, null, 2));
    res.send(JSON.stringify(watson_response, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
});

router.post('/assistant/conversation', function(req, res, next) {
  const AssistantV2 = require('ibm-watson/assistant/v2');

  const service = new AssistantV2({
    iam_apikey: process.env.REACT_APP_ASSISTANT_IAM_APIKEY,
    version: '2019-02-28',
    url: process.env.REACT_APP_ASSISTANT_URL
  });
  
  service.message({
    assistant_id: process.env.REACT_APP_ASSISTANT_ID,
    session_id: req.body.session_id,
    input: {
      'message_type': 'text',
      'text': req.body.inputText
      }
    })
    .then(watson_response => {
      res.send(JSON.stringify(watson_response, null, 2));
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
