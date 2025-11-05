import { describe, it, expect } from 'vitest'

interface Todo {
  id: number
  text: string
  completed: boolean
}

// Function to add a new todo
const addTodo = (todos: Todo[], text: string) => {
  const newTodo: Todo = {
    id: 123,
    text,
    completed: false
  }
  return [...todos, newTodo]
}

// Function to remove a todo
const removeTodo = (todos: Todo[], id: number) => {
  return todos.filter(todo => todo.id !== id)
}

describe('addTodo', () => {
  it('should add a new todo to the list', () => {
    const todos: Todo[] = []
    const result = addTodo(todos, 'Test todo')
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(123)
    expect(result[0].completed).toBe(false)
  })
})

describe('removeTodo', () => {
  it('should remove a todo', () => {
    const todos: Todo[] = [
      { id: 123, text: 'Test todo 1', completed: false },
      { id: 456, text: 'Test todo 2', completed: true }
    ]
    const result = removeTodo(todos, 123)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(456)
  })

  it('should do nothing if the id is not found', () => {
    const todos: Todo[] = [
      { id: 123, text: 'Test todo 1', completed: false },
      { id: 456, text: 'Test todo 2', completed: false }
    ]
    const result = removeTodo(todos, 999)
    expect(result.length).toBe(2)
    expect(result[0].id).toBe(123)
  })
})
