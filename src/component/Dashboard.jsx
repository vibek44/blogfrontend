import Blogform from './Blogform'

const Dashboard=(props)=>{
  return(
    <>
      <p>Logged in {props.user.username}</p>
      <h3>Add blog</h3>
      <Blogform />
    </>
  )
}

export default Dashboard