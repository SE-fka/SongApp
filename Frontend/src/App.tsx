import React from 'react';
import ScrollToTop from "react-scroll-to-top";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import Home from './pages/Home/Home';
import ListSong from './pages/Song/SongList';
import AddSong from './pages/Song/AddSong';
import EditSong from './pages/Song/UpdateSong';
import SongsByGenre from './pages/Song/SongsByGenre';

const App = () => {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song/lists" element={<ListSong />} />
        <Route path="/song/add" element={<AddSong />} /> 
        <Route path="/song/edit/:id" element={<EditSong />} />
        <Route path="/song/genre" element={<SongsByGenre />} />
      </Routes>
      <Footer />
      <div style={{ marginTop: "150vh" }} />
      <ScrollToTop smooth />
    </Router>
  );
};

export default App;