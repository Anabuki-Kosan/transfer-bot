const request = require('request');
const axios = require('axios');

module.exports = async function SendToQuestioner(token, accountId, messageText) {

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
        text: await getAccountInfo()
      }
    }
  };
  request.post(postDataQuestion, (err, res, body) => {
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
      return messageText + "\n\n" + "返答者：" +  account.userName.lastName + account.userName.firstName + "\n" + "所属部署：" + account.location
    } catch (e) {
      console.log(e)
      return "Error"
    }
  }
};