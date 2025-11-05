import './style.css'

type Status = 'pending' | 'completed' | 'overdue'

interface Todo {
  id: number
  text: string
  completed: boolean
  dueDate?: string
  status?: Status
}

let todos: Todo[] = []

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const dateInput = document.getElementById('todo-date') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.querySelector('.todo-list') as HTMLUListElement
const clearButton = document.getElementById('clear-completed-btn') as HTMLButtonElement
const counterElement = document.getElementById('task-counter') as HTMLParagraphElement
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement
const colorPicker = document.getElementById('colorPicker') as HTMLInputElement
const progressBar = document.getElementById('progress-bar') as HTMLProgressElement
const progressText = document.getElementById('progress-text') as HTMLSpanElement

const addTodo = (text: string, dueDate?: string): void => {
  const newTodo: Todo = { 
    id: Date.now(), 
    text, 
    completed: false, 
    dueDate, 
    status: 'pending' 
  }
  todos.push(newTodo)
  renderTodos()
}

todoForm.addEventListener('submit', (event: Event): void => {
  event.preventDefault()
  const text = todoInput.value.trim()
  const dueDate = dateInput.value

  if (text !== '') {
    addTodo(text, dueDate)
    todoInput.value = ''
    dateInput.value = ''
    errorMessage.style.display = 'none'
  } else {
    errorMessage.style.display = 'block'
  }
})

const renderTodos = (): void => {
  todoList.innerHTML = ''
  todos.forEach((todo) => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    const dueDateColor = getDueDateColor(todo.dueDate)
    const formattedDate = todo.dueDate ? formatDate(todo.dueDate) : ''

    li.innerHTML = `
      <div class="todo-content">
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <div class="todo-text">
          <span style="
            text-decoration:${todo.completed ? 'line-through' : 'none'};
            color:${todo.completed ? '#999' : '#333'};
          ">
            ${todo.text}
          </span>
          ${
            todo.dueDate
              ? `<small class="due-date" style="color:${dueDateColor}">
                  ${formattedDate}
                </small>`
              : ''
          }
        </div>
      </div>
      <button class="remove-btn">Remove</button>
    `

    const checkbox = li.querySelector('input') as HTMLInputElement
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked
      todo.status = checkbox.checked ? 'completed' : 'pending'
      updateTaskCounter()
      renderTodos()
    })

    const removeButton = li.querySelector('.remove-btn') as HTMLButtonElement
    removeButton.addEventListener('click', () => removeTodo(todo.id))

    todoList.appendChild(li)
  })
  updateTaskCounter()
}

const removeTodo = (id: number): void => {
  todos = todos.filter((todo) => todo.id !== id)
  renderTodos()
}

const clearCompletedTodos = (): void => {
  todos = todos.filter((todo) => !todo.completed)
  renderTodos()
}

const updateTaskCounter = (): void => {
  const remaining = todos.filter((todo) => !todo.completed).length
  const total = todos.length
  const completed = total - remaining
  counterElement.textContent = `Tasks remaining: ${remaining}`
  const progress = total > 0 ? (completed / total) * 100 : 0
  progressBar.value = progress
  progressText.textContent = `${Math.round(progress)}%`
}

const getDueDateColor = (dueDate?: string): string => {
  if (!dueDate) return '#333'
  const today = new Date()
  const due = new Date(dueDate)
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  if (due < today) return '#dc3545'
  if (due.getTime() === today.getTime()) return '#ff9800'
  return '#28a745'
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

clearButton.addEventListener('click', clearCompletedTodos)

colorPicker.addEventListener('input', (e: Event): void => {
  const target = e.target as HTMLInputElement
  document.body.style.backgroundColor = target.value
})

renderTodos()


// minor UI cleanup and commit test
