import styles from './TodoWidget.module.scss'
import TodoForm from '../../features/todoForm/TodoForm'
import TodoList from '../../entities/todoList/TodoList'

const TodoWidget = () => {
  return (
    <article className={styles.container}>
      <h2 className={styles.title}>Мої завдання</h2>

      <TodoForm />

      <TodoList />
    </article>
  )
}

export default TodoWidget
