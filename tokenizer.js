"use strict";

var constants = require('./constants.js');
var TokenStream = require('./token_stream.js');

// takes minilisp text as input, generates an array of tokens to be fed into
// the parser
var tokenizer = (text) => {

  // to store resulting tokens
  var result = [];
  var tokenStream = new TokenStream(text);

  while(!tokenStream.isDone()) {
    var token = tokenStream.currentToken();
    // if token is a core symbol, simply add it to the result array
    if (constants.isAToken(token)) {
      result.push({ type: 'operator', value: token });
    }

    // if token is a letter, attempt to build the word
    // and then add the keyword to the result array
    else if (constants.isALetter(token)) {
      while(constants.isALetter(tokenStream.nextToken())) {
        tokenStream.advance();
        token += tokenStream.currentToken();
      }

      result.push({ type: 'keyword', value: token });
    }

    // if token is a number, attempt to build the whole number
    // and then add the number to the result array
    else if(constants.isANumber(token)) {
      while(constants.isANumber(tokenStream.nextToken())) {
        tokenStream.advance();
        token += tokenStream.currentToken();
      }

      result.push({ type: 'number', value: token });
    }

    // if token is a quote, take letters from stream until
    // we reach endquote (or something else)
    else if(token === constants.quote) {
      while(constants.isALetter(constants.nextToken())) {
        tokenStream.advance();
        token += tokenStream.currentToken();
      }

      // add the endquote once we gathered the whole string
      tokenStream.advance();
      token += tokenStream.currentToken();

      result.push({ type: 'string', value: token });
    }

    tokenStream.advance();
  }

  return result;
}

module.exports = tokenizer;
