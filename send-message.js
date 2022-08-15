module.exports = function sendMessage(token, accountId, message) {
    const request = require("request");

    const BOTNO = process.env.BOTID;
    const postData = {
        url: "https://www.worksapis.com/v1.0/bots/" + BOTNO + "/users/" +  accountId + "/messages",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + token
        },
        json: {
            content: {
                type: "text",
                text: message
            }
        }
    };
    request.post(postData, (err, res, body) => {
        if (err) {
            console.log("Error SendMessage: ", err);
            return;
        }
    })
  };