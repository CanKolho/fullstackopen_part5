import { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}> 
        {blog.title} {blog.author} {}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} {}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          Likes {blog.likes}
          <button onClick={() => console.log('liked')}>Like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
)}

export default Blog