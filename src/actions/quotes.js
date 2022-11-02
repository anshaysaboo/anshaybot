const {
  generateQuoteImage,
  getQuoteBlocks,
} = require("../lib/generateQuoteImage");
const { getUserProfile, getUserMessageInfo } = require("../util/slackUtil");

exports.quoteMeCommand = async ({ command, say, ack, logger }) => {
  try {
    await ack();
    logger.info(command);
    const { display_name, image_512 } = await getUserProfile(command.user_id);
    const text = command.text;
    const date = new Date().toLocaleDateString("en-US");

    const imageUrl = await generateQuoteImage({
      name: display_name,
      imageUrl: image_512,
      date,
      text,
    });
    await say(getQuoteBlocks(imageUrl));
  } catch (error) {
    logger.error(error);
    await say("Something went wrong. :sob:");
  }
};

exports.quoteReaction = async ({ event, logger, say }) => {
  logger.info(event);
  try {
    if (event.item.type !== "message") return;
    const { user, message } = await getUserMessageInfo(
      event.item.channel,
      event.item.ts
    );

    let { display_name, image_512 } = user;
    if (!display_name) display_name = user.real_name;
    const text = message.text;
    const date = new Date().toLocaleDateString("en-US");

    const imageUrl = await generateQuoteImage({
      name: display_name,
      imageUrl: image_512,
      date,
      text,
    });
    await say(getQuoteBlocks(imageUrl));
  } catch (error) {
    logger.error(error);
  }
};
