import Home from './components/Home/Home';
import Login from './components/Home/Login';
import Register from './components/Home/Register';
import NewArticle from './components/page/newArticle';
import EditProfile from './components/page/editProfile';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Footer from './components/Header & footer/Footer';
import DetailArticle from './components/page/detailArticle'
import EditArticle from './components/page/editArticle';
import UserProfile from './components/page/userProfile';
import Profile from './components/page/profile';
import axios from 'axios';
import { useState } from 'react';

function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newArticle' element={<NewArticle />} />
          <Route path='/editProfile' element={<EditProfile />} />
          <Route path='/article/:slug' element={<DetailArticle />} />
          <Route path='/newArticle/:slug' element={<EditArticle />} />
          <Route path='/profile/:userName' element={<UserProfile />} />
          <Route path='/user/:userName' element={<Profile />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App
