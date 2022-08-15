const request = require("request");
const BOTNO = process.env.BOTID;
const LINE_IT_TALKROOMID = process.env.LINE_IT_TALKROOMID;


module.exports = function sendStickerToDepartment(token, stickerId, packageId) {
  const postData = {
    url: "https://www.worksapis.com/v1.0/bots/" + BOTNO + "/channels/" + LINE_IT_TALKROOMID + "/messages",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + token
    },
    json: {
      content: {
        type: "sticker",
        packageId: packageId,
        stickerId: stickerId
      }
    }
  };
  request.post(postData, (err) => {
    if (err) {
      console.log("Error AnswerMessage: ", err);
      return;
    }
  });
};