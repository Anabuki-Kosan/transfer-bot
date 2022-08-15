// module読み込み
const request = require('request');
const axios = require('axios');

module.exports = async function sendToDepartment(messageText, token, accountId) {
  const BOTNO = process.env.BOTID
  const LINE_IT_TALKROOMID = process.env.LINE_IT_TALKROOMID

  const postDataQuestion = {
    url: "https://www.worksapis.com/v1.0/bots/" + BOTNO + "/channels/" + LINE_IT_TALKROOMID + "/messages",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + token
    },
    json: {
      content: {
        type: "text",
        text: await getAccountInfo()
      }
    }
  };
  request.post(postDataQuestion, (err) => {
    if (err) {
      console.log("Error AnswerMessage: ", err);
      return;
    }
  });
  async function getAccountInfo() {
    try {
      const account = await axios({
        method: 'get',
        url: `https://www.worksapis.com/v1.0/users/${accountId}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + token
        }
      }).then((res) => {
        return res.data
      })
      return "質問内容："+ "\n" + messageText + "\n\n" + "質問者ID：" + accountId  + "\n" + "質問者：" +  account.userName.lastName + account.userName.firstName + "\n" +　"所属部署：" + account.location
    } catch (e) {
      console.log(e)
      return "Error"
    }
  }
}
