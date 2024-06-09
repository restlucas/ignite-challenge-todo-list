import { PlusCircle } from '@phosphor-icons/react'
import { FormEvent, useState } from 'react'

import styles from './NewTaskInput.module.css'

interface TaskInputProps {
  handleNewTask: (description: string) => void
}

export function NewTaskInput({ handleNewTask }: TaskInputProps) {
  const [taskDescription, setTaskDescription] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleNewTask(taskDescription)
    setTaskDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formInput}>
      <input
        type="text"
        id="newTask"
        placeholder="Adicione uma nova tarefa"
        onChange={(e) => setTaskDescription(e.target.value)}
        value={taskDescription}
      />
      <button disabled={!taskDescription} type="submit">
        <span>Criar</span>
        <PlusCircle size={16} />
      </button>
    </form>
  )
}
