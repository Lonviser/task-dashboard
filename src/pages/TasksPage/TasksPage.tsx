import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TaskCard } from '@/entities/task'
import { fetchTasks } from '@/entities/task'
import FilterBar from '@/entities/task/ui/FilterBar'
import type { RootState } from '@/app/store'
import type { Task } from '@/entities/task'

const TasksPage = () => {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  })

  const [localTasks, setLocalTasks] = useState<Task[]>(tasks)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  // Читаем текущий фильтр из store
  const filter = useSelector((state: RootState) => state.filter.value)

  // Фильтруем задачи в зависимости от выбранного фильтра
  const visibleTasks = localTasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
  })

  const toggleTask = (id: number) => {
    setLocalTasks(localTasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ))
  }

  return (
    <div>
      <Link to='/about'>О приложении</Link>
      <h1>Мои задачи</h1>
      <FilterBar />
      {isLoading && <p>Загрузка...</p>}
      {visibleTasks.map(task =>
        <TaskCard onToggle={toggleTask} key={task.id} task={task} />
      )}
    </div>
  )
}

export default TasksPage