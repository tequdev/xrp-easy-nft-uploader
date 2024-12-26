require('dotenv').config()
const multipart = require('aws-lambda-multipart-parser');

const { PinataSDK } = require("pinata-web3");

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
});

const handler = async (event, context, callback) => {
  // リクエストボディに設定された画像データはBase64エンコードされているので、デコードする
  try {
    event.body = Buffer.from(event.body, 'base64').toString('binary');
    // parse multipart/form-data
    const multipartBuffer = await multipart.parse(event, true);
    const file = new File([multipartBuffer.file.content], 'file.text')
    const upload = await pinata.upload.file(file)
    const cid = upload.IpfsHash
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ cid }),
    };
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: e.message }),
    };
  }
}

module.exports = { handler }
