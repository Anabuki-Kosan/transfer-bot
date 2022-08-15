module.exports = function CheckRoomId(token, roomId, accountId) {
  const request = require("request");
  const BOTNO = process.env.BOTNO;
  const CONSUMERKEY = process.env.CONSUMERKEY;
  const APIID = process.env.APIID;
  const postDataForRoomId = {
    url: "https://apis.worksmobile.com/r/" + APIID + "/message/v1/bot/" + BOTNO + "/message/push",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      consumerKey: CONSUMERKEY,
      Authorization: "Bearer " + token
    },
    json: {
      botNo: Number(BOTNO),
      accountId: accountId,
      content: {
        type: "text",
        text: String(roomId)
      }
    }
  };
  request.post(postDataForRoomId, (err, res, body) => {
    if (err) {
      console.log("Error checkRoomId: ", err);
      return;
    }
    console.log("postDataForRoomId: ", body);
  });
};
