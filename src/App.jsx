import { useState,useEffect,useRef } from 'react'
import Notification from './component/Notification'
import Loginform from './component/Loginform'
import userService from '../services/login'
import blogService from '../services/blog'
import Dashboard from './component/Dashboard'

const App=() => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]=useState(null)
  const [message, setMessage]=useState({ notification:null,
    errorMessage:null })
  const [blogs, setBlogs]=useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlog => setBlogs(initialBlog))
  },[])

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedAppUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const blogFormRef=useRef()

  const handleLogin =async(event) => {
    event.preventDefault()
    try{
      const user=await userService.login({ username,password })

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(error){
      setMessage({ ...message,errorMessage:'Authorization failed.' })
      setTimeout(() => {
        setMessage({ ...message,errorMessage:null })
      },3000)
    }
    //console.log('logging with', username,password)
  }
  const handleSignout=() => {
    window.localStorage.removeItem('loggedAppUser')
    //window.localStorage.clear()
    setUser(null)
  }

  const handleBlogAdd=async(newBlog) => {
    blogFormRef.current.toggleVisibility()
    try{
      const blog =await blogService.create(newBlog)
      console.log(blog)
      setBlogs(blogs.concat(blog))
      setMessage({ ...message,notification:`new blog - ${blog.title}! by ${blog.author} added` })
      setTimeout(() => {
        setMessage({ ...message,notification:null })
      },3000)
    }catch(error){
      blogFormRef.current.toggleVisibility()
      setMessage({ ...message,errorMessage:error.response.data.error })
      setTimeout(() => {
        setMessage({ ...message,errorMessage:null })
      }, 3000)
    }
  }

  const handleBlogLike=async(updatingBlog) => {
    try{
      const resData=await blogService.update(updatingBlog.id,updatingBlog)
      setBlogs(blogs.map(blog => blog.id !== resData.id
        ? blog
        : resData
      ))
      //console.log(resData)
    }catch(error){
      setMessage({ ...message,errorMessage:error.response.data.error })
      setTimeout(() => {
        setMessage({ ...message,errorMessage:null })
      },3000)
    }}

  const handleBlogRemove=async(removeBlog) => {
    console.log(typeof removeBlog.id)
    try{
      window.confirm(`remove blog ${ removeBlog.title } by ${removeBlog.author}`)
      const resData=await blogService.remove(removeBlog.id)
      console.log(resData)
      setBlogs(blogs.filter(blog => blog.id!==removeBlog.id))
    }catch(error){
      setMessage({ ...message,errorMessage:error.response.data.error })
      setTimeout(() => {
        setMessage({ ...message,errorMessage:null })
      },3000)
    }
  }
  return (
    <div>
      <Notification message={message}/>
      { user
        ? <Dashboard
          noteRef={blogFormRef}
          user={user} setUser={setUser}
          blogs={blogs} setBlogs={setBlogs}
          message={message} setMessage={setMessage}
          handleSignout={handleSignout} handleBlogAdd={handleBlogAdd}
          handleBlogLike={handleBlogLike} handleBlogRemove={handleBlogRemove}
        />
        :<Loginform
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      }
    </div>)
}

export default App
