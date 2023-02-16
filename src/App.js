import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/signin';
import Info from './components/Info.js';
import EditMovie from './components/Edit.js';
import Add from './components/Add';
import MovieBoard from './components/MovieBoard.js';
import AdminBoard from './components/AdminBoard.js';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";



function App() {
  const [movie, setMovie] = useState([]);
  const getMovie = () => {
      fetch("https://show-backend-4fzv-git-master-deepavishali.vercel.app/movie",
          { method: "GET" })
          .then((data) => data.json())
          .then((res) => setMovie(res));
  }

  useEffect(() => getMovie(), [])
  return (
    <div className="App">

      <Routes>
      <Route path="/addmovie" element={<Add  />} />
      <Route path="/edit/:movieid" element={<EditMovie />} />
      <Route path="/info/:movieid" element={<Info />} />
      <Route path="/adminboard" element={<AdminBoard />} />
      <Route path="/signup" element={<SignUp />} />
        <Route path="/movieboard" element={<MovieBoard />} />
        <Route path="/" element={<SignIn />} />
      </Routes>

    </div>
  );
}

export default App;
