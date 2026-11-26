import { useState } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import styles from './TodoList.module.scss'
import { deleteTask, updateTask } from '../task/model/tasksSlice'

const TodoList = ({ tasks, deleteTaskById, updateTaskById }) => {
  const [editingId, setEditingId] = useState(null)
  const [newBody, setNewBody] = useState('')

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
                onChange={({ target }) =>
                  updateTaskById(task.id, { isDone: target.checked })
                }
              />
              {editingId !== task.id ? (
                <span
                  className={bodyClassNames}
                  onClick={() => {
                    setNewBody(task.body)
                    setEditingId(task.id)
                  }}
                >
                  {task.body}
                </span>
              ) : (
                <input
                  className={styles.taskInput}
                  type='text'
                  value={newBody}
                  onChange={({ target }) => {
                    setNewBody(target.value)
                  }}
                  onBlur={() => {
                    updateTaskById(task.id, { body: newBody })
                    setEditingId(null)
                  }}
                  onKeyDown={({ key }) => {
                    if (key === 'Enter') {
                      updateTaskById(task.id, { body: newBody })
                      setEditingId(null)
                    }
                  }}
                  autoFocus
                />
              )}

              <span className={deadlineClassNames}>({task.deadline})</span>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => deleteTaskById(task.id)}
            >
              Видалити
            </button>
          </li>
        )
      })}
    </ul>
  )
}

const mapStateToProps = ({ tasksList }) => tasksList

const mapDispatchToProps = dispatch => ({
  deleteTaskById: id => dispatch(deleteTask(id)),
  updateTaskById: (id, body) => dispatch(updateTask({ id, body }))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
