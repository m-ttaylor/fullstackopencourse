import { PropTypes } from 'prop-types'
import CommentForm from './CommentForm'
import { useSelector } from 'react-redux'

const Blog = ({ blog, addLike, removeBlog, username }) => {
  const foundBlog = useSelector(({ blogs }) => {
    return [...blogs].filter((b) => b.id === blog.id)
  })

  const comments = foundBlog[0] !== undefined ? foundBlog[0].comments : []

  var showDeleteButton
  if (blog) {
    showDeleteButton = {
      display: blog.user.username === username ? '' : 'none',
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleAddLike = async () => {
    addLike({ id: blog.id })
  }

  const handleDelete = async () => {
    removeBlog({ id: blog.id })
  }

  return blog ? (
    <div className="p-5">
      <div style={blogStyle}>
        <div className="titleAndAuthor">
          {blog.title} by {blog.author}
        </div>
        <div style={{ display: true }}>
          <div>
            likes: {blog.likes}{' '}
            <button
              className="border rounded-md bg-green-100 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-green-300"
              id="likeButton"
              onClick={handleAddLike}
            >
              like
            </button>
          </div>
          <div>{blog.url}</div>
          <div>{blog.user.name}</div>
          <button style={showDeleteButton} onClick={handleDelete}>
            remove
          </button>
          {/* <button onClick={toggleVisibility}>hide</button> */}
        </div>
      </div>
      <h2 className="text-xl">Comments</h2>
      <CommentForm blogId={blog.id} />

      {comments === null ? (
        ''
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.message}</li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <div>Blog does not exist</div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}
export default Blog
