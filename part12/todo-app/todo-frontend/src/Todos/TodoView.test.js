import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from './List'

test('renders todos correctly', () => {
  const todos = [
    {
      _id: '1',
      text: 'Learn React',
      done: false
    },
    {
      _id: '2',
      text: 'Learn Docker',
      done: true
    }
  ]

  render(<TodoList todos={todos} />)

  const firstTodo = screen.getByText('Learn React')
  expect(firstTodo).toBeDefined()

  const secondTodo = screen.getByText('Learn Docker')
  expect(secondTodo).toBeDefined()

  const doneInfo = screen.getByText('This todo is done')
  expect(doneInfo).toBeDefined()

  const notDoneInfo = screen.getByText('This todo is not done')
  expect(notDoneInfo).toBeDefined()
})

test('clicking delete calls the deleteTodo handler', async () => {
  const todos = [{
    _id: '1',
    text: 'Learn React',
    done: false
  }]

  const mockDeleteHandler = jest.fn()

  render(<TodoList todos={todos} deleteTodo={mockDeleteHandler} />)

  const button = screen.getByText('Delete')
  await userEvent.click(button)

  expect(mockDeleteHandler.mock.calls).toHaveLength(1)
})

test('clicking Set as done calls the completeTodo handler', async () => {
  const todos = [{
    _id: '1',
    text: 'Learn React',
    done: false
  }]

  const mockCompleteHandler = jest.fn()

  render(<TodoList todos={todos} completeTodo={mockCompleteHandler} />)

  const button = screen.getByText('Set as done')
  await userEvent.click(button)

  expect(mockCompleteHandler.mock.calls).toHaveLength(1)
})