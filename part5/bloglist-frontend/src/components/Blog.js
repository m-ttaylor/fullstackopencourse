import { useState } from 'react'
import { PropTypes } from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, username }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDeleteButton = { display: blog.user.username === username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleAddLike = async () => {
    addLike({ id: blog.id })
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleDelete = async () => {
    removeBlog({ id: blog.id })
  }

  return (
    <div>
      <button
        style={hideWhenVisible}
        onClick={toggleVisibility}>
      view
      </button>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>likes: {blog.likes} <button onClick={handleAddLike}>like</button></div>
          <div>{blog.url}</div>
          <div>{blog.user.name}</div>
          <button style={showDeleteButton} onClick={handleDelete}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}
export default Blog