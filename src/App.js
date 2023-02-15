import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/signin';
import Client from './Client.js';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">

      <Routes>
      <Route path="/signup" element={<SignUp />} />
        <Route path="/client" element={<Client />} />
        <Route path="/" element={<SignIn />} />
      </Routes>

    </div>
  );
}

export default App;
