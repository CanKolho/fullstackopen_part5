import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showSuccessMsg = (successMsg) => {
    setMessage(successMsg)
    setMsgType(true)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const showErrorMsg = (ErrorMsg) => {
    setMessage(ErrorMsg)
    setMsgType(false)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch ({ response }) {
        showErrorMsg(response.data.error)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
  } 
  
  const handleUsername = ({ target }) => {
    console.log('username', target.value)
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    console.log('password', target.value)
    setPassword(target.value)
  }
  
  const blogFormRef = useRef()

  const createBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      
      const createdBlog = await 
        blogService
          .create({
            title,
            author,
            url
          })

      setBlogs(blogs.concat(createdBlog))
      showSuccessMsg(`a new blog '${ createdBlog.title }' by ${ createdBlog.author } added`)

    } catch ({ response }) {
        showErrorMsg(response.data.error)
    }    
  }

  const updateLikes = async (id, newBlog) => {
    try {
      const updatedBlog = await blogService.update(id, newBlog)
      const newBlogs = blogs.map(blog => blog.id === id ? updatedBlog : blog)
      setBlogs(newBlogs)
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    } 
  }

  const deleteBlog = async id => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      showSuccessMsg('blog deleted succesfully!')
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    }
  }

  const loginForm = () => (
    <Login 
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsername={handleUsername}
      handlePassword={handlePassword}
      message={message}
      type={msgType}
    />
  )

  const showBlogs = () => (
    <>
      <h1>blogs</h1>
      <Notification message={message} type={msgType}/>
      <p>
        {user.name} logged in {}
        <button onClick={handleLogOut}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog 
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
            username={user.username}
          />
      )}
    </>
  )

  return (
    <>
      {!user ? loginForm() : showBlogs()}
    </>
  )
}

export default App