import { TodoItem } from "./todoItem";

type ItemCounts = {
  total: number,
  incomplete: number
}

export class TodoCollection {
  private nextId: number = 1;
  protected itemMap = new Map<number, TodoItem>();

  constructor(public userName: string, public todoItems: TodoItem[] = []){
      todoItems.forEach(item => this.itemMap.set(item.id, item));
  }

  addTodo(task: string):number{
    while(this.getTodoById(this.nextId)){
      this.nextId++;
    }
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
    return this.nextId;
  }

  getTodoById(id: number) {
    return this.itemMap.get(id);
  }

  getTodosItems(includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
  }


  markComplete(id: number, complete: boolean){
    const todoItem = this.getTodoById(id);

    if (todoItem){
      todoItem.complete = complete;
    }
  }

  removeComplete(){
    console.log("inne i removeC()!")
    this.itemMap.forEach(item => {
      if (item.complete){
        this.itemMap.delete(item.id);
      }
    })
  }

  getLength():number {
    return this.itemMap.size;
  }

  getItemCounts(): ItemCounts{
    return {
      total: this.itemMap.size,
      incomplete: this.getTodosItems(false).length
    }
  }

}
