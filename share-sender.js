// module読み込み
const request = require('request');
const axios = require('axios');

module.exports = async function shareSender(token, accountId, contentType) {
    const BOTNO = process.env.BOTID;
    const LINE_IT_TALKROOMID = process.env.LINE_IT_TALKROOMID
    const postData = {
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
    request.post(postData, (err) => {
        console.log("error send message: ", err);
        return;
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
        return "ID：" + accountId  + "\n" + `${account.userName.lastName}${account.userName.firstName}さんが${contentType}を送信しました。` + "\n" +　"所属部署：" + account.location
      } catch (e) {
        console.log(e)
        return "Error"
      }
    }
};