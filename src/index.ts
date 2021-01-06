import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

import * as inquirer from 'inquirer';

console.clear();
console.log("Jens ToDo List");

let todos = [
  new TodoItem(1, "köpa blommor"), new TodoItem(2, "köra skoter")
  , new TodoItem(3, "busa med hund"), new TodoItem(4, "kasta sopor")
];

let colection:TodoCollection = new TodoCollection("Jens", todos);


function displayTodoList():void {
  console.log(`${colection.userName} todoList`
  + `${colection.getItemCounts().incomplete} items to do`
  );

  colection.getTodosItems(true).forEach(item => item.printDetails());
}

enum Commands {
  Quit = "Quit"
}

function promptUser(): void {
  console.clear();

  displayTodoList();

  inquirer.prompt({
    type: "list",
    name: "command",
    message: "Choose  option",
    choices: Object.values(Commands),
    //badProperty: true
  }).then(answer => {
    if (answer["command"] !== Commands.Quit){
      promptUser();
    }

  })
}

promptUser();


/* First exercise
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
*/
