import { useState } from 'react'
import Loginform from './component/Loginform'
import requestService from '../services/login'

const App=()=> {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]=useState(null)
  const [errorMessage, setErrorMessage]=useState(null)

  const handleLogin =async(event)=>{
    event.preventDefault()
    try{
      const user=requestService.login({ username,password })
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
  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      { user 
        ? <p>post form</p>
        :<Loginform 
          username={username} 
          password={password} 
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin} />
      }
    </div>)
}

export default App
