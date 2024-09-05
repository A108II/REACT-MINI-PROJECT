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

function App() {
  const [search, setSearch] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState(
    [
      {
        id: 1,
        title: "Exploring the Cosmos",
        datetime: "2024-09-03T08:00",
        body: "Discovering new galaxies and understanding the mysteries of space."
      },
      {
        id: 2,
        title: "The Art of Cooking",
        datetime: "2024-09-02T12:30",
        body: "A journey through culinary delights and flavors from around the world."
      },
      {
        id: 3,
        title: "Understanding Technology",
        datetime: "2024-09-01T09:45",
        body: "The evolution of technology and its impact on our daily lives."
      },
      {
        id: 4,
        title: "History of Ancient Civilizations",
        datetime: "2024-08-31T14:20",
        body: "Exploring the rich history and culture of ancient civilizations."
      },
      {
        id: 5,
        title: "The Future of AI",
        datetime: "2024-08-30T11:00",
        body: "How artificial intelligence is shaping the future of industries and society."
      }
    ]
  )
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList)
    navigate('/');
  }

  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
    ((post.body).toLowerCase().includes(search.toLowerCase())
      || (post.title).toLowerCase().includes(search.toLowerCase())
    ));
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);
  // Filter the posts according to the search

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    const newPostsList = [...posts, newPost];
    setPosts(newPostsList);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  return (
    <div className="App">
      <Header title={"BLOG"} />
      <Nav
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />

        <Route path="/post" element={<NewPost
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}
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
