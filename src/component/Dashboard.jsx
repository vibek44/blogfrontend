import { useState } from 'react'
import Blogform from './Blogform'
import Blog from './Blog'
import Togglable from './Togglable'


const Dashboard=({ user,blogs,handleSignout,handleBlogAdd,handleBlogLike,handleBlogRemove,noteRef }) => {

  const sortedBlogs=blogs.toSorted((a,b) => b.likes-a.likes)

  return(
    <>
      <p>Logged in {user.username} <button onClick={ handleSignout }>
        logout</button>
      </p>
      <Togglable buttonlabel='Create newblog' ref={noteRef}>
        <Blogform
          handleBlogAdd={handleBlogAdd}
        />
      </Togglable>
      <h3>Blogs</h3>
      {
        sortedBlogs.map( blog => <Blog key={blog.id}
          user={user}
          blog={blog}
          handleBlogLike={handleBlogLike}
          handleBlogRemove={handleBlogRemove}/> )
      }
    </>
  )
}

export default Dashboard