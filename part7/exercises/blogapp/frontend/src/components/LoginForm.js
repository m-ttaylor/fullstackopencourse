const Login = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => {
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
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </>
    )
  }

  return renderLogin()
}

export default Login
