const getMaxNextLine = (text, maxChars = 20) => {
  const allWords = text.split(" ");
  let line = "";
  let i = 0;
  while (i < allWords.length && line.length + allWords[i].length <= maxChars) {
    line += allWords[i] + " ";
    i++;
  }
  return line.substring(0, line.length - 1);
};

exports.getRandomQuoteMessage = () => {
  const messages = [
    "Truly profound.",
    "Such wise words.",
    "We all can learn a thing or two from this.",
    "Truer words have never been spoken.",
    "Preach.",
    "Words to live by.",
    "On god.",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

exports.formatText = (text) => {
  let output = [];
  let remainingChars = text.length;
  while (remainingChars > 0) {
    const line = getMaxNextLine(text);
    remainingChars -= line.length;
    text = text.substring(line.length);
    output.push(line);
  }
  return output;
};

exports.getQuoteBlock = (image_url) => {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: getRandomQuoteMessage(),
        },
      },
      {
        type: "image",
        image_url,
        alt_text: "quote",
      },
    ],
  };
};
