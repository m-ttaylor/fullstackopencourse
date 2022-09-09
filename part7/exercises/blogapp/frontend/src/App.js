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
    <div className="bg-slate-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row">
        <Link
          className="block py-2 pr-4 pl-3 text-gray-700 underline rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          style={padding}
          to="/main"
        >
          main
        </Link>
        <Link
          className="block py-2 pr-4 pl-3 text-gray-700 underline rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          style={padding}
          to="/users"
        >
          users
        </Link>
        {user === null ? (
          <Link
            className="block py-2 pr-4 pl-3 text-gray-700 underline rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            style={padding}
            to="/login"
          >
            login
          </Link>
        ) : (
          <span style={padding}>
            {user.name} logged in{' '}
            <button className="underline" onClick={handleLogout}>
              logout
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

const UserPage = ({ user, blogs }) => {
  const filteredBlogs = [...blogs].filter((b) => b.user === user.id)
  return user ? (
    <div>
      <h2 className="text-xxl">{user.name}</h2>
      <ul className="border w-1/3">
        {filteredBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Test</div>
  )
}

const Users = ({ users }) => {
  return (
    <table className="border">
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
              <Link className="text-l" to={`/users/${user.id}`}>
                {user.name}
              </Link>
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
  }, [dispatch])

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
