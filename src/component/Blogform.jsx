import { useState } from 'react'
const Blogform=({ handleBlogAdd }) => {
  const[title,setTitle]=useState('')
  const[author,setAuthor]=useState('')
  const[url,setUrl]=useState('')

  const addBlog=(event) => {
    event.preventDefault()
    handleBlogAdd({ title,author,url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <form onSubmit={addBlog}>
      <div>
        Title:<input
          id='title'
          type='text'
          value={title}
          placeholder='write title here'
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        Author:<input
          id='author'
          type='text'
          value={author}
          placeholder='author here'
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url:<input
          id='url'
          type='text'
          value={url}
          placeholder='url here'
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button id='blogsubmit' type='submit'>Create</button>
    </form>

  )
}

export default Blogform