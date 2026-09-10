import { Node, singlyLinkedList } from "./linkedLists.js";

const list = new singlyLinkedList();

list.push("10");
list.push("20");
list.push("30");
list.push("40");
list.push("50");
list.push("60");
list.print();
const result = list.printMiddle();
console.log(result);
