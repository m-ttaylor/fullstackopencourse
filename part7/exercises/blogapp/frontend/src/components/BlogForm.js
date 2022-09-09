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
        <div className="relative w-1/3 border border-gray-200">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Title
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
              type="text"
              value={title}
              onChange={handleInputChange(setTitle)}
              name="Title"
              id="titleInput"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Author
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
              type="text"
              value={author}
              onChange={handleInputChange(setAuthor)}
              name="Author"
              id="authorInput"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              url
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
              type="text"
              value={url}
              onChange={handleInputChange(setUrl)}
              name="url"
              id="urlInput"
            />
          </div>

          <button
            id="createBlog"
            type="submit"
            className="absolute bottom-0 right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
