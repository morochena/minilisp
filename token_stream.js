"use strict";

class TokenStream {
    constructor(text) {
        this.text = text;
        this.index = 0;
        this.done = false;
    }

    // advances to next token
    advance() {
        this.index++;
        if (this.index === this.text.length) {
            this.done = true;
        }
    }

    currentToken() {
        return this.text[this.index];
    }

    isDone() {
        return this.done;
    }

    // peak ahead
    nextToken() {
        return this.text[this.index + 1];
    }
}

module.exports = TokenStream;
