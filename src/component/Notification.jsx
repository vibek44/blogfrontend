import '../Styles/notification.css'

const Notification=({ message }) => {
  if(message.notification===null && message.errorMessage===null){
    return null
  }else if(message.notification){
    return(<p className='notification'>{message.notification}</p>)
  }
  else if(message.errorMessage){
    return(<p className='error'>{message.errorMessage}</p>)
  }

}

export default Notification