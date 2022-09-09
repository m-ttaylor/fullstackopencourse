import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../reducers/blogReducer'
// import { updateNotification } from '../reducers/notificationReducer'

const CommentForm = ({ blogId }) => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const addComment = async (event) => {
    event.preventDefault()

    const newMessage = { message }
    dispatch(commentOnBlog(blogId, newMessage))
    setMessage('')
  }

  const handleInputChange = (stateSetter) => (event) => {
    stateSetter(event.target.value)
  }

  return (
    <div>
      <h2 className="text-lg">Add a comment</h2>
      <form onSubmit={addComment}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            message
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your comment"
            required
            type="text"
            value={message}
            onChange={handleInputChange(setMessage)}
            name="Message"
            id="messageInput"
          />
        </div>
        <button
          id="createComment"
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          add comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm
