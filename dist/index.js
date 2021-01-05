"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
console.clear();
console.log("Jens ToDo List");
let todos = [
    new todoItem_1.TodoItem(1, "köpa blommor"), new todoItem_1.TodoItem(2, "köra skoter")
];
let colection = new todoCollection_1.TodoCollection("Jens", todos);
console.log(`${colection.userName} todoList`);
console.log("---------------------------" + colection.getLength());
colection.getTodosItems(false).forEach(element => { element.printDetails(); });
colection.addTodo("åka skidor");
console.log("---------------------------" + colection.getLength());
colection.getTodosItems(false).forEach(element => { element.printDetails(); });
colection.markComplete(1, true);
console.log("---------------------------" + colection.getLength());
console.log(colection.userName + "'s Todo List " + colection.getItemCounts().incomplete + " items to do");
colection.getTodosItems(true).forEach(element => { element.printDetails(); });
