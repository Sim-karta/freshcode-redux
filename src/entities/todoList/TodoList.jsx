import { useState } from 'react'
import classNames from 'classnames'
import styles from './Todolist.module.scss'

const initialTasks = [
  {
    id: '1',
    body: 'Вивчити основи Redux Toolkit',
    isDone: false,
    deadline: '2026-11-01'
  },
  {
    id: '2',
    body: 'Підключити Formik та Yup до форми',
    isDone: true,
    deadline: '2026-10-20'
  }
]

const TodoList = () => {
  const [tasks, setTasks] = useState(initialTasks)

  const handleDelete = id => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const handleToggle = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    )
  }

  const isOverdue = (deadline, isDone) => {
    if (isDone) {
      return false
    }
    return new Date(deadline) < new Date()
  }

  return (
    <ul className={styles.list}>
      {tasks.map(task => {
        const overdue = isOverdue(task.deadline, task.isDone)

        const taskClassNames = classNames(styles.item, {
          [styles.done]: task.isDone,
          [styles.overdue]: overdue
        })
        const bodyClassNames = classNames(styles.taskText, {
          [styles.taskTextDone]: task.isDone
        })
        const deadlineClassNames = classNames(styles.taskDeadline, {
          [styles.deadlineOverdue]: overdue
        })

        return (
          <li key={task.id} className={taskClassNames}>
            <div className={styles.taskInfo}>
              <input
                type='checkbox'
                className={styles.checkbox}
                checked={task.isDone}
                onChange={() => handleToggle(task.id)}
              />
              <span className={bodyClassNames}>{task.body}</span>
              <span className={deadlineClassNames}>({task.deadline})</span>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(task.id)}
            >
              Видалити
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default TodoList
