const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password,
  handleLogOut,
}) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        value={username}
        onChange={handleUsername}
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        onChange={handlePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )


}

export default LoginForm