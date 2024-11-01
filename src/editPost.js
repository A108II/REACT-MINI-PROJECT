import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom'; 

const EditPost = (
  {posts, editTitle, setEditTitle, editBody, setEditBody, handleEdit}
) => {
  const {id} = useParams();
  const post = posts.find((post) => (post.id).toString() === id);
  useEffect(() => {
    if(post) {
      setEditTitle(post.title);
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

  return (
    <main className="NewPost">
      {post && 
      <>
      <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          type="text"
          id='postTitle'
          placeholder='Title'
          required
          autoFocus
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          placeholder='Body'
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />

        <button type='submit' onClick = {() => handleEdit(post.id)}>Submit</button>
      </form>
      </>
      }

      {!post && 
      <>
      <h2>Could not find the post</h2>
      <p>
        <Link to="/">Visit the homepage</Link>g
      </p>
      </>
      
      }
    </main>
      

  )
}

export default EditPost
