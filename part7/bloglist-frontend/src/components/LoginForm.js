const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input value={username} id='username' onChange={handleUsername} />
      </div>
      <div>
        password
        <input
          type='password'
          id='password'
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm
