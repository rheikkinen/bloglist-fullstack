import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only the blog title and author by default', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'https://test.com',
    likes: 5,
    user: {
      username: 'testuser'
    }
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText('Test title')).toBeDefined()
  expect(screen.getByText(/Test author/)).toBeDefined()

  expect(screen.queryByText('https://test.com')).toBeNull()
  expect(screen.queryByText('likes')).toBeNull()

})