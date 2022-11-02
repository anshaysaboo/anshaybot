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
