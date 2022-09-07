import { useEffect, useState } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { updateUser } from './reducers/userReducer'
import { updateNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

import { likeBlog, removeBlog } from './reducers/blogReducer'

import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={padding} to="/main">
        main
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user === null ? (
        <Link style={padding} to="/login">
          login
        </Link>
      ) : (
        <span style={padding}>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      )}
    </div>
  )
}

const UserPage = ({ user, blogs }) => {
  return user ? (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {blogs.map((blog) =>
          blog.user.id === user.id ? <li key={blog.id}>{blog.title}</li> : null
        )}
      </ul>
    </div>
  ) : null
}

const Users = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>users</th>
          <th>blogs</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(({ user }) => user)

  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(updateUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatch(updateUser(null))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log('attempting to login with', username)
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(updateUser(user))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      console.log('Wrong credentials')
      dispatch(
        updateNotification({
          message: 'Wrong username or password',
          errorState: true,
          timeout: 4,
        })
      )
    }
  }

  const blogsMatch = useMatch('/main/:id')
  const blog = blogsMatch
    ? blogs.find((b) => b.id === String(blogsMatch.params.id))
    : { placeholder: '' }

  const usersMatch = useMatch('/users/:id')
  const blogUser = usersMatch
    ? users.find((u) => u.id === String(usersMatch.params.id))
    : null

  const vote = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      votes: blog.votes + 1,
    }
    dispatch(likeBlog(id, updatedBlog))
    dispatch(
      updateNotification({
        message: `liked the blog ${blog.title}`,
        errorState: false,
        timeout: 4,
      })
    )
  }

  const deleteBlog = (id) => {
    dispatch(removeBlog(id))
  }

  return (
    <div>
      <Notification />
      <Menu user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/users/:id"
          element={<UserPage user={blogUser} blogs={blogs} />}
        />
        <Route
          path="/users"
          element={
            <div>
              <h2>Users</h2>
              <Users users={users} />
            </div>
          }
        />
        <Route
          path="/main/:id"
          element={
            user === null ? (
              <LoginForm
                username={username}
                password={password}
                handleLogin={handleLogin}
                setUsername={setUsername}
                setPassword={setPassword}
              />
            ) : (
              <Blog
                blog={blog}
                addLike={() => vote(blog.id)}
                removeBlog={() => deleteBlog(blog.id)}
                username={user.username}
              />
            )
          }
        />
        <Route
          path="/main"
          element={
            user === null ? (
              <LoginForm
                username={username}
                password={password}
                handleLogin={handleLogin}
                setUsername={setUsername}
                setPassword={setPassword}
              />
            ) : (
              <Blogs user={user} handleLogout={handleLogout} />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
