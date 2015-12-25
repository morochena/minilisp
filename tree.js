"use strict";

class Tree {
  constructor() {
    this.data = {
      type: null,
      value: null
    };
    this.children = [];
  }

  setType(val) {
    this.data.type = val;
  }

  setValue(val) {
    this.data.value = val;
  }

  get(attr) {
    return this.data[attr];
  }

  insert(tree) {
    this.children.push(tree);
  }
}

module.exports = Tree;
