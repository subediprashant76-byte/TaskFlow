import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'

export default function Column({ id, label }) {
  const { tasks, dispatch } = useTasks()
  const [isOver, setIsOver] = useState(false)
  const items = tasks.filter((t) => t.column === id)

  function handleDrop(e) {
    e.preventDefault()
    setIsOver(false)
    const taskId = Number(e.dataTransfer.getData('text/plain'))
    dispatch({ type: 'move', id: taskId, column: id })
  }

  return (
    <section
      className={`column ${isOver ? 'over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsOver(true)
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <h2>
        {label} <span className="count">{items.length}</span>
      </h2>
      <ul>
        {items.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
      {items.length === 0 && <p className="empty">Drop a task here</p>}
    </section>
  )
}
