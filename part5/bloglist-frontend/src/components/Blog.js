import { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
      </div>
    </div>
  </div>
  )
}

export default Blog