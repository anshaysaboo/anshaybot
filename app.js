const { App, AwsLambdaReceiver } = require("@slack/bolt");
require("dotenv").config();

const reactionAdded = require("./src/middleware/reactionAdded");
const { quoteMeCommand } = require("./src/actions/quotes");

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

app.command("/quoteme", quoteMeCommand);
app.event("reaction_added", reactionAdded);

module.exports.handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};
