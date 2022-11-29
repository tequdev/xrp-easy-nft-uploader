require('dotenv').config()
const multipart = require('aws-lambda-multipart-parser');
const { File, Web3Storage } = require('web3.storage')

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN })

const handler = async (event, context, callback) => {
  // リクエストボディに設定された画像データはBase64エンコードされているので、デコードする
  try {
    event.body = Buffer.from(event.body, 'base64').toString('binary');
    // parse multipart/form-data
    const multipartBuffer = await multipart.parse(event, true);
    const metadataCid = await client.put([new File([multipartBuffer.file.content], 'file.text')], { wrapWithDirectory: false })
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ cid: metadataCid }),
    };
  } catch (e) {
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
