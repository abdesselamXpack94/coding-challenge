class MinHeap {
    constructor() {
      this.storage = [];
      this.size = 0;
    }
  
    getLeftChildIndex(index) {
      return 2 * index + 1;
    }
  
    getRightChildIndex(index) {
      return 2 * index + 2;
    }
    // check if this rounds down
    getParentIndex(index) {
      return Math.floor((index - 1) / 2);
    }
  
    hasLeftChild(index) {
      return this.getLeftChildIndex(index) < this.size;
    }
  
    hasRightChild(index) {
      return this.getRightChildIndex(index) < this.size;
    }
  
    hasParent(index) {
      return this.getParentIndex(index) >= 0;
    }
  
    leftChild(index) {
      return this.storage[this.getLeftChildIndex(index)];
    }
  
    rightChild(index) {
      return this.storage[this.getRightChildIndex(index)];
    }
  
    parent(index) {
      return this.storage[this.getParentIndex(index)];
    }
  
    /**
     * the selector used to compare between the nodes
     * in this case we use the date of the log
     * 
     * @param {*} node 
     */
    selector(node) {
      return node.log.date;
    }
  
    swap(index1, index2) {
      let temp = this.storage[index1];
      this.storage[index1] = this.storage[index2];
      this.storage[index2] = temp;
    }
  
    insert(data) {
      this.storage[this.size] = data;
      this.size += 1;
      this.heapifyUp();
    }
  
    heapifyUp() {
      let index = this.size - 1;
      while (
        this.hasParent(index) &&
        this.selector(this.parent(index)) > this.selector(this.storage[index])
      ) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }
  
    /**
     * first element is always the min 
     * remove it then heapify down
     */
    removeMin() {
      if (this.size == 0) return {};
      let data = this.storage[0];
      this.storage[0] = this.storage[this.size - 1];
      this.size -= 1;
      this.heapifyDown();
      return data;
    }
  
    /**
     * Heapify down is used when we remove the top element from a heap.
     * Removal of an element is done by swapping the top element with the last element at the bottom of the tree
     * removing the last element, and then heapfying the new top element down to maintain the heap property.
     * 
     */
    heapifyDown() {
      let index = 0;
      while (this.hasLeftChild(index)) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        if (
          this.hasRightChild(index) &&
          this.selector(this.rightChild(index)) <
            this.selector(this.leftChild(index))
        )
          smallerChildIndex = this.getRightChildIndex(index);
        if (this.selector(this.storage[index]) < this.selector(this.storage[smallerChildIndex])) break;
        else this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
      }
    }
  }
  
  module.exports = MinHeap;
  