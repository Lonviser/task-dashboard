import styled from "styled-components"
import type { Task } from "../model/task"

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
}

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  cursor: pointer;
  `
const Title = styled.span<{ $done: boolean }>`
  text-decoration: ${props => props.$done ? 'line-through' : 'none'};
  color: ${props => props.$done ? '#999' : '#000'};
`
const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  return (
    <Card onClick={() => onToggle(task.id)}>
      <Title $done={task.completed}>{task.title}</Title>
    </Card>
  )
}

export default TaskCard