import { useState } from 'react'
import { useTasks } from '../context/TaskContext'

export default function TaskCard({ task }) {
  const { dispatch } = useTasks()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)

  function save() {
    const title = draft.trim()
    if (title) dispatch({ type: 'rename', id: task.id, title })
    else setDraft(task.title)
    setEditing(false)
  }

  return (
    <li
      className="card"
      draggable={!editing}
      onDragStart={(e) => e.dataTransfer.setData('text/plain', String(task.id))}
    >
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') {
              setDraft(task.title)
              setEditing(false)
            }
          }}
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>{task.title}</span>
      )}
      <button
        className="icon-btn"
        aria-label={`Delete ${task.title}`}
        onClick={() => dispatch({ type: 'remove', id: task.id })}
      >
        ×
      </button>
    </li>
  )
}
