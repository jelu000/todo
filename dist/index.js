"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
const inquirer = __importStar(require("inquirer"));
console.clear();
console.log("Jens ToDo List");
let todos = [
    new todoItem_1.TodoItem(1, "köpa blommor"), new todoItem_1.TodoItem(2, "köra skoter"),
    new todoItem_1.TodoItem(3, "busa med hund"), new todoItem_1.TodoItem(4, "kasta sopor")
];
let colection = new todoCollection_1.TodoCollection("Jens", todos);
function displayTodoList() {
    console.log(`${colection.userName} todoList`
        + `${colection.getItemCounts().incomplete} items to do`);
    colection.getTodosItems(true).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose  option",
        choices: Object.values(Commands),
    }).then(answer => {
        if (answer["command"] !== Commands.Quit) {
            promptUser();
        }
    });
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
