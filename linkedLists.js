// Piece of data - val
// Reference to the next node - next

export class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

export class singlyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    if (!this.head) return undefined;

    let currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }

  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      console.error(
        "The value you entered should be greater than zero, and less than the length of the linked list.",
      );
      return null;
    }

    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }

    return current;
  }

  set(index, value) {
    let nodeToSet = this.get(index);

    if (!nodeToSet) {
      return false;
    } else {
      nodeToSet.val = value;
      return true;
    }
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      console.error(
        "The index you entered should be greater than zero, and have a corresponding node.",
      );
      return false;
    } else if (index === this.length) {
      return !!this.push(value);
    } else if (index === 0) {
      return !!this.unshift(value);
    } else {
      let newNode = new Node(value);
      let prev = this.get(index--);

      newNode.next = prev.next;
      prev.next = newNode;
      this.length++;
      return true;
    }
  }

  indexOf(value) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.val === value) {
        console.log(`The value ${value} is at index ${index}.`);
        return index;
      }
      current = current.next;
      index++;
    }

    console.log(`The value ${value} is not in the linked list.`);
    return -1;
  }

  contains(value) {
    if (this.indexOf(value) !== -1) {
      return true;
    }
    return false;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    } else if (index === this.length - 1) {
      return this.pop();
    } else if (index === 0) {
      return this.shift();
    } else {
      let prev = this.get(index - 1);
      let toRemove = this.get(index);

      prev.next = toRemove.next;
      this.length--;
      return toRemove;
    }
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }

  getKthFromEnd(k) {
    if (this.length === 0) {
      console.error("The linked list is empty.");
      return null;
    }

    let a = this.head;
    let b = this.head;

    for (let i = 0; i < k - 1; i++) {
      b = b.next;
      if (b == null) {
        console.error(
          "The value of k is greater than the length of the linked list.",
        );
        return null;
      }
    }
    while (b != this.tail) {
      a = a.next;
      b = b.next;
    }
    return a.val;
  }

  print() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }

    console.log("LinkedList =>", arr);
  }
}
