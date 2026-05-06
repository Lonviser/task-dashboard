import type {Task} from "../entities/task/model/task"

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
}


const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  return (
    <div onClick={()=> onToggle(task.id)}>
      <span>{task.title}</span>
      <span>{task.completed ? '✅' : '⏳'}</span>
    </div>
  )
}

export default TaskCard