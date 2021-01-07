import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  tasks: { id: number; task: string; complete: boolean; }[]
};

export class  JsonTodoCollection extends TodoCollection {
  private database: lowdb.LowdbSync<schemaType>;

  constructor(public userName: string, todoItems: TodoItem[] = []){
    super(userName, []);
    this.database = lowdb(new FileSync("Todos.json"));

    if (this.database.has("tasks").value()){
      let dbItems = this.database.get("tasks").value();
      dbItems.forEach(item => this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete)));
    }
    else{
      this.database.set("tasks", todoItems).write();
      todoItems.forEach(item => this.itemMap.set(item.id, item));
    }
  }

}
