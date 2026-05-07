import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TaskCard, fetchTasks } from '@/entities/task'
import FilterBar from '@/entities/task/ui/FilterBar'
import type { RootState } from '@/app/store'
import type { Task } from '@/entities/task'

const Page = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 32px 16px;
`

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 8px;
`

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const TasksPage = () => {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  })

  const [localTasks, setLocalTasks] = useState<Task[]>(tasks)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  const filter = useSelector((state: RootState) => state.filter.value)

  const visibleTasks = localTasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    if (filter === 'done') return task.completed
  })

  const toggleTask = (id: number) => {
    setLocalTasks(localTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <Page>
      <Link to='/about'>О приложении</Link>
      <Title>Мои задачи</Title>
      <FilterBar />
      {isLoading && <p>Загрузка...</p>}
      <TaskList>
        {visibleTasks.map(task =>
          <TaskCard onToggle={toggleTask} key={task.id} task={task} />
        )}
      </TaskList>
    </Page>
  )
}

export default TasksPage