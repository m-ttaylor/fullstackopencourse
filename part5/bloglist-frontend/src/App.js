import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorState, setErrorState] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const notify = (message, error) => {
    setNotification(message)
    if (error) setErrorState(true)
    setTimeout(() => {
      setNotification(null)
      if (error) setErrorState(false)
    }, 5000)
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log('attempting to login with', username)
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      notify('Wrong username or password', true)
    }
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    notify(`new blog ${blogObject.title} by ${blogObject.author} added`, false)
    const userid = response.user
    response.user = { id: userid, name: user.name, username: user.username }
    setBlogs(blogs.concat(response))
  }

  const addLike = async ({ id }) => {
    const blog = blogs.find(b => b.id === id)
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }

    const response = await blogService.update(
      id,
      newBlog
    )

    const userid = response.user
    response.user = { id: userid, name: blog.user.name, username: blog.user.username }

    setBlogs(blogs.map(b => b.id !== id ? b : response ))
  }

  const removeBlog = async ({ id }) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Really delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
      } catch(error) {
        notify('Error removing blog post from server', true)
      }

    }
  }

  const renderLogin = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id="password"
              type="password"
              value={password}
              name="Passowrd"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="create blog" ref={blogFormRef}>
      <BlogForm
        createBlog={createBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <Notification message={notification} errorState={errorState} />
      {user === null ?
        renderLogin() :
        <div>
          <h2>blogs</h2>
          {blogForm()}
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {[...blogs]
            .sort((a, b) => a.likes < b.likes ? 1 : -1)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                removeBlog={removeBlog}
                username={user.username}/>
            )
          }
        </div>
      }
    </div>
  )

}

export default App
