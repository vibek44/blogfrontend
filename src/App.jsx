import { useState,useEffect } from 'react'
import Notification from './component/Notification'
import Loginform from './component/Loginform'
import userService from '../services/login'
import blogService from '../services/blog'
import Dashboard from './component/Dashboard'

const App=()=> {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]=useState(null)
  const [message, setMessage]=useState({ notification:null
    ,errorMessage:null }) 
  const [blogs, setBlogs]=useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlog=>setBlogs(initialBlog))
  },[])

  useEffect(()=>{
    const loggedUserJSON=window.localStorage.getItem('loggedAppUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin =async(event)=>{
    event.preventDefault()
    try{
      const user=await userService.login({ username,password })

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(error){
      setMessage({...message,errorMessage:'Authorization failed.'})
      setTimeout(()=>{
        setMessage({...message,errorMessage:null})
      },3000)
    }
    //console.log('logging with', username,password)
  }
  const handleSignout=()=>{
    window.localStorage.removeItem('loggedAppUser')
    //window.localStorage.clear()
    setUser(null) 
  }
 
  return (
    <div>
      {(message.notification || message.errorMessage ) && <Notification message={message}/>}
      { user 
        ? <Dashboard 
          user={user} setUser={setUser}
          blogs={blogs} setBlogs={setBlogs}
          message={message} setMessage={setMessage}
          handleSignout={handleSignout}
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
