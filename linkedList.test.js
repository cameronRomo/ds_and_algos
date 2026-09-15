import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { SinglyLinkedList } from './linkedLists.js';

describe('SinglelyLinkedList', () => {
  let list;

  beforeEach(() => {
    list = new SinglyLinkedList();
  });

  describe('inital state', () => {
    it('starts with no head', () => {
      assert.equal(list.head, null);
    });

    it('starts with no tail', () => {
      assert.equal(list.tail, null);
    });

    it('starts with no length', () => {
      assert.equal(list.length, 0);
    });
  });

  describe('push', () => {
    it('sets the head and tail when pushing to an empty list', () => {
      list.push(1);
      
      assert.equal(list.head.val, 1);
      assert.equal(list.tail.val, 1);
      assert.equal(list.head, list.tail);
    });

    it('increments the length by 1', () => {
      list.push(1);

      assert.equal(list.length, 1);
    });

    it('keeps head fixed while moving tail on subsequent pushes', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      assert.equal(list.head.val, 1);
      assert.equal(list.tail.val, 3);
    });

    it('links nodes together via next in push order', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      assert.equal(list.head.next.val, 2);
      assert.equal(list.head.next.next.val, 3);
      assert.equal(list.tail.next, null);
    });

    it('return the list itself, to support chaining', () => {
      const result = list.push(1);

      assert.equal(result, list);
    });

    it('supports chained pushes', () => {
      list.push(1).push(2).push(3);

      assert.equal(list.length, 3);
      assert.equal(list.tail.val, 3);
    })
  });

  describe('pop', () => {
    it('returns undefined when the list is empty', () => {
      const result = list.pop();

      assert.equal(result, undefined);
    });

    it('does not decrement the length below zero on an empty list', () => {
      assert.equal(list.length, 0);
    });

    it('removes and returns the only node, resetting head and tail to null', () => {
      list.push(1);

      const result = list.pop();

      assert.equal(result.val, 1);
      assert.equal(list.head, null);
      assert.equal(list.tail, null);
      assert.equal(list.length, 0);
    });

    it('removes and returns the last node when multiple nodes exist', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const result = list.pop();
      
      assert.equal(result.val, 3);
    });

    it('updates the tail to the second-to-last node', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.pop();

      assert.equal(list.tail.val, 2);
    });

    it('sets the new tail\'s next to null', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.pop();

      assert.equal(list.tail.val, 2);
      assert.equal(list.tail.next, null);
    });

    it('leaves head untouched when popping from a multi-node list', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.pop();

      assert.equal(list.head.val, 1);
    });

    it('decrements length by 1', () => {
      list.push(1);
      list.push(2);

      list.pop();

      assert.equal(list.length, 1);
    });

    it('correctly empties the list after popping every node', () => {
      list.push(1);
      list.push(2);

      list.pop();
      list.pop();

      assert.equal(list.head, null);
      assert.equal(list.tail, null);
      assert.equal(list.length, 0);
    });
  });

  describe('shift', () => {
    it('returns undefined when the list is empty', () => {
      const result = list.shift();

      assert.equal(result, undefined);
    });

    it('does not decrement length below zero on an empty list', () => {
      list.shift();

      assert.equal(list.length, 0);
    });

    it('removes and returns the only node, resetting the head and tail to null', () => {
      list.push(1);

      const result = list.shift();

      assert.equal(result.val, 1);
      assert.equal(list.head, null);
      assert.equal(list.tail, null);
      assert.equal(list.length, 0);
    });

    it('removes and returns the first node when multiple nodes exist', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.shift();

      assert.equal(list.head.val, 2);
    });
    
    it('leaves tail untouched when shifting a multi-node list', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.shift();

      assert.equal(list.tail.val, 3);
    });

    it('decrements length by 1', () => {
      list.push(1);
      list.push(2);

      list.shift();

      assert.equal(list.length, 1);
    });

    it('correctly empties the list after shifting every node', () => {
      list.push(1);
      list.push(2);

      list.shift();
      list.shift();

      assert.equal(list.head, null);
      assert.equal(list.tail, null);
      assert.equal(list.length, 0);
    });

    it('does not null out the returned node\'s next pointer', () => {
      list.push(1);
      list.push(2);

      const result = list.shift();

      assert.equal(result.next.val, 2);
    });
  });
});