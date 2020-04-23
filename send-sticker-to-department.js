module.exports = function sendStickerToDepartment(token, stickerId, packageId) {
  const request = require("request");
  const BOTNO = process.env.BOTNO;
  const API_ID = process.env.APIID;
  const CONSUMERKEY = process.env.CONSUMERKEY;
  const ROOMID = process.env.LINE_IT_TALKROOMID;

  const postData = {
    url: "https://apis.worksmobile.com/" + API_ID + "/message/sendMessage/v2",
    headers: {
      consumerKey: CONSUMERKEY,
      Authorization: "Bearer " + token
    },
    json: {
      botNo: Number(BOTNO),
      roomId: ROOMID,
      content: {
        type: "sticker",
        packageId: packageId,
        stickerId: stickerId
      }
    }
  };
  request.post(postData, (err, response, body) => {
    if (body) {
      console.log("your request body: ", body);
      return;
    } else if (err) {
        console.log("error messgage ", body);
        return;
      }
  });
};