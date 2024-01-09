import { useState } from 'react'
import Loginform from './component/Loginform'

const App=()=> {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
   <Loginform 
   username={username} 
   password={password} 
   setUsername={setUsername}
   setPassword={setPassword}/>
  )
}

export default App
