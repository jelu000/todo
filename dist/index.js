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
//import { JsonTodoCollection } from  "./JsonTodoCollection";
console.clear();
console.log("Jens ToDo List: ");
let todos = [
    new todoItem_1.TodoItem(1, "köpa blommor"), new todoItem_1.TodoItem(2, "köra skoter"),
    new todoItem_1.TodoItem(3, "busa med hund"), new todoItem_1.TodoItem(4, "kasta sopor")
];
let colection = new todoCollection_1.TodoCollection("Jens", todos);
let showCompleted = true;
function displayTodoList() {
    console.log(`${colection.userName} todoList: `
        + `${colection.getItemCounts().incomplete} saker att göra! `);
    colection.getTodosItems(showCompleted).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add new task";
    Commands["Complete"] = "Complete task";
    Commands["Toggle"] = "Show/Hide completed";
    Commands["Purge"] = "Remove completed task";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptComplete() {
    console.clear();
    inquirer.prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark task complete",
        choices: colection.getTodosItems(showCompleted).map(item => ({
            name: item.task, value: item.id, checked: item.complete
        }))
    }).then(answers => {
        let completedTask = answers["complete"];
        colection.getTodosItems(true).forEach(item => colection.markComplete(item.id, completedTask.find(id => id === item.id) != undefined));
        promptUser();
    });
}
function promptAdd() {
    console.clear();
    inquirer.prompt({ type: "input", name: "add", message: "Enter task:" })
        .then(answer => {
        if (answer["add"] !== "") {
            colection.addTodo(answer["add"]);
        }
        promptUser();
    });
}
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose  option",
        choices: Object.values(Commands),
    }).then(answer => {
        switch (answer["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (colection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands:
                Purge: colection.removeComplete();
                promptUser();
                break;
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
