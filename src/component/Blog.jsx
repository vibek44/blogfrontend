import { useState } from 'react'

const Blog=({ blog,user,handleBlogLike,handleBlogRemove }) => {
  const [showDetail,setShowDetail]=useState(false)
  const blogStyle={
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleShow=() => {
    setShowDetail(!showDetail)
  }

  const handleEdit=(e) => {
    e.preventDefault()
    handleBlogLike({
      id:blog.id,
      title:blog.title,
      author:blog.author,
      url:blog.url,
      likes:blog.likes+1,
      user:blog.user.id
    })
  }
  return(
    <div style={blogStyle} >
      <button onClick={handleShow}>{showDetail?'hide':'view'}</button>
      {showDetail
        ?<div>
          <p>{blog.title}</p>
          <a>{blog.url}</a>
          <p><button onClick={handleEdit}>like</button> {blog.likes}</p>
          <p>{blog.user.name}</p>
          {(blog.user.username===user.username)&&<button onClick={() => handleBlogRemove(blog)}>remove</button>}
        </div>
        :<p> {blog.title} <b>By-{blog.user.name}</b></p>
      }
    </div>
  )
}

export default Blog