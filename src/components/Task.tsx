import { Check, Trash } from '@phosphor-icons/react'

import styles from './Task.module.css'

interface TaskProps {
  id: number
  finished: true | false
  description: string
  handleTask: (taskId: number, action: 'check' | 'delete') => void
}

export function Task({ id, finished, description, handleTask }: TaskProps) {
  return (
    <article className={styles.task}>
      <div className={`${styles.content} ${finished && styles.finishedTask}`}>
        <button
          className={`${finished && styles.markedButton}`}
          onClick={() => handleTask(id, 'check')}
        >
          {finished && <Check size={14} />}
        </button>
        <p>{description}</p>
        <button onClick={() => handleTask(id, 'delete')}>
          <Trash size={18} />
        </button>
      </div>
    </article>
  )
}
