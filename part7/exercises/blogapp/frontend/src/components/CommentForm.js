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
      <h2>Add a comment</h2>
      <form onSubmit={addComment}>
        <div>
          message
          <input
            type="text"
            value={message}
            onChange={handleInputChange(setMessage)}
            name="Message"
            id="messageInput"
          />
        </div>
        <button id="createComment" type="submit">
          add comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm
