import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

console.clear();
console.log("Jens ToDo List");

let todos = [
  new TodoItem(1, "köpa blommor"), new TodoItem(2, "köra skoter")
];

let colection:TodoCollection = new TodoCollection("Jens", todos);

console.log(`${colection.userName} todoList`);

console.log("---------------------------" + colection.getLength());
colection.getTodosItems(false).forEach(element => { element.printDetails() });


colection.addTodo("åka skidor");

console.log("---------------------------" + colection.getLength());
colection.getTodosItems(false).forEach(element => { element.printDetails() });

colection.markComplete(1, true);
console.log("---------------------------" + colection.getLength());
console.log(colection.userName +"'s Todo List " + colection.getItemCounts().incomplete + " items to do");
colection.getTodosItems(true).forEach(element => { element.printDetails() });
