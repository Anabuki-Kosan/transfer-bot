"use strict";

// node modules
const bodyParser = require("body-parser");
const cron = require('node-cron');
const express = require("express");
const server = express();

// declared modules
const SendToDepartment = require("./send-to-department");
const SendToQuestioner = require("./send-to-questioner");
const SendImageToDepartment = require("./send-image-to-department");
const SendStickerToDepartment = require("./send-sticker-to-department");
const shareSender = require("./share-sender");
const goHome = require("./go-home-message");
const startWork = require("./start-work-message");
const checkHoliday = require("./check-holiday");


// who send files
const getJWT = require("./getJWT");
const getServerToken = require("./get-server-token");

server.use(bodyParser.json());
server.listen(process.env.PORT || 3000);

server.post("/callback", (req, res) => {

  const contentType = req.body.content.type
  const channelId = req.body.source.channelId;
  const accountId = req.body.source.userId;

  if (contentType === "text") {
    const messageText = req.body.content.text;
    getJWT(jwttoken => {
      getServerToken(jwttoken, newtoken => {
        if(!channelId){
          SendToDepartment(messageText, newtoken, accountId);
        } else {
          const RegEmail = (/([A-Za-z0-9-]){36}\n/g)
          const matchAccountId = messageText.match(/([A-Za-z0-9-]){36}/g);
          const replaceAnswerMessage = messageText.replace(RegEmail, "");
          SendToQuestioner(newtoken, matchAccountId, replaceAnswerMessage);
        }
      });
    });
  } else if (contentType === "sticker") {
    const stickerId = req.body.content.stickerId;
    const packageId = req.body.content.packageId;
    const accountId = req.body.source.userId;

    getJWT(jwttoken => {
      getServerToken(jwttoken, newtoken => {
        if (!channelId) {
          SendStickerToDepartment(newtoken, stickerId, packageId);
          shareSender(newtoken, accountId, contentType);
        }
      });
    });
  } else if (contentType === "image") {
    const fileId = req.body.content.fileId;
    const accountId = req.body.source.userId;
    getJWT(jwttoken => {
      getServerToken(jwttoken, newtoken => {
        if (!channelId) {
          SendImageToDepartment(newtoken, fileId);
          shareSender(newtoken, accountId, contentType);
        }
      });
    });
  } else if (contentType === "file") {
    const fileId = req.body.content.fileId;
    const accountId = req.body.source.userId;
    getJWT(jwttoken => {
      getServerToken(jwttoken, newtoken => {
        if (!channelId) {
          SendImageToDepartment(newtoken, fileId);
          shareSender(newtoken, accountId, contentType);
        }
      });
    });
  }
  res.sendStatus(200);
});


server.post("/garoon", (req) => {
  const messageText = req.body;
  const accountId = "ce9a29af-7b61-464e-1de9-04bb22d06597"
  getJWT(jwttoken => {
    getServerToken(jwttoken, newtoken => {
      if(!channelId){
        SendToDepartment(messageText, newtoken, accountId);
      }
    });
  });
})


// 定時に特定のメッセージを送付する
cron.schedule('0 0 18 * * 1-5', () => {
  const action = checkHoliday();
  if(action){
    getJWT(jwttoken => {
      getServerToken(jwttoken, newtoken => {
        goHome(newtoken);
      })
  })} else{
    console.log('祝日なので動かしません。')
  }
});


// 定時に特定のメッセージを送付する 20220705修正*/
cron.schedule('0 55 8 * * 1-5', () => {
  const action = checkHoliday();
  if(action){
    getJWT(jwttoken => {
      getServerToken(jwttoken, newtoken => {
        startWork(newtoken);
      })
  })} else{
    console.log('祝日なので動かしません。')
  }
});