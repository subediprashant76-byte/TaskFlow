import { useState } from 'react'
import { useTasks } from '../context/TaskContext'

export default function TaskForm() {
  const { dispatch } = useTasks()
  const [title, setTitle] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const clean = title.trim()
    if (!clean) return
    dispatch({ type: 'add', title: clean })
    setTitle('')
  }

  return (
    <div className="add-form" role="group">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
        placeholder="What needs doing?"
        aria-label="New task title"
      />
      <button onClick={handleSubmit}>Add task</button>
    </div>
  )
}
