import { useState } from 'react'
import Loginform from './component/Loginform'

const App=()=> {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin =(event)=>{
    event.preventDefault()
  }
  return (
   <Loginform 
   username={username} 
   password={password} 
   setUsername={setUsername}
   setPassword={setPassword}
   handleLogin={handleLogin} />
  )
}

export default App
