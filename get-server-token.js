const request = require("request");

module.exports = async function getServerToken(jwttoken, callback) {
    const postdata = {
      url: "https://auth.worksmobile.com/oauth2/v2.0/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      form: {
        assertion: jwttoken,
        grant_type: encodeURIComponent(
          "urn:ietf:params:oauth:grant-type:jwt-bearer"
        ),
        client_id: process.env.ClientID,
        client_secret: process.env.ClientSecret,
        scope: "bot,user.read"
      }
    };
    await request.post(postdata, (error, response, body) => {
      if (error) {
        console.log("Error getServerToken: ", error);
        callback(error);
      } else {
        const jsonobj = JSON.parse(body);
        const AccessToken = jsonobj.access_token;
        callback(AccessToken);
      }
    });
}