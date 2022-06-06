import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    
    console.log('creating a new blog')
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleInputChange = (stateSetter) => (event) => {
    stateSetter(event.target.value)
  }

  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={handleInputChange(setTitle)}
            name="Title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={handleInputChange(setAuthor)}
            name="Author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            onChange={handleInputChange(setUrl)}
            name="url"
          />
        </div>
        
      <button type="submit">create</button>
      </form>
      
    </div>
  )
}

export default BlogForm