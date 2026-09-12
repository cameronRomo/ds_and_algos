import { SinglyLinkedList } from "./linkedLists.js";

const list = new SinglyLinkedList();

list.push("10");
list.push("20");
list.push("30");
list.push("40");
list.push("50");
list.push("60");
list.print();
const result = list.printMiddle();
console.log(result);
