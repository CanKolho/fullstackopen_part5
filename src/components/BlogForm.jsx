import { useState } from 'react'
import blogService from '../services/blogs.js'

const BlogForm = ({ blogs, setBlogs, blogFormRef, showSuccessMsg, showErrorMsg }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('sending', {title, author, url})

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

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch ({ response }) {
        showErrorMsg(response.data.error)
    }
  }

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleCreate}>
        <div>
          title: {}
          <input 
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => {setTitle(target.value)}}
          />
        </div>
        <div>
          author: {}
          <input 
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: {}
          <input 
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm