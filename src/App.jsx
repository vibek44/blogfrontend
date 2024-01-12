import { useState,useEffect } from 'react'
import Loginform from './component/Loginform'
import userService from '../services/login'
import blogService from '../services/blog'
import Dashboard from './component/Dashboard'

const App=()=> {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]=useState(null)
  const [errorMessage, setErrorMessage]=useState(null) 
  const[title,setTitle]=useState('')
  const[author,setAuthor]=useState('')
  const[url,setUrl]=useState('')
  const [blogs, setBlogs]=useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlog=>setBlogs(initialBlog))
  },[])

  const handleLogin =async(event)=>{
    event.preventDefault()
    try{
      const user=await userService.login({ username,password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setErrorMessage('Authorization failed.')
      setTimeout(()=>{
        setErrorMessage(null)
      },3000)
    }
    //console.log('logging with', username,password)
  }

  const handleBlogAdd=()=>{
    
  }
  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      { user 
        ? <Dashboard 
          user={user} setUser={setUser}
          title={title} setTitle={setTitle}
          url={url} setUrl={setUrl}
          author={author} setAuthor={setAuthor}
          blogs={blogs}
          handleBlogAdd={handleBlogAdd}
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
