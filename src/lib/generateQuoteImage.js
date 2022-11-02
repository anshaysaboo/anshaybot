const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const { uploadImage, getImageSignedUrl } = require("../util/awsUtil.js");
const { formatText, getRandomQuoteMessage } = require("../util/quoteUtil.js");

exports.generateQuoteImage = async ({ name, imageUrl, text = "", date }) => {
  // Dimensions for the image
  const width = 1400;
  const height = 700;

  // Register fonts
  registerFont("./src/fonts/TimesNewRoman.ttf", { family: "Times New Roman" });
  registerFont("./src/fonts/TimesNewRomanBold.ttf", {
    family: "Times New Roman Bold",
  });
  registerFont("./src/fonts/TimesNewRomanItalic.ttf", {
    family: "Times New Roman Italic",
  });

  // Instantiate the canvas object
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Fill background with black
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);

  // Write quote text
  context.font = `50pt "Times New Roman Bold"`;
  context.textAlign = "center";
  context.fillStyle = "#fff";

  // Format the quote and render to the canvas
  const quoteX = 1050;
  const quoteY = 150;
  const lineHeight = 68;
  const quote = formatText(`\u201C ${text} \u201D`);
  let currentY = quoteY;
  quote.forEach((line, index) => {
    context.fillText(line, quoteX, currentY);
    currentY += lineHeight;
  });

  // Format the name
  context.font = `30pt "Times New Roman"`;
  currentY += 40;
  context.fillText("- " + name, quoteX, currentY);

  // Format the date
  context.font = `20pt "Times New Roman Italic"`;
  currentY += 40;
  context.fillText(date, quoteX, currentY);

  // Load and draw the image
  let img = null;
  try {
    img = await loadImage(imageUrl);
  } catch (err) {
    console.error(err);
    img = await loadImage(
      "https://media-exp1.licdn.com/dms/image/D5603AQFP4dHZQA_SEg/profile-displayphoto-shrink_800_800/0/1666294391846?e=1672876800&v=beta&t=RTjs7tOUiuKF6VrDMCKPrhxUwYlVkJ7aEMP55_LIREs"
    );
  }

  if (img) {
    context.save();
    context.fillStyle = "#cdcdcd";
    context.fillRect(0, 0, height, height);
    context.globalCompositeOperation = "luminosity";
    context.drawImage(img, 0, 0, height, height);
    context.restore();
  }

  // Write the image to file
  const buffer = Buffer.from(canvas.toBuffer("image/jpeg"));
  const id = uuid() + ".jpeg";
  await uploadImage(buffer, id);
  const url = getImageSignedUrl(id);
  return url;
};

exports.getQuoteBlocks = (image_url) => {
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
