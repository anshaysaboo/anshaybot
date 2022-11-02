const AWS = require("aws-sdk");

const s3Client = new AWS.S3({
  accessKeyId: process.env.BOT_AWS_ACCESS_KEY,
  secretAccessKey: process.env.BOT_AWS_SECRET_KEY,
  region: "us-west-1",
});

exports.uploadImage = (buffer, key) => {
  if (!buffer) return {};
  const params = {
    Body: buffer,
    Bucket: process.env.BOT_AWS_BUCKET_NAME,
    Key: key,
  };
  return s3Client.upload(params).promise();
};

exports.getImageSignedUrl = async (key) => {
  const params = {
    Bucket: process.env.BOT_AWS_BUCKET_NAME,
    Key: key,
    Expires: 3600 * 24 * 365,
  };
  return s3Client.getSignedUrl("getObject", params);
};
