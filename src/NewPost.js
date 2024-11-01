import React from 'react'

const NewPost = ({ postTitle, setPostTitle, postBody, setPostBody, handleSubmit }) => {
  return (
    <main className="NewPost">
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          type="text"
          id='popstTitle'
          placeholder='Title'
          required
          autoFocus
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          placeholder='Body'
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost
