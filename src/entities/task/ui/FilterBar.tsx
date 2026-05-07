import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/app/store'
import { setFilter } from '@/entities/task/model/filterSlice'

const FilterBar = () => {
  // Читаем текущий фильтр из блокнота (store)
  const currentFilter = useSelector((state: RootState) => state.filter.value)

  // Получаем функцию для отправки заявок в store
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <button
        onClick={() => dispatch(setFilter('all'))}
        style={{ fontWeight: currentFilter === 'all' ? 'bold' : 'normal' }}
      >
        Все
      </button>
      <button
        onClick={() => dispatch(setFilter('active'))}
        style={{ fontWeight: currentFilter === 'active' ? 'bold' : 'normal' }}
      >
        Активные
      </button>
      <button
        onClick={() => dispatch(setFilter('done'))}
        style={{ fontWeight: currentFilter === 'done' ? 'bold' : 'normal' }}
      >
        Выполненные
      </button>
    </div>
  )
}

export default FilterBar