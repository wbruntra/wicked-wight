export const randomChoice = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const upperFirst = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const range = n => {
  return [...Array(n).keys()]
};

const generatePhrase = (n, wordList) => {
  const phrase = range(n).map(i => {
    return randomChoice(wordList);
  });
  return phrase.join(' ');
};

export const generatePhrases = (count, phraseLength, wordList) => {
  const phrases = range(count).map(i => {
    return generatePhrase(phraseLength, wordList);
  });
  return phrases;
};
