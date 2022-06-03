const BlogForm = ({
  addBlog, 
  handleInputChange,
  title,
  author,
  url,
  setTitle, 
  setAuthor, 
  setUrl
}) => {
  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={handleInputChange(setTitle)}
            name="Title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={handleInputChange(setAuthor)}
            name="Author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            onChange={handleInputChange(setUrl)}
            name="url"
          />
        </div>
        
      <button type="submit">create</button>
      </form>
      
    </div>
  )
}

export default BlogForm