import { useState } from 'react'
import Blogform from './Blogform'
import Blog from './Blog'
import blogService from '../../services/blog'

const Dashboard=({user,blogs,setBlogs,setErrorMessage,handleSignout})=>{
  const[title,setTitle]=useState('')
  const[author,setAuthor]=useState('')
  const[url,setUrl]=useState('')

  const handleBlogAdd=async(event)=>{
    event.preventDefault()
    const newBlog={title,author,url}
    try{
      const blog =await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setTitle('') 
      setAuthor('')
      setUrl('')
    }catch(error){
      setErrorMessage(error.response.data.error)
      setTimeout(()=>{
        setErrorMessage(null)
      }, 3000)
    }
  }

  return(
    <>
      <p>Logged in {user.username} <button onClick={ handleSignout }>
        logout</button>
      </p>
      <Blogform  
        title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl}
        handleBlogAdd={handleBlogAdd}
      />
      <h3>Blogs</h3>
      {
        blogs.map( blog=> <Blog key={blog.id} blog={blog}/> )
      }
    </>
  )
}

export default Dashboard