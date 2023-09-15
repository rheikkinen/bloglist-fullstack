import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeButton from './LikeButton'

test('calls the event handler twice when the like button is clicked twice', async () => {
  const mockHandleLike = jest.fn()

  render(<LikeButton handleLike={mockHandleLike} />)

  const user = userEvent.setup()
  const likeButton = screen.getByTestId('like-button')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})
