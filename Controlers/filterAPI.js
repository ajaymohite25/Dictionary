function filerDataApi(data, sentWord) {
  let dbStoreWord = {
    word: "",
    category: "",
    defination: "",
    shortdefination: "",
    examples: "",
    synonyms: "",
  };
  const wordInfo = data.data.results[0].lexicalEntries[0]; //FILTERING DATA FROM API RESPONSE

  dbStoreWord.word = sentWord;

  dbStoreWord.category = wordInfo.lexicalCategory?.text; //FILTERING DATA FROM API RESPONSE

  dbStoreWord.defination = wordInfo.entries[0].senses[0].definitions[0]; //FILTERING DATA FROM API RESPONSE

  dbStoreWord.shortdefination =
    wordInfo.entries[0].senses[0].shortDefinitions[0]; //FILTERING DATA FROM API RESPONSE

  dbStoreWord.examples = wordInfo.entries[0].senses[0].examples
    ? wordInfo.entries[0].senses[0].examples[0]?.text
    : ""; //FILTERING DATA FROM API RESPONSE

  dbStoreWord.synonyms = wordInfo.entries[0].senses[0].synonyms
    ? wordInfo.entries[0].senses[0].synonyms[0]?.text
    : ""; //FILTERING DATA FROM API RESPONSE

  return dbStoreWord;
}
exports.filerDataApi = filerDataApi;
