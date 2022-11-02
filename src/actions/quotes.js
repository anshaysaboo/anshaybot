const generateQuoteImage = require("../lib/generateQuoteImage");
const { getUserProfile } = require("../util/slackUtil");

exports.quoteMeCommand = async ({ command, say, ack }) => {
  try {
    await ack();
    console.log(command);
    const { display_name, image_512 } = await getUserProfile(command.user_id);
    const text = command.text;
    const date = new Date().toLocaleDateString("en-US");

    const imageUrl = await generateQuoteImage({
      name: display_name,
      imageUrl: image_512,
      date,
      text,
    });
    await say(imageUrl);
  } catch (error) {
    console.error(error);
  }
};
