import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only the title and author by default', () => {
  render(<Blog blog={blog} />)

  expect(screen.getByText(blog.title)).toBeDefined()
  expect(screen.getByText(blog.author, { exact: false })).toBeDefined()

  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(/likes/)).toBeNull()
  expect(screen.queryByText(blog.user.name, { exact: false })).toBeNull()

})

test('renders the url, likes and creator when the "Show details" button is clicked', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const showDetailsButton = screen.getByTestId('showDetailsButton')
  await user.click(showDetailsButton)

  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.getByText(`${blog.likes} likes`)).toBeDefined()
  expect(screen.getByText(blog.user.name, { exact: false })).toBeDefined()
})
