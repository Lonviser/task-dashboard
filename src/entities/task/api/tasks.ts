import type { Task } from "../model/task";

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    return data.map((item: any)=>{
      return {
        id: item.id,
        title: item.title,
        done: item.completed
      }
    })
}