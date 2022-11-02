const axios = require("axios");

exports.getUserProfile = async (userId) => {
  // Get user from slack api
  try {
    const res = await axios.request({
      url: "https://slack.com/api/users.profile.get",
      method: "get",
      headers: {
        Authorization: "Bearer " + process.env.SLACK_BOT_TOKEN,
      },
      params: {
        user: userId,
      },
    });
    return res.data.profile;
  } catch (error) {
    console.error(error);
    return {};
  }
};

exports.getUserMessageInfo = async (channel, ts) => {
  try {
    const res = await axios.request({
      url: "https://slack.com/api/conversations.history",
      method: "get",
      headers: {
        Authorization: "Bearer " + process.env.SLACK_BOT_TOKEN,
      },
      params: {
        channel,
        latest: ts,
        limit: "1",
        inclusive: "true",
      },
    });
    const messageData = res.data;
    if (messageData.messages.length < 1) return;
    const message = messageData.messages[0];

    const user = await this.getUserProfile(message.user);

    return {
      message,
      user,
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};
