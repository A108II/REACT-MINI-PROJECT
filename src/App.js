import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import api from './api/posts'
import EditPost from './editPost';

function App() {
  const [search, setSearch] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([])
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        // axios will automatically catch the errrors when they're not in the 200 range, so we do not need to bother about using throw error if response is not aligned with what we want
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }

        else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPosts();
  }, [])

  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
    ((post.body).toLowerCase().includes(search.toLowerCase())
      || (post.title).toLowerCase().includes(search.toLowerCase())
    ));
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);
  // Filter the posts according to the search

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost);
      const newPostsList = [...posts, response.data];
      setPosts(newPostsList);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList)
      navigate('/');
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const handleEdit = async (id) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm')
    const editedPost = { id, title: editTitle, datetime: dateTime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, editedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Header title={"BLOG"} />

      <Nav search={search} setSearch={setSearch}/>

      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />

        <Route path="/post" element={<NewPost
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}
        />} />

        <Route path='/edit/:id' element={<EditPost
          posts={posts}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editBody={editBody}
          setEditBody={setEditBody}
          handleEdit={handleEdit}
        />} />

        <Route path="/post/:id" element={<PostPage
          posts={posts}
          handleDelete={handleDelete}
        />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer /> 
    </div>
  );
}

export default App;
