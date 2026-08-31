import { Node, singlyLinkedList } from "./linkedLists.js";

const list = new singlyLinkedList();

list.push("10");
list.push("20");
list.push("30");
list.unshift("5");
// let contains = list.contains("40");
// list.print();
// list.contains("10");
// let index = list.indexOf("10");
// console.log(index);
// console.log(list.length);
// console.log(contains);
list.reverse();
list.print();
