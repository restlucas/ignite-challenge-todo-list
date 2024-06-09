import './global.css'

import { ClipboardText } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

import styles from './App.module.css'
import { Header } from './components/Header'
import { NewTaskInput } from './components/NewTaskInput'
import { Task } from './components/Task'

export interface Task {
  id: number
  finished: true | false
  description: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [createdTasks, setCreatedTasks] = useState(0)
  const [finishedTasksAmount, setFinishedTasksAmount] = useState(0)

  useEffect(() => {
    if (tasks) {
      setCreatedTasks(tasks.length)
      setFinishedTasksAmount(
        tasks.filter((task) => task.finished === true).length,
      )
    }
  }, [tasks])

  function handleNewTask(description: string) {
    const newTask: Task = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      finished: false,
      description,
    }

    setTasks((state) => [...state, newTask])
  }

  function handleTask(taskId: number, action: 'check' | 'delete') {
    if (action === 'check') {
      setTasks((prevTasks) =>
        prevTasks?.map((task) =>
          task.id === taskId ? { ...task, finished: !task.finished } : task,
        ),
      )
    } else {
      setTasks((prevTasks) => prevTasks?.filter((task) => task.id !== taskId))
    }
  }

  return (
    <div>
      <Header />
      <NewTaskInput handleNewTask={handleNewTask} />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <span>
              Tarefas criadas <button>{createdTasks}</button>
            </span>
            <span>
              Concluídas <button>{finishedTasksAmount}</button>
            </span>
          </div>

          {tasks.length > 0 ? (
            tasks.map((task, i) => {
              return (
                <Task
                  key={i}
                  id={task.id}
                  finished={task.finished}
                  description={task.description}
                  handleTask={handleTask}
                />
              )
            })
          ) : (
            <div className={styles.emptyContent}>
              <ClipboardText size={56} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
