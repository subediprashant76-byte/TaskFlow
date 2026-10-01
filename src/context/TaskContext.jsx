import { createContext, useContext, useEffect, useReducer } from 'react'

const STORAGE_KEY = 'taskflow-tasks'

const starterTasks = [
  { id: 1, title: 'Sketch the landing page', column: 'todo' },
  { id: 2, title: 'Set up project repo', column: 'doing' },
  { id: 3, title: 'Pick a color palette', column: 'done' },
]

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : starterTasks
  } catch {
    return starterTasks
  }
}

function reducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, { id: Date.now(), title: action.title, column: 'todo' }]
    case 'rename':
      return tasks.map((t) => (t.id === action.id ? { ...t, title: action.title } : t))
    case 'move':
      return tasks.map((t) => (t.id === action.id ? { ...t, column: action.column } : t))
    case 'remove':
      return tasks.filter((t) => t.id !== action.id)
    default:
      return tasks
  }
}

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, null, loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used inside TaskProvider')
  return ctx
}
