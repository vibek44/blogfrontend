
const Blogform=({ title,author,url,setTitle,setAuthor,setUrl,addBlog }) => {

  return(
    <form onSubmit={addBlog}>
      <div>
        Title:<input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        Author:<input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url:<input
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>

  )
}

export default Blogform