import { useState } from 'react'

const Blog = ({ blog, updateLikes }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateLikes(blog.id, blogToUpdate)
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
        <p><a href=''>{blog.url}</a></p>
        <p>
          Likes {blog.likes}
          <button onClick={handleLike}>Like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
)}

export default Blog