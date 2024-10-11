'use client'

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import Homepage from './Components/Homepage';
import SinglePost from './Components/SinglePost';
import CommentList from './Components/CommentList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/comments" element={<CommentList />} />
      </Routes>
    </Router>
  );
};

export default App;