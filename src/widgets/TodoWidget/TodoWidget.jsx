import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import classNames from 'classnames'
import styles from './TodoWidget.module.scss'

const TaskSchema = yup.object().shape({
  body: yup
    .string()
    .trim()
    .min(3, 'Занадто коротке завдання (мінімум 3 символи)')
    .required("Обов'язкове поле"),
  deadline: yup.date().required('Вкажіть дедлайн')
})

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

const TodoWidget = () => {
  const [tasks, setTasks] = useState(initialTasks)

  const handleSubmit = (values, { resetForm }) => {
    const newTask = {
      id: crypto.randomUUID(),
      body: values.body,
      isDone: false,
      deadline: values.deadline
    }

    setTasks(prev => [...prev, newTask])
    resetForm()
  }

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
    <article className={styles.container}>
      <h2 className={styles.title}>Мої завдання</h2>

      <Formik
        initialValues={{ body: '', deadline: '' }}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => {
          const bodyClassNames = classNames(styles.input, {
            [styles.errorInput]: errors.body && touched.body
          })
          const deadlineClassNames = classNames(styles.input, {
            [styles.errorInput]: errors.deadline && touched.deadline
          })

          return (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <Field
                  name='body'
                  placeholder='Що треба зробити?'
                  className={bodyClassNames}
                />
                <ErrorMessage
                  name='body'
                  component='div'
                  className={styles.errorMsg}
                />
              </div>

              <div className={styles.fieldGroup}>
                <Field
                  type='date'
                  name='deadline'
                  className={deadlineClassNames}
                />
                <ErrorMessage
                  name='deadline'
                  component='div'
                  className={styles.errorMsg}
                />
              </div>

              <button type='submit' className={styles.submitBtn}>
                Додати завдання
              </button>
            </Form>
          )
        }}
      </Formik>

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
    </article>
  )
}

export default TodoWidget
