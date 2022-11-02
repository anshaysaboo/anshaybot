require("dotenv").config();

require("./src/lib/generateImage.js")({
  text: "Be the change you want to see in the world.",
  name: "Anshay Saboo",
  date: "November 16th, 2022",
  imageUrl:
    "https://www.lehighvalleylive.com/resizer/FUUIu1ZVIbuX0CALByyfxSi3Et0=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.lehighvalleylive.com/home/lvlive-media/width2048/img/entertainment_impact/photo/20769691-standard.jpg",
});
