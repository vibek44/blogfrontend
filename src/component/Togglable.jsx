//forwardRef is used when ref is needed to pass to child component and later access the ref from parent component
import { useState,forwardRef,useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const Togglable = forwardRef ( (props,refs) => {
  const [blogFormVisible,setblogFormVisible]=useState(false)
  const hideWhenVisible={ display:blogFormVisible? 'none' : '' }
  const showWhenVisible={ display:blogFormVisible? '' : 'none' }

  const toggleVisibility=() => {
    setblogFormVisible(!blogFormVisible)
  }
  useImperativeHandle(refs,() => {
    return{
      toggleVisibility
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}><button  onClick={toggleVisibility}>{props.buttonlabel}</button></div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
)

Togglable.propTypes={
  buttonlabel:propTypes.string.isRequired
}

Togglable.displayName='Togglable'

export default Togglable