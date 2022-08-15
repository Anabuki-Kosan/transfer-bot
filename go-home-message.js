const request = require("request");

module.exports = function sendToDepartment(token) {
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
          type: "link",
          contentText: "終業時刻です。退勤ボタンを忘れないように気をつけましょう。",
          linkText: "勤怠",
          link: "https://c1.cckintai.com/independent/recorder/personal/"
        }
      }
    };
    request.post(postData, (err, response, body) => {
      if (err) {
        console.log("error send message: ", err);
        return;
      }
    });
  };
