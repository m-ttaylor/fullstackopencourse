import Togglable from './Togglable'
import { useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'

import { Link } from 'react-router-dom'

const Blogs = ({ blogFormRef }) => {
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
    <div className="p-5">
      <h2 className="text-xl">Blogs</h2>
      {blogForm()}

      {blogs.map((blog) => (
        <div
          className="w-1/3 underline text-blue-500 hover:bg-gray-100 hover:text-blue-700"
          style={blogStyle}
          key={blog.id}
        >
          <Link to={`${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
