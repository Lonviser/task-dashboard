import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TaskCard, fetchTasks } from '@/entities/task'
import FilterBar from '@/entities/task/ui/FilterBar'
import type { RootState } from '@/app/store'
import type { Task } from '@/entities/task'
import { increment, decrement } from '@/entities/task/model/counterSlice'
import type { AppDispatch } from '@/app/store'
import { useSelector, useDispatch } from 'react-redux'


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
  const done = useSelector((state: RootState) => state.counter.done)
  const dispatch = useDispatch<AppDispatch>()


  const visibleTasks = localTasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    if (filter === 'done') return task.completed
  })

  const toggleTask = (id: number) => {
    const task = localTasks.find(t => t.id === id)
    if (!task) return

    if (task.completed) {
      dispatch(decrement())
    } else {
      dispatch(increment())
    }

    setLocalTasks(localTasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  return (
    <Page>
      <Link to='/about'>О приложении</Link>
      <Title>Мои задачи</Title>
      <p>Выполнено задач: {done}</p>

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