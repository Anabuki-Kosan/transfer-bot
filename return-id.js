const request = require('request');

module.exports = async function ReturnID(token, accountId) {

  const BOTNO = process.env.BOTID;
  const postDataQuestion = {
    url: "https://www.worksapis.com/v1.0/bots/" + BOTNO + "/users/" +  accountId + "/messages",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + token
    },
    json: {
      content: {
        type: "text",
        text: accountId
      }
    }
  };
  request.post(postDataQuestion, (err, res, body) => {
    if (err) {
      console.log("Error AnswerMessage: ", err);
      return;
    }
  });
};