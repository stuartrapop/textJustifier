const justifyController = {
  // for learing mocha/chai
  sayHello: () => 'hello',

  /* build an 80 character line
    1)add spaces equally between words as possible. Longer spaces at the beginning of sentence.
        ie. 11 spaces for 9 words. first 3 separations have two spaces
    2)last line not justified if 1 words
    3)trim any word longer thans 80 characters to 80 characters and console.log and error
    4)punctiation is part of the word if attached or a separate "word" if space before ie ":"
    5)sentences starting with punctuation should be avoided in a future version
  */
  makeline: (lineInfo) => {
    let lineString = '';
    let extraSpaces = 80 - (lineInfo.nonSpaceCharacters + lineInfo.numberWords - 1);
    // eslint-disable-next-line max-len
    for (let stringWordCounter = 0; stringWordCounter < lineInfo.numberWords; stringWordCounter += 1) {
      if (stringWordCounter === lineInfo.numberWords - 1) {
        lineString += `${lineInfo.lineWords[stringWordCounter]}`;
      } else {
        lineString += `${lineInfo.lineWords[stringWordCounter]} `;
        if (extraSpaces > 0) {
          const spacesToAdd = Math.ceil(extraSpaces
            / (lineInfo.numberWords - stringWordCounter - 1));
          /*  console.log('extraSpaces, spacesToAdd, (lineInfo - stringWordCounter) ',
            extraSpaces, spacesToAdd, (lineInfo.numberWords - stringWordCounter)); */
          lineString = lineString.padEnd(lineString.length + spacesToAdd, ' ');
          extraSpaces -= spacesToAdd;
        }
      }
    }
    //  console.log('line length', lineString.length);

    return lineString;
  },

  // receive text variable from post body and justify all lines except the last one.
  // easy to justify the last one as well if that is required.
  justify80: (req, res) => {
    const receivedText = req.body.text;
    const words = receivedText.split(' ');
    const lines = [];
    const lineInfo = {
      numberWords: 0,
      nonSpaceCharacters: 0,
      lineWords: [],
    };

    // loop through all words builing line by line. trim any word longer than 80 characters
    for (let counter = 0; counter < words.length; counter += 1) {
      lineInfo.numberWords += 1;
      lineInfo.nonSpaceCharacters += Math.min(words[counter].length, 80);
      lineInfo.lineWords.push(words[counter].substring(0, 79)); // only take first 80 chars

      // if the next word makes line longer than 80 chars or last word of text build line
      if (
        ((lineInfo.nonSpaceCharacters
          + (lineInfo.numberWords)
          + words[Math.min(counter + 1, words.length - 1)].length) > 80)
        || (counter === words.length - 1)) {
        const newLine = justifyController.makeline(lineInfo);
        lines.push(newLine);
        lineInfo.numberWords = 0;
        lineInfo.nonSpaceCharacters = 0;
        lineInfo.lineWords = [];
      }
    }
    // return table of justified lines to avoid transmitting html.
    // could have joined lines with '\n' carriage feed or '<br>' ie. lines.join('\n')
    res.json({ responseMessage: lines });
  },

};

module.exports = justifyController;
