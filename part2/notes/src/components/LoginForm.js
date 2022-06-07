import { useState } from 'react'
import noteService from '../services/notes'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleUser,
  handleError,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      handleUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      handleError('Wrong credentials')
      setTimeout(() => {
        handleError(null)
      }, 5000)
    }
    // console.log('logging in with', username, password)
  }

  return (
    <div>
      <h2>Login</h2>

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
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleUser: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired
}

export default LoginForm