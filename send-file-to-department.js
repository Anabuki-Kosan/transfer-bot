const request = require("request");

module.exports = function sendIamgeToDepartment(token, originalContentUrl) {
  const BOTNO = process.env.BOTID;
  const LINE_IT_TALKROOMID = process.env.LINE_IT_TALKROOMID;

  const postData = {
    url: "https://www.worksapis.com/v1.0/bots/" + BOTNO + "/channels/" + LINE_IT_TALKROOMID + "/messages",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + token
    },
    json: {
      content: {
        type: "file",
        resourceId: originalContentUrl
      }
    }
  };
  request.post(postData, (err) => {
    if (err) {
      console.log("error send message: ", err);
      return;
    }
  });
};