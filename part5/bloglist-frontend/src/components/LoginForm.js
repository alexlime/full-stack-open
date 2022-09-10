
const LoginForm = ({
  user,
  handleSubmit,
  handleUsername,
  handlePassword,
  username,
  password,
  handleLogOut,
}) => {
  if (user === null) {
    return (
      <form onSubmit={handleSubmit}>
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
  } else {
    return (
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>log out</button>
      </div>
    )
  }

}

export default LoginForm