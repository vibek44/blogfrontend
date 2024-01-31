import { useState } from 'react'

const Blog=({ blog,user,handleBlogLike,handleBlogRemove, }) => {
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
    <div style={blogStyle}  >
      <button className='viewhidebutton' onClick={handleShow}>{showDetail?'hide':'view'}</button>
      {showDetail
        ?<div className='blogdetail'>
          <p className='blogtitle'> { blog.title } </p>
          <p> { blog.url }</p>
          <p> { blog.author } </p>
          <p><button className='likebutton' onClick={handleEdit}>like</button> {blog.likes}</p>
          <p>{blog.user.name}</p>
          {(blog.user.username===user.username)&&<button  onClick={() => handleBlogRemove(blog)}>remove</button>}
        </div>
        :<div>
          <p className='title'> {blog.title} </p>
          <p className='author'><b>By-{blog.author}</b></p>
        </div>
      }
    </div>
  )
}

export default Blog