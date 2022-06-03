import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorState, setErrorState] = useState(false)

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

  const handleLogout = (event) => {
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

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('creating a new blog')
    const blogObj = {
      title,
      author,
      url
    }

    const response = await blogService.create(blogObj)
    notify(`new blog ${title} by ${author} added`, false)
    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleInputChange = (stateSetter) => (event) => {
    stateSetter(event.target.value)
  }

  const renderLogin = () => {
    return (
      <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Passowrd"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
    )
  }

  return (
    <div>
    <Notification message={notification} errorState={errorState} />
    {user === null ?
    renderLogin() :
    <div>
      <h2>blogs</h2>
      <BlogForm
        addBlog={addBlog}
        handleInputChange={handleInputChange}
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
      />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    }
    </div>
  )
  
}

export default App
