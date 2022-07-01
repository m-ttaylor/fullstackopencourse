import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('does thing', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  // screen.getByText('create blog').click()

  const titleInput = container.querySelector('#titleInput')
  const authorInput = container.querySelector('#authorInput')
  const urlInput = container.querySelector('#urlInput')

  await user.type(titleInput, 'testing')
  await user.type(authorInput, 'George Washington')
  await user.type(urlInput, 'www.google.com')

  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  const result = createBlog.mock.calls[0][0]
  expect(result.title).toBe('testing')
  expect(result.author).toBe('George Washington')
  expect(result.url).toBe('www.google.com')
})
