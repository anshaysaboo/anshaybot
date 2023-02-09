const { quoteReaction } = require("../actions/quotes.js");

module.exports = async (data) => {
  const { event } = data;
  try {
    if (event.reaction === "writing_hand") {
      await quoteReaction(data);
    }
  } catch (error) {
    logger.error(error);
  }
};
