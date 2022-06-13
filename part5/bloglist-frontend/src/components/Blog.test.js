import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  name: 'abc',
  username: 'abc',
  token: 'cdef'
}

const blog = {
  author: 'frank',
  title: 'on frank being the best name',
  likes: 2,
  url: 'https://blogs.com/articles/on_frank_being_the_best_name',
  user: user
}

const mockHandler = jest.fn()

test('renders content', () => {

  render(<Blog
    username="tom"
    blog={blog}
    addLike={mockHandler}
    removeBlog={mockHandler}
  />)

  const titleAndAuthor = screen.getByText('on frank being the best name frank')
  const url = screen.queryByText('https://blogs.com/articles/on_frank_being_the_best_name')
  const likes = screen.queryByText('2')

  expect(titleAndAuthor).toBeDefined()
  expect(url).toBeNull
  expect(likes).toBeNull
})

test('shows details when expanded', async () => {
  render(<Blog
    username="tom"
    blog={blog}
    addLike={mockHandler}
    removeBlog={mockHandler}
  />)

  const urlBefore = screen.queryByText('https://blogs.com/articles/on_frank_being_the_best_name')
  const likesBefore = screen.queryByText('likes: 2')

  expect(urlBefore).toBeNull
  expect(likesBefore).toBeNull

  const button = screen.getByText('view')
  button.click()

  const url = screen.getByText('https://blogs.com/articles/on_frank_being_the_best_name')
  const likes = screen.getByText('likes: 2')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('liking a post twice calls handler twice', () => {
  const mockLikeHandler = jest.fn()

  render(<Blog
    username="tom"
    blog={blog}
    addLike={mockLikeHandler}
    removeBlog={mockHandler}
  />)

  const button = screen.getByText('like')
  button.click()
  button.click()

  expect(mockLikeHandler.mock.calls).toHaveLength(2)

})