const filterTasks = (tasks: any[], filter: string) => {
    if (filter === 'all') return tasks
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'done') return tasks.filter(t => t.completed)
    return tasks
}

const tasks = [
    { id: 1, title: 'Первая', completed: false },
    { id: 2, title: 'Вторая', completed: true },
    { id: 3, title: 'Третья', completed: false },
]

test('фильтр all возвращает все задачи', () => {
    const result = filterTasks(tasks, 'all')
    expect(result).toHaveLength(3)
})

test('фильтр active возвращает только активные', () => {
    const result = filterTasks(tasks, 'active')
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe(1)
})

test('фильтр done возвращает только выполненные', () => {
    const result = filterTasks(tasks, 'done')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
})