import { useState } from 'react'
import Blogform from './Blogform'
import Blog from './Blog'
import Togglable from './Togglable'


const Dashboard=({ user,blogs,handleSignout,handleBlogAdd,handleBlogLike,handleBlogRemove,noteRef }) => {
  const[title,setTitle]=useState('')
  const[author,setAuthor]=useState('')
  const[url,setUrl]=useState('')
  const sortedBlogs=blogs.toSorted((a,b) => b.likes-a.likes)


  const addBlog=(event) => {
    event.preventDefault()
    handleBlogAdd({ title,author,url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <>
      <p>Logged in {user.username} <button onClick={ handleSignout }>
        logout</button>
      </p>
      <Togglable buttonlabel='Create newblog' ref={noteRef}>
        <Blogform
          title={title} setTitle={setTitle}
          author={author} setAuthor={setAuthor}
          url={url} setUrl={setUrl}
          addBlog={addBlog}
        />
      </Togglable>
      <h3>Blogs</h3>
      {
        sortedBlogs.map( blog => <Blog key={blog.id} user={user} blog={blog} handleBlogLike={handleBlogLike} handleBlogRemove={handleBlogRemove}/> )
      }
    </>
  )
}

export default Dashboard