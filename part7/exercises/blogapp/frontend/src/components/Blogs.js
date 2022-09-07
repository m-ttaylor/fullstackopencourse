import Togglable from './Togglable'
import { useSelector } from 'react-redux'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import { updateNotification } from '../reducers/notificationReducer'

import { Routes, Route, Link } from 'react-router-dom'

const Blogs = ({ blogFormRef, handleLogout, user }) => {
  const blogForm = () => (
    <Togglable buttonLabel="create blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )
  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => (a.likes < b.likes ? 1 : -1))
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogForm()}

      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
