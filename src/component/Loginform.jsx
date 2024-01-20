import propTypes from 'prop-types'

const Loginform=( { username, password,setUsername,setPassword, handleLogin } ) => {
  return(
    <fieldset>
      <legend>Login to application</legend>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={( { target } ) => setUsername(target.value)}
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
    </fieldset>)

}

Loginform.propTypes={
  username:propTypes.string.isRequired,
  password:propTypes.string.isRequired,
  setUsername:propTypes.func.isRequired,
  setPassword:propTypes.func.isRequired,
  handleLogin:propTypes.func.isRequired
}

export default Loginform
