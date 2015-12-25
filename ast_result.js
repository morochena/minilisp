"use strict";

class AstResult {
  constructor() {
    this.roots = [];
    this.history = [];
    this.pointer = null;
  }

  newTree(tree) {
    if(this.pointer === null) {
      this.roots.push(tree);
      this.history.push(tree);
      this.pointer = tree;
    } else {
      this.pointer.insert(tree);
      this.history.push(tree);
      this.pointer = tree;
    }
  }

  previous() {
    if(!this.history.length) {
      return null;
    } else {
      return this.history[this.history.length-2];
    }
  }

  addChild(child) {
    this.pointer.insert(child);
    this.pointer = child;
  }

  back() {
    this.history.pop();
    if(!this.history.length) {
      this.pointer = null;
    } else {
      this.pointer = this.history[this.history.length-1];
    }
  }
}

module.exports = AstResult;
