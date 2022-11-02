const generateQuoteImage = require("../lib/generateQuoteImage");
const { getUserProfile } = require("../util/slackUtil");

exports.quoteMeCommand = async ({ command, say }) => {
  try {
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
    say(imageUrl);
  } catch (error) {
    console.error(error);
  }
};
