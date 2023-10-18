import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls the event handler with correct details when a new blog is submitted', async () => {
  const mockCreateBlog = jest.fn()
  const mockToggleVisibility = jest.fn()

  render(
    <BlogForm
      createBlog={mockCreateBlog}
      toggleVisibility={mockToggleVisibility} />
  )

  const user = userEvent.setup()
  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('Url')
  const submitButton = screen.getByRole('button', { type: 'submit' })

  await user.type(titleInput, 'Test Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'Test Url')
  await user.click(submitButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('Test Url')
})