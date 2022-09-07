import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    addComment(state, action) {
      const id = action.payload.id
      const newComment = action.payload.newComment
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat(newComment),
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id, newBlog) => {
  return async (dispatch) => {
    await blogService.update(id, newBlog)
    dispatch(addLike(id))
  }
}

export const commentOnBlog = (id, content) => {
  return async (dispatch) => {
    const newComment = await blogService.postComment(id, content)
    dispatch(addComment({ id: id, newComment }))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    console.log('deleting')
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { appendBlog, addLike, addComment, setBlogs, deleteBlog } =
  blogSlice.actions
export default blogSlice.reducer
