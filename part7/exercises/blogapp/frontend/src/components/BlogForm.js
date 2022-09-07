import { useState } from 'react'
import { useDispatch } from 'react-redux'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const addBlog = async (event) => {
    event.preventDefault()

    dispatch(createBlog({ title: title, author: author, url: url }))
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
            id="titleInput"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={handleInputChange(setAuthor)}
            name="Author"
            id="authorInput"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            onChange={handleInputChange(setUrl)}
            name="url"
            id="urlInput"
          />
        </div>

        <button id="createBlog" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
