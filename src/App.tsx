import { useQuery } from "@tanstack/react-query"
import TaskCard from "./components/TaskCard"
import { fetchTasks } from "./api/tasks"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const App = () => {

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  })

  const [localTasks, setLocalTasks] = useState(tasks)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  const toggleTask = (id: number) => {
    setLocalTasks(localTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }
  return (
    <div>
      <Link to="/about">О приложении</Link>
      <h1>Мои задачи</h1>
      {isLoading && <p>Загрузка...</p>}
      {localTasks.map(task => <TaskCard onToggle={toggleTask} key={task.id} task={task} />)}
    </div>
  )
}

export default App