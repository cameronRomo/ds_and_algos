import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { LinkedList } from "./LinkedLists.js";

describe("SinglyLinkedList", () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe("inital state", () => {
    it("starts with no head", () => {
      assert.equal(list.head, null);
    });

    it("starts with no tail", () => {
      assert.equal(list.tail, null);
    });

    it("starts with no length", () => {
      assert.equal(list.length, 0);
    });
  });

  describe("push", () => {
    it("sets the head and tail when pushing to an empty list", () => {
      list.push(1);

      assert.equal(list.head.val, 1);
      assert.equal(list.tail.val, 1);
      assert.equal(list.head, list.tail);
    });

    it("increments the length by 1", () => {
      list.push(1);

      assert.equal(list.length, 1);
    });

    it("keeps head fixed while moving tail on subsequent pushes", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      assert.equal(list.head.val, 1);
      assert.equal(list.tail.val, 3);
    });

    it("links nodes together via next in push order", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      assert.equal(list.head.next.val, 2);
      assert.equal(list.head.next.next.val, 3);
      assert.equal(list.tail.next, null);
    });

    it("return the list itself, to support chaining", () => {
      const result = list.push(1);

      assert.equal(result, list);
    });

    it("supports chained pushes", () => {
      list.push(1).push(2).push(3);

      assert.equal(list.length, 3);
      assert.equal(list.tail.val, 3);
    });
  });

  describe("pop", () => {
    it("returns undefined when the list is empty", () => {
      const result = list.pop();

      assert.equal(result, undefined);
    });

    it("does not decrement the length below zero on an empty list", () => {
      assert.equal(list.length, 0);
    });

    it("removes and returns the only node, resetting head and tail to null", () => {
      list.push(1);

      const result = list.pop();

      assert.equal(result.val, 1);
      assert.equal(list.head, null);
      assert.equal(list.tail, null);
      assert.equal(list.length, 0);
    });

    it("removes and returns the last node when multiple nodes exist", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const result = list.pop();

      assert.equal(result.val, 3);
    });

    it("updates the tail to the second-to-last node", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.pop();

      assert.equal(list.tail.val, 2);
    });

    it("sets the new tail's next to null", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.pop();

      assert.equal(list.tail.val, 2);
      assert.equal(list.tail.next, null);
    });

    it("leaves head untouched when popping from a multi-node list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.pop();

      assert.equal(list.head.val, 1);
    });

    it("decrements length by 1", () => {
      list.push(1);
      list.push(2);

      list.pop();

      assert.equal(list.length, 1);
    });

    it("correctly empties the list after popping every node", () => {
      list.push(1);
      list.push(2);

      list.pop();
      list.pop();

      assert.equal(list.head, null);
      assert.equal(list.tail, null);
      assert.equal(list.length, 0);
    });
  });

  describe("shift", () => {
    it("returns undefined when the list is empty", () => {
      const result = list.shift();

      assert.equal(result, undefined);
    });

    it("does not decrement length below zero on an empty list", () => {
      list.shift();

      assert.equal(list.length, 0);
    });

    it("removes and returns the only node, resetting the head and tail to null", () => {
      list.push(1);

      const result = list.shift();

      assert.equal(result.val, 1);
      assert.equal(list.head, null);
      assert.equal(list.tail, null);
      assert.equal(list.length, 0);
    });

    it("removes and returns the first node when multiple nodes exist", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.shift();

      assert.equal(list.head.val, 2);
    });

    it("leaves tail untouched when shifting a multi-node list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.shift();

      assert.equal(list.tail.val, 3);
    });

    it("decrements length by 1", () => {
      list.push(1);
      list.push(2);

      list.shift();

      assert.equal(list.length, 1);
    });

    it("correctly empties the list after shifting every node", () => {
      list.push(1);
      list.push(2);

      list.shift();
      list.shift();

      assert.equal(list.head, null);
      assert.equal(list.tail, null);
      assert.equal(list.length, 0);
    });

    it("does not null out the returned node's next pointer", () => {
      list.push(1);
      list.push(2);

      const result = list.shift();

      assert.equal(result.next.val, 2);
    });

    it("updates the head to the second node when multiple nodes exist", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.shift();

      assert.equal(list.head.val, 2);
    });
  });
  describe("unshift", () => {
    it("sets the head and tail when unshifting to an empty list", () => {
      list.unshift(1);

      assert.equal(list.head.val, 1);
      assert.equal(list.tail.val, 1);
      assert.equal(list.head, list.tail);
    });

    it("increments the length by 1", () => {
      list.unshift(1);

      assert.equal(list.length, 1);
    });

    it("keeps tail fixed while moving head on subsequent unshifts", () => {
      list.unshift(1);
      list.unshift(2);
      list.unshift(3);

      assert.equal(list.head.val, 3);
      assert.equal(list.tail.val, 1);
    });

    it("links nodes together via next in unshift order", () => {
      list.unshift(1);
      list.unshift(2);
      list.unshift(3);

      assert.equal(list.head.next.val, 2);
      assert.equal(list.head.next.next.val, 1);
      assert.equal(list.tail.next, null);
    });

    it("return the list itself", () => {
      const result = list.unshift(1);

      assert.equal(result, list);
    });

    it("supports chained unshifts", () => {
      list.unshift(1).unshift(2).unshift(3);

      assert.equal(list.length, 3);
      assert.equal(list.head.val, 3);
    });
  });
  describe("get", () => {
    it("returns null when the index is out of bounds", () => {
      assert.equal(list.get(1), null);
    });

    it("returns the node at the given index", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const result = list.get(1);
      assert.equal(result.val, 2);
    });

    it("returns the head when index is 0", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const result = list.get(0);
      assert.equal(result.val, list.head.val);
    });
  });
  describe("set", () => {
    it("returns false when the index is out of bounds", () => {
      assert.equal(list.set(1, 10), false);
    });

    it("returns true when the index is valid", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      assert.equal(list.set(1, 10), true);
    });

    it("updates the value of the node at the given index", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.set(1, 10);

      assert.equal(list.get(1).val, 10);
    });

    it("does not change the length of the list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.set(1, 10);

      assert.equal(list.length, 3);
    });

    it("sets the head when index is 0", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.set(0, 10);

      assert.equal(list.head.val, 10);
    });

    it("sets the tail when index is length - 1", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.set(2, 10);

      assert.equal(list.tail.val, 10);
    });
  });

  describe("insert", () => {
    it("returns false when index is greater than the available indexes for the list", () => {
      assert.equal(list.insert(1, 10), false);
    });

    it("returns false when index negative", () => {
      assert.equal(list.insert(-1, 10), false);
    });

    it("returns true when index is valid", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      assert.equal(list.insert(1, 10), true);
    });

    it("inserts a new node at the given index", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      assert.equal(list.length, 3);

      list.insert(1, 10);

      assert.equal(list.get(1).val, 10);
      assert.equal(list.length, 4);
    });

    it("inserts at the beginning of the list", () => {
      list.push(1);
      list.push(2);

      list.insert(0, 10);

      assert.equal(list.head.val, 10);
    });

    it("inserts at the end of the list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.insert(2, 10);
      list.print();
      assert.equal(list.tail.val, 10);
    });
  });

  describe("indexOf", () => {
    it("returns index of given value", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      let result = list.indexOf(2);

      assert.equal(result, 1);
    });

    it("returns -1 if the value doesn't exist", () => {
      let result = list.indexOf(2);

      assert.equal(result, -1);
    });
  });

  describe("contains", () => {
    it("returns true if a value is contained in the list, negative if not", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      let positive = list.contains(3);
      let negative = list.contains(4);

      assert.equal(positive, true);
      assert.equal(negative, false);
    });
  });

  describe("remove", () => {
    it("returns undefined if value is out of bounds", () => {
      let negativeIndex = list.remove(-1);
      let positiveIndex = list.remove(1);

      assert.equal(negativeIndex, undefined);
      assert.equal(positiveIndex, undefined);
    });

    it("removes tail, and assigns new tail", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.remove(2);

      list.print();

      assert.equal(list.length, 2);
      assert.equal(list.tail.val, 2);
    });

    it("removes head, and assigns new head", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.remove(0);

      assert.equal(list.length, 2);
      assert.equal(list.head.val, 2);
    });

    it("removes in the middle of the list, and tethers new sister nodes together", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.remove(1);

      assert.equal(list.length, 2);
      assert.equal(list.head.next.val, list.tail.val);
    });
  });

  describe("reverse", () => {
    it("reverses the linked list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.reverse();

      assert.equal(list.head.val, 3);
      assert.equal(list.head.next.val, 2);
      assert.equal(list.tail.val, 1);
    });
  });

  describe("getKthFromEnd", () => {
    it("returns null for an empty linked list", () => {
      let result = list.getKthFromEnd(1);

      assert.equal(result, null);
    });

    it("returns null when K is greater than the length of the list", () => {
      list.push(1);
      list.push(2);

      let result = list.getKthFromEnd(3);

      assert.equal(result, null);
    });

    it("gets the Kth node from the end of an odd number of nodes in the list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
      list.push(5);

      let result = list.getKthFromEnd(3);

      assert.equal(result, 3);
    });
  });

  describe("printMiddle", () => {
    it("returns null if the list is empty", () => {
      let result = list.printMiddle();

      assert.equal(result, null);
    });

    it("prints the middle node of an odd numbered list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
      list.push(5);

      let result = list.printMiddle();
      assert.equal(result, 3);
    });

    it("prints middle two nodes of an even numbered list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      let result = list.printMiddle();

      assert.deepEqual(result, [2, 3]);
    });
  });
});
