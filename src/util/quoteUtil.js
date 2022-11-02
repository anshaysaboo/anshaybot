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
