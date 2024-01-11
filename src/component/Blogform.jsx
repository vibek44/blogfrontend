const Blogform=({title,author,url,setTitle})=>{
  return(
    <fieldset>
      <legend>Add blog </legend>
      <form action="handleBlog">
        <div>
          Title:<input
            type='text'
            value={title}
            onChange={({target})=>setTitle(target.value)} />
        </div>
        <div>
          Author:<input
            type='text'
            value={author}
            onChange={({target})=>setTitle(target.value)} />
        </div>
        <div>
          url:<input
            type='text'
            value={url}
            onChange={({target})=>setTitle(target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    </fieldset>
  )
}

export default Blogform