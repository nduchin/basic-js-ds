const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(data, parent = null){
    this.data = data;
    this.parent = parent;
    this.left = null;
    this.right = null
  }

  root() {
    if (this.data){return this}else{return null}
  }

  add(data) {
    if (!this.data){
      this.data = data
    }else if (data <= this.data){
      if (!this.left){
        this.left = new BinarySearchTree(data,this)
      }else{
        this.left.add(data)
      }
    }else{
      if (!this.right){
        this.right = new BinarySearchTree(data,this)
      }else{
        this.right.add(data)
      }
    }
  }

  has(data) {
    return !!this.find(data)
  }

  find(data) {
    if (this.data==data){
      return this
    }else if(data < this.data&&this.left){
      return this.left.find(data)
    }else if (this.right){
      return this.right.find(data)
    }
    return null
  }

  remove(data) {
    if (data&&data!=this.data){// check for data is not match
      return this.find(data).remove()
    }
    function eraseParent() {
      if (this==this.parent.left){this.parent.left=null}else{this.parent.right=null}
      this.parent=null
    }
    function pullChildren(node){
      this.left=node.left;
      if (node.left){
        node.left.parent=this;
        node.left=null
      };
      this.right=node.right;
      if (node.right){
        node.right.parent=this
        node.right=null
      };
    }
    //remove
    if (!this.left&&!this.right){// no children
      if (!this.parent){// clear single root
        this.data = null
      }else{// erase parent bound
        eraseParent.call(this)
      }
    }else if (!this.left!=!this.right){// one child
      let child = (this.left)?(this.left):(this.right)
      eraseParent.call(child)
      pullChildren.call(this,child)
      let res = new BinarySearchTree(this.data)
      this.data = child.data
      return res
    }else{// two childern
      let replacer = this.right.min(true).remove()
      let res = new BinarySearchTree(this.data)
      this.data=replacer.data
      return res
    }
    return this
  }

  min(getNode = false) {
    if (!this.left){
      return ((getNode)?(this):(this.data))
    }else{
      return this.left.min(getNode)
    }
  }

  max(getNode = false) {
    if (!this.right){
      return ((getNode)?(this):(this.data))
    }else{
      return this.right.max(getNode)
    }
  }
}

module.exports = {
  BinarySearchTree
};