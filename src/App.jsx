import { useEffect, useState } from 'react'
import { TaskProvider } from './context/TaskContext'
import Column from './components/Column'
import TaskForm from './components/TaskForm'

const columns = [
  { id: 'todo', label: 'To do' },
  { id: 'doing', label: 'In progress' },
  { id: 'done', label: 'Done' },
]

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('taskflow-theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('taskflow-theme', theme)
  }, [theme])

  return (
    <TaskProvider>
      <header className="top">
        <h1>TaskFlow</h1>
        <button className="ghost" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </header>
      <main>
        <TaskForm />
        <div className="board">
          {columns.map((col) => (
            <Column key={col.id} {...col} />
          ))}
        </div>
        <p className="hint">Drag cards between columns. Double-click a card to rename it.</p>
      </main>
    </TaskProvider>
  )
}
