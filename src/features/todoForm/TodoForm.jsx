import classNames from 'classnames'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import styles from './TodoForm.module.scss'
import { connect } from 'react-redux'
import { addTask } from '../../entities/task/model/tasksSlice'

const TaskSchema = yup.object().shape({
  body: yup
    .string()
    .trim()
    .min(3, 'Занадто коротке завдання (мінімум 3 символи)')
    .required("Обов'язкове поле"),
  deadline: yup.date().required('Вкажіть дедлайн')
})

const TodoForm = ({ addNewTask }) => {
  const handleSubmit = ({ body, deadline }, { resetForm }) => {
    addNewTask({ body, deadline })
    resetForm()
  }

  return (
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
  )
}

const mapDispatchToProps = dispatch => ({
  addNewTask: task => dispatch(addTask(task))
})

export default connect(null, mapDispatchToProps)(TodoForm)
