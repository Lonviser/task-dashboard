import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/app/store'
import { setFilter } from '@/entities/task/model/filterSlice'

const Bar = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`

const Button = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: ${props => props.$active ? '#4f46e5' : '#e5e7eb'};
  color: ${props => props.$active ? '#fff' : '#000'};
`

const FilterBar = () => {
  const currentFilter = useSelector((state: RootState) => state.filter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Bar>
      <Button $active={currentFilter === 'all'} onClick={() => dispatch(setFilter('all'))}>Все</Button>
      <Button $active={currentFilter === 'active'} onClick={() => dispatch(setFilter('active'))}>Активные</Button>
      <Button $active={currentFilter === 'done'} onClick={() => dispatch(setFilter('done'))}>Выполненные</Button>
    </Bar>
  )
}

export default FilterBar