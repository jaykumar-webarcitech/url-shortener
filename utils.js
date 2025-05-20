function findWordInSentence(sentence, targetWord) {
  // Split the sentence into an array of words
  const words = sentence.split(' ');
  
  // Try to find the target word in the array
  // ERROR: Using "find" incorrectly by not providing a callback function
  const foundWord = words.find(targetWord);
  
  if (foundWord) {
    return `Found the word "${targetWord}" in the sentence!`;
  } else {
    return `Could not find the word "${targetWord}" in the sentence.`;
  }
}

// Example usage
const sentence = "The quick brown fox jumps over the lazy dog";
const result = findWordInSentence(sentence, "fox");
console.log(result);
