const { App } = require("@slack/bolt");
require("dotenv").config();

const { quoteMeCommand } = require("./src/actions/quotes");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/quoteme", quoteMeCommand);

(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log("Slack Bolt app is running on port " + port);
})();
