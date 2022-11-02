const { App, AwsLambdaReceiver } = require("@slack/bolt");
require("dotenv").config();

const { quoteMeCommand } = require("./src/actions/quotes");

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

app.command("/quoteme", quoteMeCommand);

module.exports.handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};
