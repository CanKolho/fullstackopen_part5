import Notification from "./Notification"

const Login = ({ handleLogin, username, password, handleUsername, handlePassword, message, type }) => {
  return (
    <>
      <h1>log in to application</h1>
      <Notification message={message} type={type}/>
      <form onSubmit={handleLogin}>
        <div>
          username {}
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          password {}
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  ) 
}

export default Login